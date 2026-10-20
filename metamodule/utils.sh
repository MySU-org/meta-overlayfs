#!/system/bin/sh
# Author: kelexine <https://github.com/kelexine>
# Date: 2026-10-19
# Purpose: Shared utility functions for MyOverlayFS

LOG_FILE="/data/adb/metamodule/myoverlayfs.log"

# Unified smart logger
log() {
    if [ "$#" -eq 2 ]; then
        local level="$1"
        local msg="$2"
        echo "- $msg"
        case "$level" in
            INFO|WARN|ERROR)
                [ ! -f "$LOG_FILE" ] && touch "$LOG_FILE"
                echo "[$level myoverlayfs::script] $msg" >> "$LOG_FILE"
                ;;
        esac
    else
        echo "- $1"
    fi
}

# Extract property value from file
get_prop() {
    prop="$1"
    target_file="$2"

    if [ ! -f "$target_file" ]; then
        echo "Name not found"
        return
    fi

    grep "^$prop=" "$target_file" | cut -d'=' -f2- || echo "unknown"
}

# Safely modify module properties without breaking line structures
modify_prop() {
    local prop_key="$1"
    local prop_value="$2"
    local target_file="${3:-$MODDIR/module.prop}"

    if [ ! -f "$target_file" ]; then
        log ERROR "File $target_file not found."
        return 1
    fi

    if grep -q "^$prop_key=" "$target_file"; then
        local safe_value=$(printf '%s\n' "$prop_value" | sed 's/[~&]/\\&/g')
        sed -i "s~^$prop_key=.*~$prop_key=$safe_value~" "$target_file" || {
            log ERROR "Failed to modify $prop_key in $(basename "$target_file")"
            return 1
        }
        log INFO "Set $prop_key in $(basename "$target_file")"
    else
        log WARN "Property $prop_key not found in $(basename "$target_file"), skipping set"
    fi
}

# Copy SELinux contexts from src tree to destination by mirroring each entry
copy_selinux_contexts() {
    command -v chcon >/dev/null 2>&1 || return 0

    SRC="$1"
    DST="$2"

    if [ -z "$SRC" ] || [ -z "$DST" ] || [ ! -e "$SRC" ] || [ ! -e "$DST" ]; then
        return 0
    fi

    CHCON_FLAG=""
    if [ -L "$SRC" ]; then
        CHCON_FLAG="-h"
    fi
    chcon $CHCON_FLAG --reference="$SRC" "$DST" 2>/dev/null || true

    find "$SRC" -print 2>/dev/null | while IFS= read -r PATH_SRC; do
        if [ "$PATH_SRC" = "$SRC" ]; then
            continue
        fi
        REL_PATH="${PATH_SRC#"${SRC}/"}"
        PATH_DST="$DST/$REL_PATH"
        if [ -e "$PATH_DST" ] || [ -L "$PATH_DST" ]; then
            CHCON_FLAG=""
            if [ -L "$PATH_SRC" ]; then
                CHCON_FLAG="-h"
            fi
            chcon $CHCON_FLAG --reference="$PATH_SRC" "$PATH_DST" 2>/dev/null || true
        fi
    done
}

# Mark directory for REPLACE mode (OverlayFS opaque directory)
mark_replace() {
    replace_target="$1"
    mkdir -p "$replace_target"
    setfattr -n trusted.overlay.opaque -v y "$replace_target" 2>/dev/null || true
}