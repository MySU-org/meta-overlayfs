// Constants for KernelSU module mounting

// Dual-directory support for ext4 image
pub const MODULE_METADATA_DIR: &str = "/data/adb/modules/";
pub const MODULE_CONTENT_DIR: &str = "/data/adb/metamodule/mnt/";

// Legacy constant (for backwards compatibility)
pub const _MODULE_DIR: &str = "/data/adb/modules/";

// Status marker files
pub const DISABLE_FILE_NAME: &str = "disable";
pub const _REMOVE_FILE_NAME: &str = "remove";
pub const SKIP_MOUNT_FILE_NAME: &str = "skip_mount";

// System directories
pub const SYSTEM_RW_DIR: &str = "/data/adb/modules/.rw/";
// Consumed by the Android mount path; unused on host builds.
// Test-only reads below keep it covered everywhere.
#[cfg_attr(not(target_os = "android"), allow(dead_code))]
pub const MYSU_OVERLAY_SOURCE: &str = "MYSU";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn constants_are_sane() {
        assert!(MODULE_METADATA_DIR.starts_with('/'));
        assert!(MODULE_CONTENT_DIR.starts_with('/'));
        assert!(!MYSU_OVERLAY_SOURCE.is_empty());
        assert!(!DISABLE_FILE_NAME.is_empty());
        assert!(!SKIP_MOUNT_FILE_NAME.is_empty());
        assert_ne!(DISABLE_FILE_NAME, SKIP_MOUNT_FILE_NAME);
    }
}