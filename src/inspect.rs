// myoverlayfs inspect (Real-Time Kernel Mount Inspector)
//
// Unlike standard user-space simulations that guess what "should" be mounted based on
// folder structures, this tool queries the Linux kernel directly via /proc/mounts.
// It dynamically extracts the exact `lowerdir` parameters the kernel is currently enforcing.
// This eliminates assumptions: if a mount failed, the kernel won't report it here.
// If multiple modules inject the same file, the kernel's left-to-right lowerdir
// priority strictly dictates which file "wins".

use anyhow::Result;
use log::info;
use std::collections::{BTreeMap, HashSet};
use std::fs;
use std::path::Path;

// Safely escape strings for raw JSON manual building
fn escape_json(s: &str) -> String {
    s.replace('\\', "\\\\").replace('\"', "\\\"")
}

// Recursively collect all file paths under a directory, relative to base.
// Directories are skipped — only true files are counted.
fn walk_dir(dir: &Path, base: &Path, entries: &mut Vec<String>) {
    if let Ok(read_dir) = fs::read_dir(dir) {
        for entry in read_dir.flatten() {
            let path = entry.path();
            if path.is_dir() {
                walk_dir(&path, base, entries);
            } else if let Ok(rel) = path.strip_prefix(base) {
                entries.push(rel.display().to_string());
            }
        }
    }
}

// Parse a mount path to extract the module root directory and module ID.
// Supports both direct (/data/adb/modules/<id>) and legacy (/mnt/<id>) paths.
fn extract_from_module_path(path: &str) -> Option<(String, String)> {
    if let Some(idx) = path.find("/data/adb/modules/") {
        let content_dir = path[..idx + 17].to_string(); // "/data/adb/modules"
        let remainder = &path[idx + 18..];
        let module_id = remainder.split('/').next().filter(|s| !s.is_empty())?;
        return Some((module_id.to_string(), content_dir));
    }
    if let Some(idx) = path.find("/mnt/") {
        let content_dir = path[..idx + 4].to_string();
        let remainder = &path[idx + 5..];
        let module_id = remainder.split('/').next().filter(|s| !s.is_empty())?;
        return Some((module_id.to_string(), content_dir));
    }
    None
}

// Discover our overlay/bind mounts from kernel mount data.
// Returns the mount point map (modules kept in lowerdir priority order)
// plus the resolved content dir used for file-system lookups.
pub fn discover_partitions(
    mounts_data: &str,
    env_content_dir: Option<&str>,
) -> (BTreeMap<String, Vec<String>>, String) {
    let mut active_partitions: BTreeMap<String, Vec<String>> = BTreeMap::new();

    // Resolved at runtime — either from the hint or extracted from live mount entries.
    // Used for all subsequent file-system lookups so no path is ever hardcoded.
    let mut resolved_content_dir = env_content_dir.unwrap_or_default().to_string();

    // Pass 1: OverlayFS mounts (fsopen / new-style kernel path)
    // Each lowerdir entry is a colon-separated list of absolute paths the kernel
    // is stacking. We scan each segment to identify which belong to us.
    for line in mounts_data.lines() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 4 {
            continue;
        }

        let mount_point = parts[1];
        let fs_type = parts[2];
        let options = parts[3];

        if fs_type != "overlay" {
            continue;
        }

        if let Some(lowerdir_str) = options.split(',').find(|s| s.starts_with("lowerdir=")) {
            let paths = lowerdir_str.trim_start_matches("lowerdir=");
            let mut modules_in_order = Vec::new();
            let mut is_our_mount = false;

            for path in paths.split(':') {
                // Strategy 1: env var is set — check if this lowerdir segment lives under it
                let matched = if !resolved_content_dir.is_empty() {
                    let prefix = format!("{}/", resolved_content_dir.trim_end_matches('/'));
                    if path.starts_with(&prefix) {
                        let remainder = &path[prefix.len()..];
                        if let Some(module_id) =
                            remainder.split('/').next().filter(|s| !s.is_empty())
                        {
                            if !modules_in_order.contains(&module_id.to_string()) {
                                modules_in_order.push(module_id.to_string());
                            }
                            true
                        } else {
                            false
                        }
                    } else {
                        false
                    }
                } else {
                    false
                };

                // Strategy 2: no env var — derive content dir dynamically from the path itself
                if !matched {
                    if let Some((module_id, content_dir)) = extract_from_module_path(path)
                        && path.contains("/data/adb/")
                    {
                        is_our_mount = true;
                        if resolved_content_dir.is_empty() {
                            resolved_content_dir = content_dir;
                        }
                        if !modules_in_order.contains(&module_id) {
                            modules_in_order.push(module_id);
                        }
                    }
                } else {
                    is_our_mount = true;
                }
            }

            if is_our_mount {
                active_partitions.insert(mount_point.to_string(), modules_in_order);
            }
        }
    }

    // Pass 2: Bind mounts (legacy mount() fallback)
    // When fsopen overlay is rejected, individual dirs are bind-mounted instead.
    // The mount source is a direct path into the content dir rather than a lowerdir entry.
    // e.g. source=<content_dir>/<module_id>/product/media  mount_point=/product/media
    for line in mounts_data.lines() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() < 3 {
            continue;
        }

        let source = parts[0];
        let mount_point = parts[1];
        let fs_type = parts[2];

        if fs_type == "overlay" {
            continue;
        }

        // Strategy 1: match source against the already-resolved content dir
        let matched = if !resolved_content_dir.is_empty() {
            let prefix = format!("{}/", resolved_content_dir);
            if source.starts_with(&prefix) {
                let remainder = &source[prefix.len()..];
                if let Some(module_id) = remainder.split('/').next().filter(|s| !s.is_empty()) {
                    let entry = active_partitions
                        .entry(mount_point.to_string())
                        .or_default();
                    if !entry.contains(&module_id.to_string()) {
                        entry.push(module_id.to_string());
                    }
                    true
                } else {
                    false
                }
            } else {
                false
            }
        } else {
            false
        };

        // Strategy 2: content dir not yet known — extract it from the source path
        if !matched
            && let Some((module_id, content_dir)) = extract_from_module_path(source)
            && source.contains("/data/adb/")
        {
            if resolved_content_dir.is_empty() {
                resolved_content_dir = content_dir;
            }
            let entry = active_partitions
                .entry(mount_point.to_string())
                .or_default();
            if !entry.contains(&module_id) {
                entry.push(module_id);
            }
        }
    }

    (active_partitions, resolved_content_dir)
}

// Collapse sub-paths so the display list only shows top-level partition roots.
// e.g. if both /product and /product/media are present, /product/media is hidden.
pub fn collapse_display_partitions(
    active_partitions: &BTreeMap<String, Vec<String>>,
) -> Vec<String> {
    let mut display_partitions: Vec<String> = Vec::new();
    for p in active_partitions.keys() {
        let mut is_sub = false;
        for base in &display_partitions {
            if p.starts_with(&format!("{}/", base)) {
                is_sub = true;
                break;
            }
        }
        if !is_sub {
            display_partitions.push(p.clone());
        }
    }
    display_partitions
}

// Walk the actual file tree under each kernel-confirmed partition for every active module.
// Returns (files per module, logical partitions per module, virtual path -> providers).
// Sub-partition paths (e.g. /system/fonts, /product/overlay) are derived from file paths
// rather than mount entries — Android does not create separate mounts for these dirs.
#[allow(clippy::type_complexity)]
pub fn collect_module_files(
    active_partitions: &BTreeMap<String, Vec<String>>,
    content_dir: &str,
) -> (
    BTreeMap<String, usize>,
    BTreeMap<String, Vec<String>>,
    BTreeMap<String, Vec<String>>,
) {
    let mut global_module_file_counts: BTreeMap<String, usize> = BTreeMap::new();
    let mut module_partitions: BTreeMap<String, Vec<String>> = BTreeMap::new();
    let mut global_file_map: BTreeMap<String, Vec<String>> = BTreeMap::new();
    let mut processed_files_per_module: BTreeMap<String, Vec<String>> = BTreeMap::new();

    for (partition, modules) in active_partitions {
        let part_name = partition.trim_start_matches('/');

        for module_id in modules {
            let mod_part_path = Path::new(content_dir).join(module_id).join(part_name);
            if !mod_part_path.exists() {
                continue;
            }

            let mut files = Vec::new();
            walk_dir(&mod_part_path, &mod_part_path, &mut files);

            if !files.is_empty() {
                let p_list = module_partitions.entry(module_id.clone()).or_default();

                for f in &files {
                    // First path component of a relative file path is its sub-partition dir.
                    // Files sitting directly in the partition root have no sub-dir component.
                    let sub: Option<&str> = if f.contains('/') {
                        f.split('/').next().filter(|s| !s.is_empty())
                    } else {
                        None
                    };

                    let logical_partition = match sub {
                        Some(dir) => format!("/{}/{}", part_name, dir),
                        None => format!("/{}", part_name),
                    };

                    if !p_list.contains(&logical_partition) {
                        p_list.push(logical_partition);
                    }
                }
            }

            for f in files {
                let virtual_path = format!("{}/{}", part_name, f);

                // Deduplicate per-module to avoid inflated counts from nested bind mounts
                // where the same file can appear under both /product and /product/media entries.
                let module_files = processed_files_per_module
                    .entry(module_id.clone())
                    .or_default();
                if !module_files.contains(&virtual_path) {
                    module_files.push(virtual_path.clone());
                    *global_module_file_counts
                        .entry(module_id.clone())
                        .or_insert(0) += 1;
                }

                // Track all modules providing each virtual path to detect conflicts.
                // Left-to-right lowerdir order means index 0 is the winner.
                let conflict_list = global_file_map.entry(virtual_path).or_default();
                if !conflict_list.contains(module_id) {
                    conflict_list.push(module_id.clone());
                }
            }
        }
    }

    (
        global_module_file_counts,
        module_partitions,
        global_file_map,
    )
}

// Summarize the file map into totals plus the conflict list.
// Returns (total overlaid files, total conflicted files, conflicts with winner first).
pub fn summarize_conflicts(
    file_map: &BTreeMap<String, Vec<String>>,
) -> (usize, usize, Vec<(String, Vec<String>)>) {
    let mut total_overlaid = 0;
    let mut total_conflicted = 0;
    let mut conflicts: Vec<(String, Vec<String>)> = Vec::new();

    for (file, mods) in file_map {
        total_overlaid += 1;
        if mods.len() > 1 {
            total_conflicted += 1;
            conflicts.push((file.clone(), mods.clone()));
        }
    }

    (total_overlaid, total_conflicted, conflicts)
}

// Format one human-readable conflict line per unique filename/signature.
// Deduplicates visually identical lines caused by Android symlinks
// pointing multiple paths to the same underlying inode.
pub fn format_conflict_lines(conflicts: &[(String, Vec<String>)]) -> Vec<(String, String)> {
    let mut seen_signatures = HashSet::new();
    let mut display_lines = Vec::new();

    for (file, mods) in conflicts {
        let winner = &mods[0];
        let mut status_string = format!("[✅ {}]", winner);
        for loser in mods.iter().skip(1) {
            status_string.push_str(&format!(" [❌ {}]", loser));
        }

        let file_name = file.rsplit('/').next().unwrap_or(file);
        let signature = format!("{} {}", file_name, status_string);

        if seen_signatures.insert(signature) {
            display_lines.push((file_name.to_string(), status_string));
        }
    }

    display_lines
}

// Render the raw JSON payload consumed by the WebUI.
#[allow(clippy::too_many_arguments)]
pub fn render_json(
    display_partitions: &[String],
    active_modules: &[String],
    file_counts: &BTreeMap<String, usize>,
    module_partitions: &BTreeMap<String, Vec<String>>,
    conflicts: &[(String, Vec<String>)],
    total_overlaid: usize,
    total_conflicted: usize,
) -> String {
    let mut json = String::new();
    json.push_str("{\n");
    json.push_str("  \"status\": \"success\",\n");

    let stealth_available = crate::mysufs::is_mysufs_available();
    let stealth_version = crate::mysufs::get_version().unwrap_or_else(|_| "inactive".to_string());
    let stealth_variant = crate::mysufs::get_variant().unwrap_or_else(|_| "standard".to_string());
    json.push_str(&format!(
        "  \"stealth\": {{ \"available\": {}, \"version\": \"{}\", \"variant\": \"{}\" }},\n",
        stealth_available,
        escape_json(&stealth_version),
        escape_json(&stealth_variant)
    ));

    let parts_str = display_partitions
        .iter()
        .map(|p| format!("\"{}\"", escape_json(p)))
        .collect::<Vec<_>>()
        .join(", ");
    json.push_str(&format!("  \"partitions\": [{}],\n", parts_str));

    json.push_str("  \"modules\": [\n");
    let mut mods_str = Vec::new();
    for mod_id in active_modules {
        let count = file_counts.get(mod_id).copied().unwrap_or(0);

        let mut m_parts = module_partitions.get(mod_id).cloned().unwrap_or_default();
        m_parts.sort();

        let m_parts_str = m_parts
            .iter()
            .map(|p| format!("\"{}\"", escape_json(p)))
            .collect::<Vec<_>>()
            .join(", ");

        mods_str.push(format!(
            "    {{ \"id\": \"{}\", \"files\": {}, \"partitions\": [{}] }}",
            escape_json(mod_id),
            count,
            m_parts_str
        ));
    }
    json.push_str(&mods_str.join(",\n"));
    json.push_str("\n  ],\n");

    json.push_str("  \"conflicts\": [\n");
    let mut conf_str = Vec::new();
    for (file, mods) in conflicts {
        let winner = &mods[0];
        let ignored = mods[1..]
            .iter()
            .map(|m| format!("\"{}\"", escape_json(m)))
            .collect::<Vec<_>>()
            .join(", ");
        conf_str.push(format!(
            "    {{ \"file\": \"{}\", \"winner\": \"{}\", \"ignored\": [{}] }}",
            escape_json(file),
            escape_json(winner),
            ignored
        ));
    }
    json.push_str(&conf_str.join(",\n"));
    json.push_str("\n  ],\n");

    json.push_str("  \"stats\": {\n");
    json.push_str(&format!("    \"total_overlaid\": {},\n", total_overlaid));
    json.push_str(&format!("    \"total_conflicted\": {}\n", total_conflicted));
    json.push_str("  }\n");
    json.push('}');

    json
}

pub fn run(args: &[String]) -> Result<()> {
    let is_raw = args.contains(&"-r".to_string()) || args.contains(&"--raw".to_string());

    if !is_raw {
        info!(target: "myoverlayfs::inspect", "Meta OverlayFS - Real-Time Kernel Inspector");
        info!(target: "myoverlayfs::inspect", "Querying /proc/mounts for actual active overlays...");
    }

    let mounts_data = fs::read_to_string("/proc/mounts").unwrap_or_default();

    // Primary hint — exported by the mount script before invoking the binary.
    // If absent, the dynamic fallback inside discover_partitions finds it instead.
    let env_content_dir = std::env::var("MODULES_DIR")
        .or_else(|_| std::env::var("MODULE_CONTENT_DIR"))
        .ok();
    let (active_partitions, resolved_content_dir) =
        discover_partitions(&mounts_data, env_content_dir.as_deref());

    if active_partitions.is_empty() || resolved_content_dir.is_empty() {
        if is_raw {
            println!(
                "{{ \"status\": \"error\", \"message\": \"No active Meta OverlayFS mounts found in the kernel.\" }}"
            );
        } else {
            info!(target: "myoverlayfs::inspect", "CRITICAL: No active Meta OverlayFS mounts found in the kernel.");
            info!(target: "myoverlayfs::inspect", "The mount process likely failed or the device has not rebooted.");
        }
        return Ok(());
    }

    let display_partitions = collapse_display_partitions(&active_partitions);

    if !is_raw {
        info!(target: "myoverlayfs::inspect", "Mounted: {}", display_partitions.join(", "));
    }

    let (global_module_file_counts, module_partitions, global_file_map) =
        collect_module_files(&active_partitions, &resolved_content_dir);

    let active_modules: Vec<String> = global_module_file_counts.keys().cloned().collect();
    let (total_overlaid, mut total_conflicted, conflicts) = summarize_conflicts(&global_file_map);

    // 7. Output Routing (JSON vs Human Readable)
    if is_raw {
        println!(
            "{}",
            render_json(
                &display_partitions,
                &active_modules,
                &global_module_file_counts,
                &module_partitions,
                &conflicts,
                total_overlaid,
                total_conflicted
            )
        );
    } else {
        for (i, mod_id) in active_modules.iter().enumerate() {
            let count = global_module_file_counts.get(mod_id).copied().unwrap_or(0);
            info!(
                target: "myoverlayfs::inspect",
                "{}. {}   {} files   [LIVE]",
                i + 1, mod_id, count
            );
        }

        if !conflicts.is_empty() {
            info!(target: "myoverlayfs::inspect", "");
            info!(target: "myoverlayfs::inspect", "[Conflicts]:");

            let display_lines = format_conflict_lines(&conflicts);

            let last_idx = display_lines.len().saturating_sub(1);
            for (i, (file_name, status_string)) in display_lines.iter().enumerate() {
                let branch = if i == last_idx { "└─" } else { "├─" };
                info!(
                    target: "myoverlayfs::inspect",
                    "  {} {} {}",
                    branch, file_name, status_string
                );
            }

            total_conflicted = display_lines.len();
        }

        info!(target: "myoverlayfs::inspect", "Total Overlaid Files: {}", total_overlaid);
        info!(target: "myoverlayfs::inspect", "Total Conflicted Files: {}", total_conflicted);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_support::TempDir;

    #[test]
    fn escape_json_handles_quotes_and_backslashes() {
        assert_eq!(escape_json("plain"), "plain");
        assert_eq!(escape_json("a\"b\\c"), "a\\\"b\\\\c");
    }

    #[test]
    fn extract_from_module_path_splits_module_and_content_dir() {
        let (module, content) = extract_from_module_path("/data/adb/modules/modA/system").unwrap();
        assert_eq!(module, "modA");
        assert_eq!(content, "/data/adb/modules");

        let (module_legacy, content_legacy) =
            extract_from_module_path("/data/adb/metamodule/mnt/modB/vendor").unwrap();
        assert_eq!(module_legacy, "modB");
        assert_eq!(content_legacy, "/data/adb/metamodule/mnt");

        assert!(extract_from_module_path("/system/build.prop").is_none());
        assert!(extract_from_module_path("/foo/mnt/").is_none());
    }

    #[test]
    fn walk_dir_collects_relative_files_only() {
        let dir = TempDir::create("walk");
        dir.write("a.txt", b"x");
        dir.write("sub/b.txt", b"y");
        dir.mkdir("empty_dir");

        let mut entries = Vec::new();
        walk_dir(dir.path(), dir.path(), &mut entries);
        entries.sort();
        assert_eq!(entries, vec!["a.txt".to_string(), "sub/b.txt".to_string()]);
    }

    #[test]
    fn discover_prefers_env_hint_for_overlay_lowerdirs() {
        let mounts = "MYSU /system overlay rw,lowerdir=/cnt/modB/system:/cnt/modA/system,upperdir=/u,workdir=/w 0 0\n";
        let (active, resolved) = discover_partitions(mounts, Some("/cnt"));
        assert_eq!(resolved, "/cnt");
        assert_eq!(
            active["/system"],
            vec!["modB".to_string(), "modA".to_string()]
        );
    }

    #[test]
    fn discover_ignores_unrelated_overlays() {
        let mounts = "overlay /system overlay ro,lowerdir=/system_orig 0 0\n";
        let (active, resolved) = discover_partitions(mounts, None);
        assert!(active.is_empty());
        assert!(resolved.is_empty());
    }

    #[test]
    fn discover_falls_back_to_dynamic_content_dir() {
        let mounts = "MYSU /vendor overlay rw,lowerdir=/data/adb/metamodule/mnt/modA/vendor:/vendor_orig 0 0\n";
        let (active, resolved) = discover_partitions(mounts, None);
        assert_eq!(resolved, "/data/adb/metamodule/mnt");
        assert_eq!(active["/vendor"], vec!["modA".to_string()]);
    }

    #[test]
    fn discover_tracks_bind_mount_fallbacks() {
        let mounts = "/cnt/modA/product/media /product/media ext4 ro,seclabel 0 0\n";
        let (active, resolved) = discover_partitions(mounts, Some("/cnt"));
        assert_eq!(resolved, "/cnt");
        assert_eq!(active["/product/media"], vec!["modA".to_string()]);
    }

    #[test]
    fn collapse_hides_nested_partition_mounts() {
        let mut active: BTreeMap<String, Vec<String>> = BTreeMap::new();
        active.insert("/product".to_string(), vec!["m".to_string()]);
        active.insert("/product/media".to_string(), vec!["m".to_string()]);
        active.insert("/vendor".to_string(), vec!["m".to_string()]);
        assert_eq!(
            collapse_display_partitions(&active),
            vec!["/product".to_string(), "/vendor".to_string()]
        );
    }

    #[test]
    fn collect_counts_files_and_keeps_priority_order() {
        let content = TempDir::create("inspect-content");
        content.write("modA/system/a.txt", b"a");
        content.write("modA/system/sub/b.txt", b"b");
        content.write("modA/vendor/c.txt", b"c");
        content.write("modB/system/a.txt", b"b-shadowed");

        let mut active: BTreeMap<String, Vec<String>> = BTreeMap::new();
        active.insert(
            "/system".to_string(),
            vec!["modA".to_string(), "modB".to_string()],
        );
        active.insert("/vendor".to_string(), vec!["modA".to_string()]);

        let (counts, partitions, file_map) =
            collect_module_files(&active, content.path().to_str().unwrap());

        assert_eq!(counts["modA"], 3);
        assert_eq!(counts["modB"], 1);
        // Lowerdir order decides the winner: index 0 wins.
        assert_eq!(
            file_map["system/a.txt"],
            vec!["modA".to_string(), "modB".to_string()]
        );
        assert!(partitions["modA"].contains(&"/system/sub".to_string()));
        assert!(partitions["modA"].contains(&"/vendor".to_string()));
    }

    #[test]
    fn summarize_separates_conflicts_from_clean_files() {
        let mut file_map: BTreeMap<String, Vec<String>> = BTreeMap::new();
        file_map.insert(
            "system/a.txt".to_string(),
            vec!["modA".to_string(), "modB".to_string()],
        );
        file_map.insert("vendor/c.txt".to_string(), vec!["modA".to_string()]);

        let (overlaid, conflicted, conflicts) = summarize_conflicts(&file_map);
        assert_eq!((overlaid, conflicted), (2, 1));
        assert_eq!(conflicts[0].0, "system/a.txt");
    }

    #[test]
    fn conflict_lines_dedupe_identical_signatures() {
        let conflicts = vec![
            (
                "system/a.txt".to_string(),
                vec!["modA".to_string(), "modB".to_string()],
            ),
            (
                "vendor/a.txt".to_string(),
                vec!["modA".to_string(), "modB".to_string()],
            ),
        ];
        let lines = format_conflict_lines(&conflicts);
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0].0, "a.txt");
        assert_eq!(lines[0].1, "[✅ modA] [❌ modB]");
    }

    #[test]
    fn render_json_reports_winner_and_stats() {
        let display = vec!["/system".to_string()];
        let modules = vec!["modA".to_string(), "modB".to_string()];
        let mut counts: BTreeMap<String, usize> = BTreeMap::new();
        counts.insert("modA".to_string(), 2);
        counts.insert("modB".to_string(), 1);
        let mut partitions: BTreeMap<String, Vec<String>> = BTreeMap::new();
        partitions.insert("modA".to_string(), vec!["/sys\"tem".to_string()]);
        let conflicts = vec![(
            "system/a.txt".to_string(),
            vec!["modA".to_string(), "modB".to_string()],
        )];

        let json = render_json(&display, &modules, &counts, &partitions, &conflicts, 2, 1);
        assert!(json.contains("\"status\": \"success\""));
        assert!(json.contains("\"partitions\": [\"/system\"]"));
        assert!(json.contains("\"winner\": \"modA\""));
        assert!(json.contains("\"ignored\": [\"modB\"]"));
        assert!(json.contains("\"total_overlaid\": 2"));
        assert!(json.contains("\"total_conflicted\": 1"));
        assert!(json.contains("/sys\\\"tem"));
    }
}
