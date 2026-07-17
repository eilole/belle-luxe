#!/bin/bash
# ===================================================================
# BELLE LUXE — Android APK Build Script
# Produces: app-release.apk (installable on any Android phone)
# ===================================================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         BELLE LUXE — Android APK Builder                 ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Install from nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not found"; exit 1; }

if [ ! -d "$ANDROID_HOME" ] && [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️  ANDROID_HOME not set. Install Android Studio from:"
    echo "   https://developer.android.com/studio"
    echo ""
    echo "   Then set: export ANDROID_HOME=~/Android/Sdk"
    exit 1
fi

echo "✓ Prerequisites OK"
echo ""

# Step 1: Install dependencies
echo "📦 [1/5] Installing dependencies..."
npm install
echo "   ✓ Done"
echo ""

# Step 2: Build Next.js static export
echo "🔨 [2/5] Building web assets..."
npm run build
# If you need static export, add to next.config.ts:
#   output: 'export'
echo "   ✓ Done"
echo ""

# Step 3: Initialize Capacitor (first time only)
if [ ! -d "android" ]; then
    echo "📱 [3/5] Initializing Android native project..."
    npx cap add android
    echo "   ✓ Done"
else
    echo "📱 [3/5] Android project exists, syncing..."
fi
echo ""

# Step 4: Copy Android resources
echo "🎨 [4/5] Copying custom Android resources..."
if [ -d "android-resources" ]; then
    cp android-resources/strings.xml android/app/src/main/res/values/strings.xml 2>/dev/null || true
    cp android-resources/colors.xml android/app/src/main/res/values/colors.xml 2>/dev/null || true
    cp android-resources/styles.xml android/app/src/main/res/values/styles.xml 2>/dev/null || true
fi

# Copy splash screen
if [ -f "public/splash.png" ]; then
    mkdir -p android/app/src/main/res/drawable
    cp public/splash.png android/app/src/main/res/drawable/splash.png
fi

# Copy icons
if [ -f "public/icon-512.png" ]; then
    mkdir -p android/app/src/main/res/mipmap-xxxhdpi
    cp public/icon-512.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
fi

npx cap sync android
echo "   ✓ Done"
echo ""

# Step 5: Build APK
echo "🔐 [5/5] Building APK (this takes 2-5 minutes)..."
cd android
./gradlew assembleRelease --no-daemon || {
    echo ""
    echo "⚠️  Release build requires signing. Building debug APK instead..."
    ./gradlew assembleDebug --no-daemon
    echo ""
    echo "✅ DEBUG APK ready at:"
    echo "   android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "   To install: adb install android/app/build/outputs/apk/debug/app-debug.apk"
    echo "   Or transfer the .apk file to your phone and install it."
    exit 0
}

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ BUILD SUCCESSFUL                                     ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "APK location:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "Install on a connected phone:"
echo "   adb install android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "Or share the .apk file directly to any Android device."
echo ""
