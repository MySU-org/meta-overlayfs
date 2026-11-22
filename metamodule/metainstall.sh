#!/system/bin/sh
# Author: kelexine <https://github.com/kelexine>
# Date: 2026-10-19
# Purpose: Module installation hook for direct module deployment

META="/data/adb/mysu/metamodule"

. "$META"/utils.sh || exit 1
unzip -o "$ZIPFILE" module.prop -d "$TMPDIR" >&2
MODNAME=$(get_prop name "$TMPDIR/module.prop")
MODID=$(get_prop id "$TMPDIR/module.prop")

log "Using MyOverlayFS installer"
log "Installing module: $MODNAME (ID: $MODID)"

# Install module using standard install_module function
install_module

log "$MODNAME installed directly into /data/adb/mysu/modules/$MODID"
log "Reboot required to apply overlay modifications"