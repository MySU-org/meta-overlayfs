#!/system/bin/sh
# Author: kelexine <https://github.com/kelexine>
# Date: 2026-10-19
# Purpose: Architecture detection and binary deployment for MyOverlayFS

ui_print "- Installing MyOverlayFS..."

# 1. Architecture Detection & Binary Extraction
ui_print "- Detecting device architecture..."
ABI=$(grep_get_prop ro.product.cpu.abi)
ui_print "- Detected ABI: $ABI"

case "$ABI" in
    arm64-v8a)
        ARCH_BINARY="myoverlayfs-aarch64"
        REMOVE_BINARY="myoverlayfs-x86_64"
        ui_print "- Selected architecture: ARM64"
        ;;
    x86_64)
        ARCH_BINARY="myoverlayfs-x86_64"
        REMOVE_BINARY="myoverlayfs-aarch64"
        ui_print "- Selected architecture: x86_64"
        ;;
    *)
        abort "- Unsupported architecture: $ABI"
        ;;
esac

[ ! -f "$MODPATH/$ARCH_BINARY" ] && abort "- Binary not found: $ARCH_BINARY"

ui_print "- Installing $ARCH_BINARY as myoverlayfs"

# Clean up and assign execution permissions
mv "$MODPATH/$ARCH_BINARY" "$MODPATH/myoverlayfs" || abort "- Failed to rename binary"
rm -f "$MODPATH/$REMOVE_BINARY"
chmod 755 "$MODPATH/myoverlayfs" || abort "- Failed to set permissions"

ui_print " "
ui_print "- Installation complete. Please reboot to activate MyOverlayFS."