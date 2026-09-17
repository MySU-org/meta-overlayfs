// Shared test-only filesystem helpers (std only, no extra dev-dependencies).
// Each helper owns a unique directory under the system temp dir and
// removes it on drop, so parallel tests never share state.

use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};

static NEXT_ID: AtomicU64 = AtomicU64::new(0);

pub struct TempDir {
    path: PathBuf,
}

impl TempDir {
    pub fn create(prefix: &str) -> Self {
        let id = NEXT_ID.fetch_add(1, Ordering::SeqCst);
        let path =
            std::env::temp_dir().join(format!("myoverlayfs-{prefix}-{}-{id}", std::process::id()));
        std::fs::create_dir_all(&path).expect("create temp dir");
        Self { path }
    }

    pub fn path(&self) -> &Path {
        &self.path
    }

    pub fn mkdir(&self, rel: &str) -> PathBuf {
        let dir = self.path.join(rel);
        std::fs::create_dir_all(&dir).expect("create temp subdir");
        dir
    }

    pub fn write(&self, rel: &str, content: &[u8]) -> PathBuf {
        let file = self.path.join(rel);
        if let Some(parent) = file.parent() {
            std::fs::create_dir_all(parent).expect("create temp parent dir");
        }
        std::fs::write(&file, content).expect("write temp file");
        file
    }
}

impl Drop for TempDir {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.path);
    }
}
