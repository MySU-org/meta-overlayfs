# MyOverlayFs

<div align="center">

![Build Status](https://img.shields.io/github/actions/workflow/status/RipperHybrid/meta-myoverlayfs/build.yml?branch=main&style=flat&color=purple&label=Build&logo=github)
![License](https://img.shields.io/github/license/RipperHybrid/meta-myoverlayfs?style=flat&color=blue)

</div>

**MyOverlayFs** is a next-generation OverlayFS metamodule designed exclusively for **MySU**. It completely eliminates virtual ext4 loop images and sparse storage overhead by mounting directly from `/data/adb/modules/`, while integrating deeply with MySU's Ring-0 **MYSUFS** kernel stealth engine to hide mounts, spoof stock OEM file kstats, and defeat anti-root detection.

## ✨ Key Features

### 1. 🛡️ Ring-0 MYSUFS Stealth Engine
Integrates directly with MySU's kernel driver supercall interface (`[mysu_driver]`):
- **Mount Cloaking:** Automatically hides overlay mounts across `/proc/mounts`, `/proc/[pid]/mountinfo`, and `/proc/[pid]/mountstats`.
- **OEM Kstat Spoofing:** Captures underlying pre-overlay stock system file inodes, dev numbers, sizes, and mtimes, feeding them into the kernel kstat spoof table so overlaid files look 100% stock to anti-tamper scanners.
- **Path & Maps Cloaking:** Kernel-level cloaking of overlaid module paths and active `/proc/[pid]/maps` memory mappings.

### 2. ⚡ Direct Storage Architecture
- **No Ext4 Loop Images:** Drops virtual 2GB disk images (`modules.img`), eliminating loop devices, sparse hole-punching, and filesystem-in-filesystem corruption risks.
- **Unified Single Directory:** Modules live directly in `/data/adb/modules/<id>/<partition>`.
- **Atomic Updates:** Seamlessly promotes pending updates from `/data/adb/modules_update/` on boot.
- **Clean Execution:** No volume-key prompts or complex first-time synchronization rituals.

### 3. 🖥️ Modern WebUI
A comprehensive dashboard integrated directly into MySU Manager.
- **Stealth & Mount Dashboard:** Live visual indicators of MYSUFS driver status, active stealth rules, and per-partition storage usage.
- **Module & Conflict Manager:** Real-time file counts, lowerdir hierarchy, and per-file conflict detection sourced directly from the kernel.
- **System Tools:** Live log tailing with one-tap copy/refresh, manual stealth rule configuration, and full responsive dark glassmorphism UI.

### 4. 🔍 Real-Time Kernel Inspector
- **VFS Lowerdir Chains:** Queries `/proc/mounts` and kernel tables to extract exact lowerdir precedence.
- **Conflict Resolution:** Identifies which module wins and which modules are shadowed for every overlaid path.
- **Dual Output:** Human-readable tree view for CLI or structured JSON (`inspect -r`, `stealth -r`) for scripts and WebUI integration.

## 📥 Installation

1. Download the latest `meta-overlayfs-v*.zip` from Releases.
2. Install via MySU Manager **OR** via ADB:

```bash
adb push meta-overlayfs-v1.4.0-mysu.zip /sdcard/
adb shell su -c 'mysud module install /sdcard/meta-overlayfs-v1.4.0-mysu.zip'
```

3. Reboot.

## 🚀 Usage

### Accessing the WebUI

1. Open **MySU Manager**.
2. Go to the **Modules** tab.
3. Find **MyOverlayFs**.
4. Tap **WebUI**.

### Real-Time Mount & Stealth Inspection

Inspect active mounts and lowerdir chains:
```bash
# Tree output
/data/adb/modules/meta-myoverlayfs/myoverlayfs inspect

# Structured JSON
/data/adb/modules/meta-myoverlayfs/myoverlayfs inspect -r
```

Inspect active Ring-0 MYSUFS stealth rules:
```bash
# Text summary
/data/adb/modules/meta-myoverlayfs/myoverlayfs stealth

# Structured JSON
/data/adb/modules/meta-myoverlayfs/myoverlayfs stealth -r
```

## 🏗️ Building

**Requirements:** `cargo`, `cargo-ndk` (with Android NDK r25+), `bun`.

```bash
# Build complete flashable ZIP (outputs to target/meta-myoverlayfs-v*.zip)
./build.sh
```

## 👥 Credits & Acknowledgements

### Fork Base

* **AshBorn** ([@RipperHybrid](https://github.com/RipperHybrid)) — WebUI development, kernel inspector, module sync, UI/UX design, and ongoing maintenance.

### Fork Maintainer

* **Kelexine** ([@Kelexine](https://github.com/Kelexine)) — Port and packaging and delivery for MySU.

### Original Base Project

Huge thanks to the original creators who built the Meta OverlayFS foundation:

* [weishu](https://github.com/tiann)
* [Ylarod](https://github.com/Ylarod)
* [Wang Han](https://github.com/aviraxp)
* [7a72](https://github.com/7a72)

### Open Source

This project uses components from:

* `rustix` & `procfs`

## 📄 License
Distribution
Licensed under **GPL-3.0**.

---

## 📝 Reporting Issues

**Important:** This is a modified fork. Please report bugs related to the WebUI, kernel inspector, module sync, or any fork-specific features to [@Kelexine](https://github.com/kelexine). Do **not** report issues with this fork to the original KernelSU or Fork Base maintainers.
