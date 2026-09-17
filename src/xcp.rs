use anyhow::{bail, Context, Result};
use hole_punch::*;
use std::{
    fs::{File, OpenOptions},
    io::{Read, Seek, SeekFrom, Write},
    path::Path,
};

/// Handle the `xcp` command: copy sparse file with optional hole punching.
pub fn run(args: &[String]) -> Result<()> {
    let mut positional: Vec<&str> = Vec::with_capacity(2);
    let mut punch_hole = false;

    for arg in args {
        match arg.as_str() {
            "--punch-hole" => punch_hole = true,
            "-h" | "--help" => {
                print_usage();
                return Ok(());
            }
            _ => positional.push(arg),
        }
    }

    if positional.len() < 2 {
        print_usage();
        bail!("xcp requires source and destination paths");
    }
    if positional.len() > 2 {
        bail!("unexpected argument: {}", positional[2]);
    }

    copy_sparse_file(positional[0], positional[1], punch_hole)
}

fn print_usage() {
    eprintln!("Usage: myoverlayfs xcp <src> <dst> [--punch-hole]");
}

// TODO: use libxcp to improve the speed if cross's MSRV is 1.70
pub fn copy_sparse_file<P: AsRef<Path>, Q: AsRef<Path>>(
    src: P,
    dst: Q,
    punch_hole: bool,
) -> Result<()> {
    let mut src_file = File::open(src.as_ref())
        .with_context(|| format!("failed to open {}", src.as_ref().display()))?;
    let mut dst_file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(dst.as_ref())
        .with_context(|| format!("failed to open {}", dst.as_ref().display()))?;

    dst_file.set_len(src_file.metadata()?.len())?;

    let segments = src_file.scan_chunks()?;
    for segment in segments {
        if let SegmentType::Data = segment.segment_type {
            let start = segment.start;
            let end = segment.end + 1;

            src_file.seek(SeekFrom::Start(start))?;
            dst_file.seek(SeekFrom::Start(start))?;

            let mut buffer = [0; 4096];
            let mut total_bytes_copied = 0;

            while total_bytes_copied < end - start {
                let bytes_to_read =
                    std::cmp::min(buffer.len() as u64, end - start - total_bytes_copied);
                let bytes_read = src_file.read(&mut buffer[..bytes_to_read as usize])?;

                if bytes_read == 0 {
                    break;
                }

                if punch_hole && buffer[..bytes_read].iter().all(|&x| x == 0) {
                    dst_file.seek(SeekFrom::Current(bytes_read as i64))?;
                    total_bytes_copied += bytes_read as u64;
                    continue;
                }
                dst_file.write_all(&buffer[..bytes_read])?;
                total_bytes_copied += bytes_read as u64;
            }
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_support::TempDir;

    fn sample_bytes() -> Vec<u8> {
        let mut bytes = vec![0u8; 8192];
        bytes[100..200].copy_from_slice(&[7u8; 100]);
        bytes[5000..6000].copy_from_slice(&[9u8; 1000]);
        bytes
    }

    #[test]
    fn copy_preserves_content_exactly() {
        let dir = TempDir::create("xcp");
        let src = dir.write("src.bin", &sample_bytes());
        let dst = dir.path().join("dst.bin");

        copy_sparse_file(&src, &dst, false).unwrap();

        assert_eq!(std::fs::read(&dst).unwrap(), sample_bytes());
    }

    #[test]
    fn copy_with_hole_punch_preserves_content() {
        let dir = TempDir::create("xcp-punch");
        let src = dir.write("src.bin", &sample_bytes());
        let dst = dir.path().join("dst.bin");

        copy_sparse_file(&src, &dst, true).unwrap();

        let written = std::fs::read(&dst).unwrap();
        assert_eq!(written.len(), sample_bytes().len());
        assert_eq!(written, sample_bytes());
    }

    #[test]
    fn copy_missing_source_fails() {
        let dir = TempDir::create("xcp-missing");
        let err = copy_sparse_file(dir.path().join("nope.bin"), dir.path().join("dst.bin"), false)
            .unwrap_err();
        assert!(err.to_string().contains("failed to open"));
    }

    #[test]
    fn run_rejects_bad_argument_counts() {
        assert!(run(&[]).is_err());
        assert!(run(&["only-src".to_string()]).is_err());
        assert!(
            run(&["a".to_string(), "b".to_string(), "c".to_string()]).is_err()
        );
    }

    #[test]
    fn run_help_succeeds() {
        assert!(run(&["--help".to_string()]).is_ok());
    }

    #[test]
    fn run_copies_source_to_destination() {
        let dir = TempDir::create("xcp-run");
        let src = dir.write("src.bin", &sample_bytes());
        let dst = dir.path().join("dst.bin");

        run(&[
            src.to_str().unwrap().to_string(),
            dst.to_str().unwrap().to_string(),
        ])
        .unwrap();

        assert_eq!(std::fs::read(&dst).unwrap(), sample_bytes());
    }
}