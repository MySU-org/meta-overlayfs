// Author: kelexine <https://github.com/kelexine>
// Date: 2026-10-19
// Purpose: Single-directory overlayfs mounting engine for MySU modules

#![allow(dead_code)]

use anyhow::{Context, Result, bail};
use log::{debug, info, warn};
use std::collections::HashMap;
use std::fs;
use std::path::Path;
#[cfg(target_os = "android")]
use std::path::PathBuf;

#[cfg(target_os = "android")]
use procfs::process::Process;
#[cfg(target_os = "android")]
use rustix::{fd::AsFd, fs::CWD, mount::*};

#[cfg(target_os = "android")]
use crate::defs::MYSU_OVERLAY_SOURCE;
use crate::defs::{
    DISABLE_FILE_NAME, MODULE_UPDATES_DIR, REMOVE_FILE_NAME, SKIP_MOUNT_FILE_NAME, SYSTEM_RW_DIR,
};

/// Extra partitions handled besides /system, in scan order.
pub const EXTRA_PARTITIONS: &[&str] = &["vendor", "product", "system_ext", "odm", "oem"];

/// Atomically apply pending updates from modules_update directory.
pub fn apply_pending_updates(modules_dir: &str, updates_dir: &str) -> Result<()> {
    let updates_path = Path::new(updates_dir);
    if !updates_path.is_dir() {
        return Ok(());
    }

    let entries = fs::read_dir(updates_path)
        .with_context(|| format!("Failed to read updates directory: {updates_dir}"))?;

    for entry in entries.flatten() {
        let update_mod_path = entry.path();
        if !update_mod_path.is_dir() {
            continue;
        }

        let Some(mod_id) = update_mod_path.file_name().and_then(|n| n.to_str()) else {
            continue;
        };

        let target_mod_path = Path::new(modules_dir).join(mod_id);
        info!("Applying pending module update for: {mod_id}");

        // Delete old module directory if it exists
        if target_mod_path.exists()
            && let Err(e) = fs::remove_dir_all(&target_mod_path)
        {
            warn!("Failed to remove old module {mod_id}: {e}");
        }

        // Rename updated module directory into place
        if let Err(e) = fs::rename(&update_mod_path, &target_mod_path) {
            warn!("Failed to promote update for {mod_id}: {e}");
        }
    }

    Ok(())
}

/// Process remove markers and purge deleted modules.
pub fn process_module_removals(modules_dir: &str) -> Result<()> {
    let modules_path = Path::new(modules_dir);
    if !modules_path.is_dir() {
        return Ok(());
    }

    let entries = fs::read_dir(modules_path)
        .with_context(|| format!("Failed to read modules directory: {modules_dir}"))?;

    for entry in entries.flatten() {
        let mod_path = entry.path();
        if !mod_path.is_dir() {
            continue;
        }

        if mod_path.join(REMOVE_FILE_NAME).exists() {
            let mod_id = mod_path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("unknown");
            info!("Removing marked module: {mod_id}");
            if let Err(e) = fs::remove_dir_all(&mod_path) {
                warn!("Failed to purge removed module {mod_id}: {e}");
            }
        }
    }

    Ok(())
}

/// Returns true if a module directory is eligible for overlay mounting.
fn is_module_enabled(path: &Path, module_id: &str) -> bool {
    if path.join(DISABLE_FILE_NAME).exists() || path.join(".disable").exists() {
        debug!("Module {module_id} is disabled, skipping");
        return false;
    }
    if path.join(SKIP_MOUNT_FILE_NAME).exists() {
        debug!("Module {module_id} has skip_mount, skipping");
        return false;
    }
    if path.join(REMOVE_FILE_NAME).exists() {
        debug!("Module {module_id} marked for removal, skipping");
        return false;
    }
    if !path.join("module.prop").exists() && !path.eq(Path::new(SYSTEM_RW_DIR)) {
        debug!("Module {module_id} has no module.prop, skipping");
        return false;
    }
    true
}

/// Shared by the mount path and host tooling/tests; pure filesystem scan.
pub fn collect_enabled_modules(modules_dir: &str) -> Result<Vec<String>> {
    let dir = fs::read_dir(modules_dir)
        .with_context(|| format!("Failed to read modules directory: {modules_dir}"))?;

    let mut enabled = Vec::new();

    for entry in dir.flatten() {
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }

        let Some(module_id) = entry.file_name().to_str().map(str::to_string) else {
            continue;
        };

        if is_module_enabled(&path, &module_id) {
            enabled.push(module_id);
        }
    }

    enabled.sort();
    Ok(enabled)
}

/// Pure planner: maps enabled modules directly to per-partition lowerdir stacks.
pub fn plan_partition_lowerdirs(
    enabled_modules: &[String],
    modules_dir: &str,
) -> (Vec<String>, HashMap<String, Vec<String>>) {
    let mut system_lowerdir: Vec<String> = Vec::new();
    let mut partition_lowerdir: HashMap<String, Vec<String>> = HashMap::new();

    for part in EXTRA_PARTITIONS {
        partition_lowerdir.insert((*part).to_string(), Vec::new());
    }

    for module_id in enabled_modules {
        let module_base_path = Path::new(modules_dir).join(module_id);

        if !module_base_path.exists() {
            info!("Module {module_id}: active (No overlay partitions)");
            continue;
        }

        let mut provided_parts = Vec::new();

        let system_path = module_base_path.join("system");
        if system_path.is_dir() {
            system_lowerdir.push(system_path.display().to_string());
            provided_parts.push("system");
        }

        for part in EXTRA_PARTITIONS {
            let part_path = module_base_path.join(part);
            if part_path.is_dir()
                && let Some(v) = partition_lowerdir.get_mut(*part)
            {
                v.push(part_path.display().to_string());
                provided_parts.push(part);
            }
        }

        if !provided_parts.is_empty() {
            info!(
                "Module {module_id}: overlays [{}]",
                provided_parts.join(", ")
            );
        } else {
            info!("Module {module_id}: active (No overlay partitions)");
        }
    }

    (system_lowerdir, partition_lowerdir)
}

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

    let rw_dirs = match (upperdir, workdir) {
        (Some(up), Some(wd)) if up.exists() && wd.exists() => {
            Some((up.display().to_string(), wd.display().to_string()))
        }
        _ => None,
    };

    let result = (|| {
        let fs = fsopen("overlay", FsOpenFlags::FSOPEN_CLOEXEC)?;
        let fs = fs.as_fd();
        fsconfig_set_string(fs, "lowerdir", &lowerdir_config)?;
        if let Some((upperdir, workdir)) = &rw_dirs {
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
        if let Some((upperdir, workdir)) = rw_dirs {
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
    relative: &str,
    module_roots: &[String],
    stock_root: &str,
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
        warn!("Overlay rejected for child {mount_point} ({e:#}), falling back to bind mount");
        bind_mount(stock_root, mount_point)?;
    }
    Ok(())
}

#[cfg(target_os = "android")]
pub fn mount_overlay(
    root: &str,
    module_roots: &[String],
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
fn mount_partition(partition_name: &str, lowerdir: &[String]) -> Result<()> {
    if lowerdir.is_empty() {
        debug!("Partition: {partition_name} has no module overlays, skipping");
        return Ok(());
    }

    let partition = format!("/{partition_name}");

    // Bypass partitions that are just symlinks to avoid duplicate overlays
    if Path::new(&partition).read_link().is_ok() {
        debug!("Partition: {partition} is a symlink, skipping");
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

#[cfg(target_os = "android")]
pub fn mount_modules_systemlessly(modules_dir: &str) -> Result<()> {
    info!("Scanning modules from: {modules_dir}");

    // 1. Process pending atomic module updates & removals
    if let Err(e) = apply_pending_updates(modules_dir, MODULE_UPDATES_DIR) {
        warn!("Failed to apply pending module updates: {e:#}");
    }
    if let Err(e) = process_module_removals(modules_dir) {
        warn!("Failed to process module removals: {e:#}");
    }

    // 2. Discover enabled modules
    let enabled_modules = collect_enabled_modules(modules_dir)?;
    if enabled_modules.is_empty() {
        info!("No enabled modules found");
        return Ok(());
    }

    info!("Found {} enabled module(s)", enabled_modules.len());

    // 3. Plan partition lowerdir stacks
    let (system_lowerdir, partition_lowerdir) =
        plan_partition_lowerdirs(&enabled_modules, modules_dir);

    info!("Mounting partition overlays...");

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

#[cfg(not(target_os = "android"))]
pub fn mount_modules_systemlessly(modules_dir: &str) -> Result<()> {
    if let Err(e) = apply_pending_updates(modules_dir, MODULE_UPDATES_DIR) {
        warn!("Failed to apply pending module updates: {e:#}");
    }
    if let Err(e) = process_module_removals(modules_dir) {
        warn!("Failed to process module removals: {e:#}");
    }
    let enabled = collect_enabled_modules(modules_dir)?;
    let _ = plan_partition_lowerdirs(&enabled, modules_dir);
    bail!("systemless mounting is only supported on Android")
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_support::TempDir;

    fn make_module(root: &TempDir, id: &str, markers: &[&str]) {
        let dir = root.mkdir(id);
        fs::write(dir.join("module.prop"), "id=test\n").unwrap();
        for marker in markers {
            fs::write(dir.join(marker), "").unwrap();
        }
    }

    #[test]
    fn enabled_modules_are_sorted_and_filtered() {
        let root = TempDir::create("root");
        make_module(&root, "zeta", &[]);
        make_module(&root, "alpha", &[]);
        make_module(&root, "disabled_mod", &[DISABLE_FILE_NAME]);
        make_module(&root, "dot_disabled_mod", &[".disable"]);
        make_module(&root, "skipped_mod", &[SKIP_MOUNT_FILE_NAME]);
        make_module(&root, "removed_mod", &[REMOVE_FILE_NAME]);
        root.mkdir("no_prop_mod");
        root.write("stray_file", b"x");

        let enabled = collect_enabled_modules(root.path().to_str().unwrap()).unwrap();
        assert_eq!(enabled, vec!["alpha".to_string(), "zeta".to_string()]);
    }

    #[test]
    fn apply_pending_updates_promotes_cleanly() {
        let root = TempDir::create("mods");
        let updates = TempDir::create("updates");

        let old_mod = root.mkdir("mod_x");
        fs::write(old_mod.join("module.prop"), "version=1.0\n").unwrap();

        let updated_mod = updates.mkdir("mod_x");
        fs::write(updated_mod.join("module.prop"), "version=2.0\n").unwrap();

        apply_pending_updates(
            root.path().to_str().unwrap(),
            updates.path().to_str().unwrap(),
        )
        .unwrap();

        let prop_content = fs::read_to_string(old_mod.join("module.prop")).unwrap();
        assert!(prop_content.contains("version=2.0"));
    }

    #[test]
    fn planner_maps_partitions_in_module_order() {
        let root = TempDir::create("modules_root");
        root.mkdir("modA/system");
        root.mkdir("modA/vendor");
        root.mkdir("modB/system");
        root.write("modB/vendor", b"not a dir");

        let enabled = vec!["modA".to_string(), "modB".to_string(), "modC".to_string()];
        let (system, parts) = plan_partition_lowerdirs(&enabled, root.path().to_str().unwrap());

        assert_eq!(system.len(), 2);
        assert!(system[0].ends_with("modA/system"));
        assert!(system[1].ends_with("modB/system"));
        assert_eq!(
            parts["vendor"],
            vec![root.path().join("modA/vendor").display().to_string()]
        );
        assert!(parts["product"].is_empty());
        assert_eq!(parts.len(), EXTRA_PARTITIONS.len());
    }

    #[test]
    fn process_module_removals_deletes_marked_modules_only() {
        let root = TempDir::create("removals");
        make_module(&root, "keep_me", &[]);
        make_module(&root, "delete_me", &[REMOVE_FILE_NAME]);

        process_module_removals(root.path().to_str().unwrap()).unwrap();

        assert!(root.path().join("keep_me").exists());
        assert!(!root.path().join("delete_me").exists());
    }
}
