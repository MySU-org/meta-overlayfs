#!/bin/bash
set -e

VERSION=$(grep '^version' Cargo.toml | head -1 | sed 's/.*"\(.*\)".*/\1/')
OUTPUT_DIR="target"
METAMODULE_DIR="metamodule"
MODULE_PROP_FILE="$METAMODULE_DIR/module.prop"
MODULE_OUTPUT_DIR="$OUTPUT_DIR/module"
WEBROOT_DIR="$METAMODULE_DIR/webroot"

MODULE_VERSION=$(grep -m1 '^version=' "$MODULE_PROP_FILE" | cut -d'=' -f2- | tr -d '\r')
MODULE_VERSION_CODE=$(grep -m1 '^versionCode=' "$MODULE_PROP_FILE" | cut -d'=' -f2- | tr -d '\r')

if [ -z "$MODULE_VERSION" ] || [ -z "$MODULE_VERSION_CODE" ]; then
    echo "Error: Failed to read module version information from $MODULE_PROP_FILE"
    exit 1
fi

echo "=========================================="
echo "Building myoverlayfs v${VERSION}"
echo "=========================================="

if command -v cross >/dev/null 2>&1; then
    BUILD_TOOL="cross"
    echo "Using cross for compilation"
else
    BUILD_TOOL="cargo-ndk"
    echo "Using cargo ndk for compilation"
    if ! command -v cargo-ndk >/dev/null 2>&1; then
        echo "Error: Neither cross nor cargo-ndk found!"
        echo "Please install one of them:"
        echo "  - cross: cargo install cross"
        echo "  - cargo-ndk: cargo install cargo-ndk"
        exit 1
    fi
fi

echo "Cleaning module output directory..."
rm -rf "$MODULE_OUTPUT_DIR"
mkdir -p "$MODULE_OUTPUT_DIR"

echo ""
echo "Building Web UI..."
if [ -d "$WEBROOT_DIR" ]; then
    pushd "$WEBROOT_DIR" > /dev/null

    if [ ! -f "package.json" ]; then
        echo "Error: package.json not found in $WEBROOT_DIR"
        exit 1
    fi

    if command -v bun >/dev/null 2>&1; then
        echo "Using bun for web assets..."
        bun run build
    else
        echo "Installing web dependencies..."
        npm install
        echo "Bundling web assets..."
        npm run build
    fi

    popd > /dev/null
else
    echo "Error: Webroot directory not found at $WEBROOT_DIR"
    exit 1
fi

echo ""
echo "Building for aarch64-linux-android..."
if [ "$BUILD_TOOL" = "cross" ]; then
    cross build --release --target aarch64-linux-android
else
    cargo ndk -t arm64-v8a build --release
fi

echo ""
echo "Building for x86_64-linux-android (optional)..."
BUILD_X86=false
if rustup target list | grep -q 'x86_64-linux-android (installed)'; then
    if [ "$BUILD_TOOL" = "cross" ]; then
        cross build --release --target x86_64-linux-android && BUILD_X86=true || true
    else
        cargo ndk -t x86_64 build --release && BUILD_X86=true || true
    fi
fi

echo ""
echo "Copying binaries..."
cp target/aarch64-linux-android/release/myoverlayfs \
   "$MODULE_OUTPUT_DIR/myoverlayfs-aarch64"

if [ "$BUILD_X86" = true ] && [ -f target/x86_64-linux-android/release/myoverlayfs ]; then
    cp target/x86_64-linux-android/release/myoverlayfs \
       "$MODULE_OUTPUT_DIR/myoverlayfs-x86_64"
else
    echo "x86_64 binary skipped, creating placeholder symlink/fallback"
    cp "$MODULE_OUTPUT_DIR/myoverlayfs-aarch64" "$MODULE_OUTPUT_DIR/myoverlayfs-x86_64"
fi

echo "Copying metamodule files..."
cp "$METAMODULE_DIR"/module.prop "$MODULE_OUTPUT_DIR/"
cp "$METAMODULE_DIR"/banner* "$MODULE_OUTPUT_DIR/" 2>/dev/null || true
cp "$METAMODULE_DIR"/*.sh "$MODULE_OUTPUT_DIR/"

echo "Copying bundled webroot..."
mkdir -p "$MODULE_OUTPUT_DIR/webroot"
cp -r "$WEBROOT_DIR/dist/"* "$MODULE_OUTPUT_DIR/webroot/"

echo "Setting permissions..."
chmod 755 "$MODULE_OUTPUT_DIR"/*.sh
chmod 755 "$MODULE_OUTPUT_DIR"/myoverlayfs-*

echo "Creating flashable ZIP..."
ZIP_NAME="meta-myoverlayfs-v${VERSION}.zip"
pushd "$MODULE_OUTPUT_DIR" > /dev/null
zip -r "../$ZIP_NAME" . > /dev/null
popd > /dev/null

echo ""
echo "Binary sizes:"
echo "  aarch64: $(du -h "$MODULE_OUTPUT_DIR"/myoverlayfs-aarch64 | awk '{print $1}')"

echo ""
echo "=========================================="
echo "Build completed successfully!"
echo "Flashable ZIP: target/$ZIP_NAME"
echo "Files located in: $MODULE_OUTPUT_DIR"
echo "=========================================="