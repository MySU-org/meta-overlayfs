// MyOverlayFs mounting implementation
// Migrated and adapted for dual-directory architecture

use anyhow::{Context, Result, bail};
use log::{debug, info};
use std::collections::HashMap;
use std::path::Path;

#[cfg(target_os = "android")]
use log::warn;
#[cfg(target_os = "android")]
use std::path::PathBuf;

#[cfg(target_os = "android")]
use procfs::process::Process;
#[cfg(target_os = "android")]
use rustix::{fd::AsFd, fs::CWD, mount::*};

use crate::defs::{DISABLE_FILE_NAME, SKIP_MOUNT_FILE_NAME, SYSTEM_RW_DIR};
#[cfg(target_os = "android")]
use crate::defs::MYSU_OVERLAY_SOURCE;

#[cfg(target_os = "android")]
pub fn mount_overlayfs(
    lower_dirs: &[String],
    lowest: &str,
    upperdir: Option<PathBuf>,
    workdir: Option<PathBuf>,
    dest: impl AsRef<Path>,
) -> Result<()> {
    let lowerdir_config = lower_dirs
        .iter()
        .map(|s| s.as_ref())
        .chain(std::iter::once(lowest))
        .collect::<Vec<_>>()
        .join(":");

    info!(
        "Overlaying {} ({} lowerdirs)",
        dest.as_ref().display(),
        lower_dirs.len()
    );
    debug!(
        "Overlay details - lowerdir={}, upperdir={:?}, workdir={:?}",
        lowerdir_config, upperdir, workdir
    );

    let upperdir = upperdir
        .filter(|up| up.exists())
        .map(|e| e.display().to_string());
    let workdir = workdir
        .filter(|wd| wd.exists())
        .map(|e| e.display().to_string());

    let result = (|| {
        let fs = fsopen("overlay", FsOpenFlags::FSOPEN_CLOEXEC)?;
        let fs = fs.as_fd();
        fsconfig_set_string(fs, "lowerdir", &lowerdir_config)?;
        if let (Some(upperdir), Some(workdir)) = (&upperdir, &workdir) {
            fsconfig_set_string(fs, "upperdir", upperdir)?;
            fsconfig_set_string(fs, "workdir", workdir)?;
        }
        fsconfig_set_string(fs, "source", MYSU_OVERLAY_SOURCE)?;
        fsconfig_create(fs)?;
        let mount = fsmount(fs, FsMountFlags::FSMOUNT_CLOEXEC, MountAttrFlags::empty())?;
        move_mount(
            mount.as_fd(),
            "",
            CWD,
            dest.as_ref(),
            MoveMountFlags::MOVE_MOUNT_F_EMPTY_PATH,
        )
    })();

    if let Err(e) = result {
        warn!("fsopen overlay rejected ({e:#}), falling back to legacy mount");
        let mut data = format!("lowerdir={lowerdir_config}");
        if let (Some(upperdir), Some(workdir)) = (upperdir, workdir) {
            data = format!("{data},upperdir={upperdir},workdir={workdir}");
        }
        mount(
            MYSU_OVERLAY_SOURCE,
            dest.as_ref(),
            "overlay",
            MountFlags::empty(),
            data,
        )?;
    }
    Ok(())
}

#[cfg(target_os = "android")]
pub fn bind_mount(from: impl AsRef<Path>, to: impl AsRef<Path>) -> Result<()> {
    info!(
        "Bind mounting {} -> {}",
        from.as_ref().display(),
        to.as_ref().display()
    );
    let tree = open_tree(
        CWD,
        from.as_ref(),
        OpenTreeFlags::OPEN_TREE_CLOEXEC
            | OpenTreeFlags::OPEN_TREE_CLONE
            | OpenTreeFlags::AT_RECURSIVE,
    )?;
    move_mount(
        tree.as_fd(),
        "",
        CWD,
        to.as_ref(),
        MoveMountFlags::MOVE_MOUNT_F_EMPTY_PATH,
    )?;
    Ok(())
}

#[cfg(target_os = "android")]
fn mount_overlay_child(
    mount_point: &str,
    relative: &String,
    module_roots: &Vec<String>,
    stock_root: &String,
) -> Result<()> {
    if !module_roots
        .iter()
        .any(|lower| Path::new(&format!("{lower}{relative}")).exists())
    {
        return bind_mount(stock_root, mount_point);
    }
    if !Path::new(&stock_root).is_dir() {
        return Ok(());
    }
    let mut lower_dirs: Vec<String> = vec![];
    for lower in module_roots {
        let lower_dir = format!("{lower}{relative}");
        let path = Path::new(&lower_dir);
        if path.is_dir() {
            lower_dirs.push(lower_dir);
        } else if path.exists() {
            // The stock root has been explicitly blocked/shadowed by this file
            return Ok(());
        }
    }
    if lower_dirs.is_empty() {
        return Ok(());
    }

    if let Err(e) = mount_overlayfs(&lower_dirs, stock_root, None, None, mount_point) {
        warn!("Overlay rejected for child {} ({e:#}), falling back to bind mount", mount_point);
        bind_mount(stock_root, mount_point)?;
    }
    Ok(())
}

#[cfg(target_os = "android")]
pub fn mount_overlay(
    root: &String,
    module_roots: &Vec<String>,
    workdir: Option<PathBuf>,
    upperdir: Option<PathBuf>,
) -> Result<()> {
    debug!("Mount overlay requested for {root}");
    std::env::set_current_dir(root).with_context(|| format!("failed to chdir to {root}"))?;
    let stock_root = ".";

    // Map existing child mounts before throwing the master overlay to prevent shadowing OS mounts
    let mounts = Process::myself()?
        .mountinfo()
        .with_context(|| "get mountinfo")?;
    let mut mount_seq = mounts
        .0
        .iter()
        .filter(|m| {
            m.mount_point.starts_with(root) && !Path::new(&root).starts_with(&m.mount_point)
        })
        .map(|m| m.mount_point.to_str())
        .collect::<Vec<_>>();
    mount_seq.sort();
    mount_seq.dedup();

    mount_overlayfs(module_roots, root, upperdir, workdir, root)
        .with_context(|| "mount myoverlayfs for root failed")?;

    for mount_point in mount_seq.iter() {
        let Some(mount_point) = mount_point else {
            continue;
        };
        let relative = mount_point.replacen(root, "", 1);
        let stock_root: String = format!("{stock_root}{relative}");
        if !Path::new(&stock_root).exists() {
            continue;
        }
        if let Err(e) = mount_overlay_child(mount_point, &relative, module_roots, &stock_root) {
            warn!("Failed to mount overlay for child {mount_point}: {e:#}, reverting");
            umount_dir(root).with_context(|| format!("failed to revert {root}"))?;
            bail!(e);
        }
    }
    Ok(())
}

#[cfg(target_os = "android")]
pub fn umount_dir(src: impl AsRef<Path>) -> Result<()> {
    unmount(src.as_ref(), UnmountFlags::empty())
        .with_context(|| format!("Failed to umount {}", src.as_ref().display()))?;
    Ok(())
}

#[cfg(target_os = "android")]
fn mount_partition(partition_name: &str, lowerdir: &Vec<String>) -> Result<()> {
    if lowerdir.is_empty() {
        debug!("Partition: {} has no module overlays, skipping", partition_name);
        return Ok(());
    }

    let partition = format!("/{partition_name}");

    // Bypass partitions that are just symlinks to avoid duplicate overlays
    if Path::new(&partition).read_link().is_ok() {
        debug!("Partition: {} is a symlink, skipping", partition);
        return Ok(());
    }

    let mut workdir = None;
    let mut upperdir = None;
    let system_rw_dir = Path::new(SYSTEM_RW_DIR);
    if system_rw_dir.exists() {
        workdir = Some(system_rw_dir.join(partition_name).join("workdir"));
        upperdir = Some(system_rw_dir.join(partition_name).join("upperdir"));
    }

    mount_overlay(&partition, lowerdir, workdir, upperdir)
}

// Shared by the mount path and host tooling/tests; pure filesystem scan.
pub fn collect_enabled_modules(metadata_dir: &str) -> Result<Vec<String>> {
    let dir = std::fs::read_dir(metadata_dir)
        .with_context(|| format!("Failed to read metadata directory: {}", metadata_dir))?;

    let mut enabled = Vec::new();

    for entry in dir.flatten() {
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }

        let module_id = match entry.file_name().to_str() {
            Some(id) => id.to_string(),
            None => continue,
        };

        if path.join(DISABLE_FILE_NAME).exists() {
            debug!("Module {} is disabled, skipping", module_id);
            continue;
        }

        if path.join(SKIP_MOUNT_FILE_NAME).exists() {
            debug!("Module {} has skip_mount, skipping", module_id);
            continue;
        }

        if !path.join("module.prop").exists() && !path.eq(Path::new(SYSTEM_RW_DIR)) {
            debug!("Module {} has no module.prop, skipping", module_id);
            continue;
        }

        enabled.push(module_id);
    }

    enabled.sort();
    Ok(enabled)
}

/// Extra partitions handled besides /system, in scan order.
pub const EXTRA_PARTITIONS: &[&str] = &["vendor", "product", "system_ext", "odm", "oem"];

// Pure planner: maps enabled modules to per-partition lowerdir stacks.
// Shared by the Android mount path and host-side tooling/tests.
pub fn plan_partition_lowerdirs(
    enabled_modules: &[String],
    content_dir: &str,
) -> (Vec<String>, HashMap<String, Vec<String>>) {
    let mut system_lowerdir: Vec<String> = Vec::new();
    let mut partition_lowerdir: HashMap<String, Vec<String>> = HashMap::new();

    for part in EXTRA_PARTITIONS {
        partition_lowerdir.insert((*part).to_string(), Vec::new());
    }

    for module_id in enabled_modules {
        let module_content_path = Path::new(content_dir).join(module_id);

        if !module_content_path.exists() {
            info!("Module {}: active (No overlay partitions)", module_id);
            continue;
        }

        let mut provided_parts = Vec::new();

        let system_path = module_content_path.join("system");
        if system_path.is_dir() {
            system_lowerdir.push(system_path.display().to_string());
            provided_parts.push("system");
        }

        for part in EXTRA_PARTITIONS {
            let part_path = module_content_path.join(part);
            if part_path.is_dir() {
                if let Some(v) = partition_lowerdir.get_mut(*part) {
                    v.push(part_path.display().to_string());
                    provided_parts.push(part);
                }
            }
        }

        if !provided_parts.is_empty() {
            info!("Module {}: overlays [{}]", module_id, provided_parts.join(", "));
        } else {
            info!("Module {}: active (No overlay partitions)", module_id);
        }
    }

    (system_lowerdir, partition_lowerdir)
}

/// Architecture:
/// - metadata_dir: Stores module.prop, disable, skip_mount flags (Stock Magisk/MYSU dir)
/// - content_dir: Stores the actual modified partition files injected via ext4 image
#[cfg(target_os = "android")]
pub fn mount_modules_systemlessly(metadata_dir: &str, content_dir: &str) -> Result<()> {
    info!("Scanning modules (dual-directory mode)");
    debug!("  Metadata: {}", metadata_dir);
    debug!("  Content: {}", content_dir);

    let enabled_modules = collect_enabled_modules(metadata_dir)?;

    if enabled_modules.is_empty() {
        info!("No enabled modules found");
        return Ok(());
    }

    info!("Found {} enabled module(s)", enabled_modules.len());

    let (system_lowerdir, partition_lowerdir) =
        plan_partition_lowerdirs(&enabled_modules, content_dir);

    info!("Mounting partitions...");

    if let Err(e) = mount_partition("system", &system_lowerdir) {
        warn!("mount system failed: {e:#}");
    }

    for (k, v) in partition_lowerdir {
        if let Err(e) = mount_partition(&k, &v) {
            warn!("mount {k} failed: {e:#}");
        }
    }

    info!("All partitions processed successfully");
    Ok(())
}

// Host stub: mounting requires Android mount namespaces. The scan still runs
// so host tooling reports what would be mounted before failing clearly.
#[cfg(not(target_os = "android"))]
pub fn mount_modules_systemlessly(metadata_dir: &str, content_dir: &str) -> Result<()> {
    let enabled = collect_enabled_modules(metadata_dir)?;
    let _ = plan_partition_lowerdirs(&enabled, content_dir);
    bail!("systemless mounting is only supported on Android")
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_support::TempDir;

    fn make_module(meta: &TempDir, id: &str, markers: &[&str]) {
        let dir = meta.mkdir(id);
        std::fs::write(dir.join("module.prop"), "id=test\n").unwrap();
        for marker in markers {
            std::fs::write(dir.join(marker), "").unwrap();
        }
    }

    #[test]
    fn enabled_modules_are_sorted_and_filtered() {
        let meta = TempDir::create("meta");
        make_module(&meta, "zeta", &[]);
        make_module(&meta, "alpha", &[]);
        make_module(&meta, "disabled_mod", &[DISABLE_FILE_NAME]);
        make_module(&meta, "skipped_mod", &[SKIP_MOUNT_FILE_NAME]);
        meta.mkdir("no_prop_mod");
        meta.write("stray_file", b"x");

        let enabled = collect_enabled_modules(meta.path().to_str().unwrap()).unwrap();
        assert_eq!(enabled, vec!["alpha".to_string(), "zeta".to_string()]);
    }

    #[test]
    fn missing_metadata_dir_is_an_error() {
        let missing = std::env::temp_dir().join("myoverlayfs-does-not-exist-12345");
        let _ = std::fs::remove_dir_all(&missing);
        assert!(collect_enabled_modules(missing.to_str().unwrap()).is_err());
    }

    #[test]
    fn planner_maps_partitions_in_module_order() {
        let content = TempDir::create("content");
        content.mkdir("modA/system");
        content.mkdir("modA/vendor");
        content.mkdir("modB/system");
        content.write("modB/vendor", b"not a dir");
        // modC has no content dir at all.

        let enabled = vec!["modA".to_string(), "modB".to_string(), "modC".to_string()];
        let (system, parts) =
            plan_partition_lowerdirs(&enabled, content.path().to_str().unwrap());

        assert_eq!(system.len(), 2);
        assert!(system[0].ends_with("modA/system"));
        assert!(system[1].ends_with("modB/system"));
        assert_eq!(
            parts["vendor"],
            vec![content.path().join("modA/vendor").display().to_string()]
        );
        assert!(parts["product"].is_empty());
        assert_eq!(parts.len(), EXTRA_PARTITIONS.len());
    }

    #[test]
    fn planner_with_no_modules_yields_empty_stacks() {
        let content = TempDir::create("content-empty");
        let (system, parts) = plan_partition_lowerdirs(&[], content.path().to_str().unwrap());
        assert!(system.is_empty());
        assert!(parts.values().all(Vec::is_empty));
    }

    #[cfg(not(target_os = "android"))]
    #[test]
    fn host_mount_stub_reports_android_only() {
        let meta = TempDir::create("host-meta");
        let content = TempDir::create("host-content");
        let err = mount_modules_systemlessly(
            meta.path().to_str().unwrap(),
            content.path().to_str().unwrap(),
        )
        .unwrap_err();
        assert!(err.to_string().contains("Android"));
    }
}