#!/system/bin/sh
# Author: kelexine <https://github.com/kelexine>
# Date: 2026-10-19
# Purpose: Cleanup script for MyOverlayFS removal

MODDIR="${0%/*}"

# Remove temporary logs or runtime files if present
rm -f "$MODDIR/myoverlayfs.log" 2>/dev/null || true

exit 0