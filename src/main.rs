// Author: kelexine <https://github.com/kelexine>
// Date: 2026-10-19
// Purpose: CLI entry point and lifecycle orchestrator for MyOverlayFS

use anyhow::Result;
use log::info;

mod defs;
mod inspect;
mod mount;
mod mysufs;
#[cfg(test)]
mod test_support;

fn print_help() {
    info!(target: "myoverlayfs::help", "MyOverlayFS Stealth Engine (myoverlayfs)");
    info!(target: "myoverlayfs::help", "Usage: myoverlayfs [COMMAND] [OPTIONS]");
    info!(target: "myoverlayfs::help", "");
    info!(target: "myoverlayfs::help", "Commands:");
    info!(target: "myoverlayfs::help", "  (none)      Mount all enabled modules directly with Ring-0 MYSUFS stealth (Default)");
    info!(target: "myoverlayfs::help", "  inspect     View active mounts and file conflicts");
    info!(target: "myoverlayfs::help", "              Options:");
    info!(target: "myoverlayfs::help", "                -r, --raw    Output data in pure JSON format for WebUI parsing");
    info!(target: "myoverlayfs::help", "  stealth     Query MYSUFS kernel stealth engine status");
    info!(target: "myoverlayfs::help", "  -h, --help  Show this help message");
}

fn print_stealth_status() -> Result<()> {
    if mysufs::is_mysufs_available() {
        let version = mysufs::get_version().unwrap_or_else(|_| "unknown".to_string());
        let variant = mysufs::get_variant().unwrap_or_else(|_| "unknown".to_string());
        info!(target: "myoverlayfs::stealth", "MYSUFS Stealth: ENABLED");
        info!(target: "myoverlayfs::stealth", "Version:        {version}");
        info!(target: "myoverlayfs::stealth", "Variant:        {variant}");
    } else {
        info!(target: "myoverlayfs::stealth", "MYSUFS Stealth: NOT DETECTED (standard overlayfs fallback)");
    }
    Ok(())
}

fn main() -> Result<()> {
    // 1. Initialize logger FIRST so help menus and early exits can log properly
    env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .init();

    let args: Vec<String> = std::env::args().collect();

    // 2. Check for help flag early
    if matches!(args.get(1), Some(cmd) if cmd == "-h" || cmd == "--help") {
        print_help();
        return Ok(());
    }

    // 3. Query stealth engine status
    if matches!(args.get(1), Some(cmd) if cmd == "stealth") {
        return print_stealth_status();
    }

    // 4. Execute the active mount inspector
    if matches!(args.get(1), Some(cmd) if cmd == "inspect") {
        return inspect::run(&args[2..]);
    }

    // 5. Main Mount Sequence
    info!(target: "myoverlayfs::main", "MyOverlayFS v{}", env!("CARGO_PKG_VERSION"));

    let modules_dir =
        std::env::var("MODULES_DIR").unwrap_or_else(|_| defs::MODULES_DIR.to_string());

    info!(target: "myoverlayfs::main", "Modules directory: {modules_dir}");

    // Execute direct systemless mounting with MYSUFS stealth hooks
    mount::mount_modules_systemlessly(&modules_dir)?;

    info!(target: "myoverlayfs::main", "Mount completed successfully");
    Ok(())
}
