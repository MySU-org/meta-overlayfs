#!/system/bin/sh
# Author: kelexine <https://github.com/kelexine>
# Date: 2026-10-19
# Purpose: Module mount handler for single-directory overlay mounting

META_DIR="/data/adb/mysu/metamodule"

. "$META_DIR"/utils.sh || exit 1
RW_ROOT="/data/adb/mysu/modules/.rw"
PARTITIONS="system vendor product system_ext odm oem"
MODULES_DIR="/data/adb/mysu/modules"
LOG_FILE="$META_DIR/myoverlayfs.log"

log INFO "Starting MyOverlayFS module mount sequence"

BINARY="$META_DIR/myoverlayfs"

if [ ! -f "$BINARY" ]; then
    log ERROR "Binary not found: $BINARY"
    exit 1
fi

# Apply SELinux contexts for .rw partition structures if enabled
if [ -d "$RW_ROOT" ]; then
    log INFO "Applying SELinux contexts for RW partition structures"
    for part in $PARTITIONS; do
        PART_DIR="$RW_ROOT/$part"
        REFERENCE_PATH="/$part"
        if [ -d "$PART_DIR" ] && [ -e "$REFERENCE_PATH" ]; then
            chcon --reference="$REFERENCE_PATH" "$PART_DIR" 2>/dev/null
            UPPER_DIR="$PART_DIR/upperdir"
            if [ -d "$UPPER_DIR" ]; then
                chcon --reference="$PART_DIR" "$UPPER_DIR" 2>/dev/null
            fi
            WORK_DIR="$PART_DIR/workdir"
            if [ -d "$WORK_DIR" ]; then
                chcon --reference="$PART_DIR" "$WORK_DIR" 2>/dev/null
            fi
        fi
    done
fi

export MODULES_DIR="$MODULES_DIR"

# Execute the direct mount binary
"$BINARY" >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    log ERROR "Mount failed with exit code $EXIT_CODE"
    exit $EXIT_CODE
fi

# Update description dynamically from live kernel inspector
log INFO "Updating module telemetry..."
INSPECT_JSON=$("$BINARY" inspect -r 2>/dev/null)

if echo "$INSPECT_JSON" | grep -q '"status": "success"'; then
    MODULE_COUNT=$(echo "$INSPECT_JSON" | grep -o '"id":' | wc -l)
    CONFLICT_COUNT=$(echo "$INSPECT_JSON" | grep -o '"total_conflicted": [0-9]*' | grep -o '[0-9]*')

    HAS_CONFLICT="Clean"
    if [ -n "$CONFLICT_COUNT" ] && [ "$CONFLICT_COUNT" -gt 0 ]; then
        HAS_CONFLICT="Conflicts: $CONFLICT_COUNT"
    fi

    NEW_DESC="📦 Modules: $MODULE_COUNT | ⚡ $HAS_CONFLICT"
    modify_prop "description" "$NEW_DESC" "$META_DIR/module.prop"
fi

exit 0