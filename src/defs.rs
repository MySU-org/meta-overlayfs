// Author: kelexine <https://github.com/kelexine>
// Date: 2026-10-19
// Purpose: Core directory and status constants for MyOverlayFS

// Module storage directories
pub const MODULES_DIR: &str = "/data/adb/mysu/modules/";
#[allow(dead_code)]
pub const MODULE_METADATA_DIR: &str = "/data/adb/mysu/modules/";
pub const MODULE_UPDATES_DIR: &str = "/data/adb/mysu/modules_update/";
#[allow(dead_code)]
pub const METAMODULE_DIR: &str = "/data/adb/mysu/metamodule/";

// Status marker files
pub const DISABLE_FILE_NAME: &str = "disable";
pub const REMOVE_FILE_NAME: &str = "remove";
pub const SKIP_MOUNT_FILE_NAME: &str = "skip_mount";
#[allow(dead_code)]
pub const UPDATE_FILE_NAME: &str = "update";

// System directories
pub const SYSTEM_RW_DIR: &str = "/data/adb/mysu/modules/.rw/";

// Consumed by the Android mount path; unused on host builds.
#[cfg_attr(not(target_os = "android"), allow(dead_code))]
pub const MYSU_OVERLAY_SOURCE: &str = "MYSU";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn constants_are_sane() {
        assert!(MODULES_DIR.starts_with('/'));
        assert!(MODULE_METADATA_DIR.starts_with('/'));
        assert!(MODULE_UPDATES_DIR.starts_with('/'));
        assert!(!MYSU_OVERLAY_SOURCE.is_empty());
        assert!(!DISABLE_FILE_NAME.is_empty());
        assert!(!SKIP_MOUNT_FILE_NAME.is_empty());
        assert_ne!(DISABLE_FILE_NAME, SKIP_MOUNT_FILE_NAME);
    }
}
