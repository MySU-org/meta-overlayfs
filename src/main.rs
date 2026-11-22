// Author: kelexine <https://github.com/kelexine>
// Date: 2026-10-19
// Purpose: CLI entry point and lifecycle orchestrator for MyOverlayFS

use anyhow::Result;
use log::info;

mod defs;
mod inspect;
mod mount;
#[cfg(test)]
mod test_support;

fn print_help() {
    info!(target: "myoverlayfs::help", "MyOverlayFS (myoverlayfs)");
    info!(target: "myoverlayfs::help", "Usage: myoverlayfs [COMMAND] [OPTIONS]");
    info!(target: "myoverlayfs::help", "");
    info!(target: "myoverlayfs::help", "Commands:");
    info!(target: "myoverlayfs::help", "  (none)      Mount all enabled modules directly via OverlayFS (Default)");
    info!(target: "myoverlayfs::help", "  inspect     View active mounts and file conflicts");
    info!(target: "myoverlayfs::help", "              Options:");
    info!(target: "myoverlayfs::help", "                -r, --raw    Output data in pure JSON format for WebUI parsing");
    info!(target: "myoverlayfs::help", "  -h, --help  Show this help message");
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

    // 3. Execute the active mount inspector
    if matches!(args.get(1), Some(cmd) if cmd == "inspect") {
        return inspect::run(&args[2..]);
    }

    // 4. Main Mount Sequence
    info!(target: "myoverlayfs::main", "MyOverlayFS v{}", env!("CARGO_PKG_VERSION"));

    let modules_dir =
        std::env::var("MODULES_DIR").unwrap_or_else(|_| defs::MODULES_DIR.to_string());

    info!(target: "myoverlayfs::main", "Modules directory: {modules_dir}");

    mount::mount_modules_systemlessly(&modules_dir)?;

    info!(target: "myoverlayfs::main", "Mount completed successfully");
    Ok(())
}
