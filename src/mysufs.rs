// Author: kelexine <https://github.com/kelexine>
// Date: 2026-10-19
// Purpose: Direct supercall driver bridge for MYSUFS stealth engine

#![allow(dead_code)]

use anyhow::{Context, Result, bail};
use log::debug;
use std::ffi::{CStr, c_char, c_int, c_long, c_longlong, c_uint, c_ulong};
use std::fs;
use std::os::fd::RawFd;
use std::os::unix::fs::MetadataExt;
use std::path::Path;
use std::sync::OnceLock;

// Magic numbers for reboot supercall hook
const MYSU_INSTALL_MAGIC1: libc::c_uint = 0xDEADBEEF;
const MYSU_INSTALL_MAGIC2: libc::c_uint = 0xCAFEBABE;

// IOCTL Direction bits
const IOC_READ: u32 = 2;
const IOC_WRITE: u32 = 1;
const IOC_READ_WRITE: u32 = IOC_READ | IOC_WRITE;

const fn ioc(dir: u32, type_: u8, nr: u32, size: usize) -> u32 {
    (dir << 30) | (((size as u32) & 0x3FFF) << 16) | ((type_ as u32) << 8) | nr
}

const fn iowr<T>(type_: u8, nr: u32) -> u32 {
    ioc(IOC_READ_WRITE, type_, nr, std::mem::size_of::<T>())
}

// IOCTL command numbers matching uapi/supercall.h
// Note: In kernel uapi, the ioctl size argument is `unsigned long`
const MYSU_IOCTL_MYSUFS_ADD_SUS_PATH: u32 = iowr::<c_ulong>(b'K', 50);
const MYSU_IOCTL_MYSUFS_ADD_SUS_PATH_LOOP: u32 = iowr::<c_ulong>(b'K', 51);
const MYSU_IOCTL_MYSUFS_SET_HIDE_SUS_MNTS: u32 = iowr::<c_ulong>(b'K', 52);
const MYSU_IOCTL_MYSUFS_ADD_SUS_KSTAT: u32 = iowr::<c_ulong>(b'K', 53);
const MYSU_IOCTL_MYSUFS_ADD_SUS_MAP: u32 = iowr::<c_ulong>(b'K', 60);
const MYSU_IOCTL_MYSUFS_ENABLE_AVC_LOG_SPOOFING: u32 = iowr::<c_ulong>(b'K', 61);
const MYSU_IOCTL_MYSUFS_SHOW_VERSION: u32 = iowr::<c_ulong>(b'K', 62);
const MYSU_IOCTL_MYSUFS_SHOW_VARIANT: u32 = iowr::<c_ulong>(b'K', 64);

const MYSUFS_MAX_LEN_PATHNAME: usize = 256;
const MYSUFS_MAX_VERSION_BUFSIZE: usize = 16;
const MYSUFS_MAX_VARIANT_BUFSIZE: usize = 16;

// kstat spoof flags
pub const KSTAT_SPOOF_INO: c_int = 1 << 0;
pub const KSTAT_SPOOF_DEV: c_int = 1 << 1;
pub const KSTAT_SPOOF_NLINK: c_int = 1 << 2;
pub const KSTAT_SPOOF_SIZE: c_int = 1 << 3;
pub const KSTAT_SPOOF_ATIME_TV_SEC: c_int = 1 << 4;
pub const KSTAT_SPOOF_ATIME_TV_NSEC: c_int = 1 << 5;
pub const KSTAT_SPOOF_MTIME_TV_SEC: c_int = 1 << 6;
pub const KSTAT_SPOOF_MTIME_TV_NSEC: c_int = 1 << 7;
pub const KSTAT_SPOOF_CTIME_TV_SEC: c_int = 1 << 8;
pub const KSTAT_SPOOF_CTIME_TV_NSEC: c_int = 1 << 9;
pub const KSTAT_SPOOF_BLOCKS: c_int = 1 << 10;
pub const KSTAT_SPOOF_BLKSIZE: c_int = 1 << 11;

#[repr(C)]
struct StMysufsSusPath {
    target_pathname: [c_char; MYSUFS_MAX_LEN_PATHNAME],
    err: c_int,
}

#[repr(C)]
struct StMysufsHideSusMntsForNonSuProcs {
    enabled: u8,
    err: c_int,
}

#[repr(C)]
pub struct StMysufsSusKstat {
    pub is_statically: c_int,
    pub target_ino: c_ulong,
    pub target_pathname: [c_char; MYSUFS_MAX_LEN_PATHNAME],
    pub spoofed_ino: c_ulong,
    pub spoofed_dev: c_ulong,
    pub spoofed_nlink: c_uint,
    pub spoofed_size: c_longlong,
    pub spoofed_atime_tv_sec: c_long,
    pub spoofed_atime_tv_nsec: c_ulong,
    pub spoofed_mtime_tv_sec: c_long,
    pub spoofed_mtime_tv_nsec: c_ulong,
    pub spoofed_ctime_tv_sec: c_long,
    pub spoofed_ctime_tv_nsec: c_ulong,
    pub spoofed_blocks: c_longlong,
    pub spoofed_blksize: c_long,
    pub flags: c_int,
    pub err: c_int,
}

#[repr(C)]
struct StMysufsSusMap {
    target_pathname: [c_char; MYSUFS_MAX_LEN_PATHNAME],
    err: c_int,
}

#[repr(C)]
struct StMysufsAvcLogSpoofing {
    enabled: u8,
    err: c_int,
}

#[repr(C)]
struct StMysufsVersion {
    mysufs_version: [c_char; MYSUFS_MAX_VERSION_BUFSIZE],
    err: c_int,
}

#[repr(C)]
struct StMysufsVariant {
    mysufs_variant: [c_char; MYSUFS_MAX_VARIANT_BUFSIZE],
    err: c_int,
}

static DRIVER_FD: OnceLock<RawFd> = OnceLock::new();

fn scan_driver_fd() -> Option<RawFd> {
    let fd_dir = fs::read_dir("/proc/self/fd").ok()?;
    for entry in fd_dir.flatten() {
        if let Ok(fd_num) = entry.file_name().to_string_lossy().parse::<i32>() {
            let link_path = format!("/proc/self/fd/{fd_num}");
            if let Ok(target) = fs::read_link(&link_path) {
                let target_str = target.to_string_lossy();
                if target_str.contains("[mysu_driver]") {
                    return Some(fd_num);
                }
            }
        }
    }
    None
}

fn init_driver_fd() -> Option<RawFd> {
    if let Some(fd) = scan_driver_fd() {
        return Some(fd);
    }

    let mut fd: RawFd = -1;
    unsafe {
        libc::syscall(
            libc::SYS_reboot,
            MYSU_INSTALL_MAGIC1,
            MYSU_INSTALL_MAGIC2,
            0,
            &mut fd,
        );
    }
    if fd >= 0 { Some(fd) } else { None }
}

fn mysuctl<T>(request: u32, arg: *mut T) -> Result<()> {
    let fd = *DRIVER_FD.get_or_init(|| init_driver_fd().unwrap_or(-1));
    if fd < 0 {
        bail!("MySU driver control plane unavailable (driver fd not acquired)");
    }
    #[cfg(target_os = "android")]
    let ret = unsafe { libc::ioctl(fd, request as libc::c_int, arg) };
    #[cfg(not(target_os = "android"))]
    let ret = unsafe { libc::ioctl(fd, request as libc::c_ulong, arg) };
    if ret < 0 {
        Err(std::io::Error::last_os_error()).context("ioctl failed")
    } else {
        Ok(())
    }
}

fn copy_str_to_buf(src: &str, dst: &mut [c_char]) {
    let bytes = src.as_bytes();
    let max = bytes.len().min(dst.len() - 1);
    for i in 0..max {
        dst[i] = bytes[i] as c_char;
    }
    dst[max] = 0;
}

fn buf_to_string(buf: &[c_char]) -> String {
    let u8_slice: &[u8] =
        unsafe { std::slice::from_raw_parts(buf.as_ptr().cast::<u8>(), buf.len()) };
    CStr::from_bytes_until_nul(u8_slice)
        .map(|cs| cs.to_string_lossy().into_owned())
        .unwrap_or_default()
}

pub fn is_mysufs_available() -> bool {
    get_version().is_ok()
}

pub fn get_version() -> Result<String> {
    let mut cmd = StMysufsVersion {
        mysufs_version: [0; MYSUFS_MAX_VERSION_BUFSIZE],
        err: 0,
    };
    mysuctl(MYSU_IOCTL_MYSUFS_SHOW_VERSION, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS show_version returned error: {}", cmd.err);
    }
    Ok(buf_to_string(&cmd.mysufs_version))
}

pub fn get_variant() -> Result<String> {
    let mut cmd = StMysufsVariant {
        mysufs_variant: [0; MYSUFS_MAX_VARIANT_BUFSIZE],
        err: 0,
    };
    mysuctl(MYSU_IOCTL_MYSUFS_SHOW_VARIANT, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS show_variant returned error: {}", cmd.err);
    }
    Ok(buf_to_string(&cmd.mysufs_variant))
}

pub fn set_hide_sus_mnts(enabled: bool) -> Result<()> {
    let mut cmd = StMysufsHideSusMntsForNonSuProcs {
        enabled: if enabled { 1 } else { 0 },
        err: 0,
    };
    mysuctl(MYSU_IOCTL_MYSUFS_SET_HIDE_SUS_MNTS, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS set_hide_sus_mnts failed with code: {}", cmd.err);
    }
    Ok(())
}

pub fn add_sus_path(path: &str, loop_mode: bool) -> Result<()> {
    let mut cmd = StMysufsSusPath {
        target_pathname: [0; MYSUFS_MAX_LEN_PATHNAME],
        err: 0,
    };
    copy_str_to_buf(path, &mut cmd.target_pathname);
    let request = if loop_mode {
        MYSU_IOCTL_MYSUFS_ADD_SUS_PATH_LOOP
    } else {
        MYSU_IOCTL_MYSUFS_ADD_SUS_PATH
    };
    mysuctl(request, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS add_sus_path failed with code: {}", cmd.err);
    }
    Ok(())
}

pub fn add_sus_map(path: &str) -> Result<()> {
    let mut cmd = StMysufsSusMap {
        target_pathname: [0; MYSUFS_MAX_LEN_PATHNAME],
        err: 0,
    };
    copy_str_to_buf(path, &mut cmd.target_pathname);
    mysuctl(MYSU_IOCTL_MYSUFS_ADD_SUS_MAP, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS add_sus_map failed with code: {}", cmd.err);
    }
    Ok(())
}

pub fn enable_avc_log_spoofing(enabled: bool) -> Result<()> {
    let mut cmd = StMysufsAvcLogSpoofing {
        enabled: if enabled { 1 } else { 0 },
        err: 0,
    };
    mysuctl(MYSU_IOCTL_MYSUFS_ENABLE_AVC_LOG_SPOOFING, &mut cmd)?;
    if cmd.err != 0 {
        bail!(
            "MYSUFS enable_avc_log_spoofing failed with code: {}",
            cmd.err
        );
    }
    Ok(())
}

/// Register a kstat spoof entry so non-su stat calls receive the authentic OEM metadata.
pub fn add_sus_kstat_spoof(
    target_path: &str,
    target_ino: u64,
    stock_meta: &fs::Metadata,
) -> Result<()> {
    let flags = KSTAT_SPOOF_INO
        | KSTAT_SPOOF_DEV
        | KSTAT_SPOOF_NLINK
        | KSTAT_SPOOF_SIZE
        | KSTAT_SPOOF_ATIME_TV_SEC
        | KSTAT_SPOOF_ATIME_TV_NSEC
        | KSTAT_SPOOF_MTIME_TV_SEC
        | KSTAT_SPOOF_MTIME_TV_NSEC
        | KSTAT_SPOOF_CTIME_TV_SEC
        | KSTAT_SPOOF_CTIME_TV_NSEC
        | KSTAT_SPOOF_BLOCKS
        | KSTAT_SPOOF_BLKSIZE;

    let mut cmd = StMysufsSusKstat {
        is_statically: 0,
        target_ino: target_ino as c_ulong,
        target_pathname: [0; MYSUFS_MAX_LEN_PATHNAME],
        spoofed_ino: stock_meta.ino() as c_ulong,
        spoofed_dev: stock_meta.dev() as c_ulong,
        spoofed_nlink: stock_meta.nlink() as c_uint,
        spoofed_size: stock_meta.size() as c_longlong,
        spoofed_atime_tv_sec: stock_meta.atime() as c_long,
        spoofed_atime_tv_nsec: stock_meta.atime_nsec() as c_ulong,
        spoofed_mtime_tv_sec: stock_meta.mtime() as c_long,
        spoofed_mtime_tv_nsec: stock_meta.mtime_nsec() as c_ulong,
        spoofed_ctime_tv_sec: stock_meta.ctime() as c_long,
        spoofed_ctime_tv_nsec: stock_meta.ctime_nsec() as c_ulong,
        spoofed_blocks: stock_meta.blocks() as c_longlong,
        spoofed_blksize: stock_meta.blksize() as c_long,
        flags,
        err: 0,
    };
    copy_str_to_buf(target_path, &mut cmd.target_pathname);

    mysuctl(MYSU_IOCTL_MYSUFS_ADD_SUS_KSTAT, &mut cmd)?;
    if cmd.err != 0 {
        bail!("MYSUFS add_sus_kstat failed with code: {}", cmd.err);
    }
    Ok(())
}

/// Helper that inspects the stock file and module replacement file to configure kstat spoofing.
pub fn configure_file_stealth(stock_path: &Path, module_file: &Path, overlay_dest: &Path) {
    if !stock_path.exists() {
        return;
    }

    let Ok(stock_meta) = fs::metadata(stock_path) else {
        return;
    };
    let Ok(module_meta) = fs::metadata(module_file) else {
        return;
    };

    let target_path_str = overlay_dest.display().to_string();
    let target_ino = module_meta.ino();

    if let Err(e) = add_sus_kstat_spoof(&target_path_str, target_ino, &stock_meta) {
        debug!("MYSUFS: skipped kstat spoof for {target_path_str}: {e}");
    } else {
        debug!(
            "MYSUFS: spoofed kstat for {target_path_str} -> ino {}",
            stock_meta.ino()
        );
    }

    // Mask native shared objects and executables from /proc/maps
    if (target_path_str.ends_with(".so") || target_path_str.contains("/bin/"))
        && let Err(e) = add_sus_map(&target_path_str)
    {
        debug!("MYSUFS: skipped sus_map for {target_path_str}: {e}");
    }
}
