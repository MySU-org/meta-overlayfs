use anyhow::Result;
use log::info;

mod defs;
mod mount;
mod xcp;
mod inspect;
#[cfg(test)]
mod test_support;

fn print_help() {
    info!(target: "myoverlayfs::help", "Meta OverlayFS Tool (myoverlayfs)");
    info!(target: "myoverlayfs::help", "Usage: myoverlayfs [COMMAND] [OPTIONS]");
    info!(target: "myoverlayfs::help", "");
    info!(target: "myoverlayfs::help", "Commands:");
    info!(target: "myoverlayfs::help", "  (none)      Mount all enabled modules (Default behavior during boot)");
    info!(target: "myoverlayfs::help", "  inspect     View active mounts and file conflicts");
    info!(target: "myoverlayfs::help", "              Options:");
    info!(target: "myoverlayfs::help", "                -r, --raw    Output data in pure JSON format for WebUI parsing");
    info!(target: "myoverlayfs::help", "  xcp         Copy sparse file with optional hole punching");
    info!(target: "myoverlayfs::help", "              Options:");
    info!(target: "myoverlayfs::help", "                --punch-hole Punch holes in the destination file");
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

    // 3. Check for CLI sub-commands
    if matches!(args.get(1), Some(cmd) if cmd == "xcp") {
        return xcp::run(&args[2..]);
    }

    // Execute the active mount inspector, pass remaining args for flags
    if matches!(args.get(1), Some(cmd) if cmd == "inspect") {
        return inspect::run(&args[2..]);
    }

    // 4. Main Mount Sequence
    info!(target: "myoverlayfs::main", "MyOverlayFs v{}", env!("CARGO_PKG_VERSION"));

    // Dual-directory support: metadata + content
    let metadata_dir = std::env::var("MODULE_METADATA_DIR")
        .unwrap_or_else(|_| defs::MODULE_METADATA_DIR.to_string());
    let content_dir = std::env::var("MODULE_CONTENT_DIR")
        .unwrap_or_else(|_| defs::MODULE_CONTENT_DIR.to_string());

    info!(target: "myoverlayfs::main", "Metadata directory: {}", metadata_dir);
    info!(target: "myoverlayfs::main", "Content directory: {}", content_dir);

    // Execute dual-directory mounting
    mount::mount_modules_systemlessly(&metadata_dir, &content_dir)?;

    info!(target: "myoverlayfs::main", "Mount completed successfully");
    Ok(())
}