# Belle Luxe Android APK — Hybrid Native App

This package wraps the Belle Luxe salon website into a native Android container using **Capacitor** (by Ionic). The result is a real `.apk` file you can install on any Android phone.

## 📋 Requirements

1. **Node.js 18+** — https://nodejs.org
2. **Android Studio** — https://developer.android.com/studio
3. **Java JDK 17** — included with Android Studio

After installing Android Studio, set the SDK path:
```bash
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

## 🚀 Build APK (Automated)

```bash
# Unzip this package
unzip belle-luxe-app.zip
cd belle-luxe-app

# Run the build script
chmod +x build-android.sh
./build-android.sh
```

The script handles everything: installs deps, builds web assets, sets up Android project, copies resources, and produces the APK.

## 🛠️ Build APK (Manual)

```bash
npm install
npm run build
npx cap add android
npx cap sync android

# Copy Android resources
cp android-resources/*.xml android/app/src/main/res/values/
cp public/splash.png android/app/src/main/res/drawable/
cp public/icon-512.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Build
cd android
./gradlew assembleDebug

# APK is at: android/app/build/outputs/apk/debug/app-debug.apk
```

## 📱 Install on a Phone

**Option A: USB install**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Option B: Share the APK file**
1. Transfer `app-debug.apk` to your phone (WhatsApp, email, USB)
2. On the phone, open the file
3. Enable "Install from unknown sources" if prompted
4. Tap Install

## 🔑 Signing for Play Store (Production)

To upload to Google Play, you need a signed release APK:

```bash
# Generate keystore (once)
keytool -genkey -v -keystore belle-luxe.keystore -alias belle-luxe \
  -keyalg RSA -keysize 2048 -validity 10000

# Add to android/variables.gradle:
# ext {
#   keystorePath = '../belle-luxe.keystore'
#   keystorePassword = 'your-password'
#   keyAlias = 'belle-luxe'
#   keyPassword = 'your-password'
# }

# Build signed release
cd android
./gradlew assembleRelease
```

## 📁 Project Structure

```
belle-luxe-app/
├── src/                     # Next.js source code
├── public/                  # Static assets + icons + splash
├── android-resources/       # Native Android configs
│   ├── strings.xml         # App name, URLs
│   ├── colors.xml          # Theme colors (gold #d4af37)
│   └── styles.xml          # Android theme
├── capacitor.config.ts     # Capacitor configuration
├── build-android.sh        # Automated build script
└── README-ANDROID.md       # This file
```

## ⚙️ Configuration

**App metadata** — edit `capacitor.config.ts`:
```typescript
appId: "com.belleluxe.app"    // Unique Android package ID
appName: "Belle Luxe"          // Display name
```

**Colors** — edit `android-resources/colors.xml`:
- Gold accent: `#d4af37`
- Black background: `#060504`

**Splash screen** — replace `public/splash.png` (1080×1920 recommended)

## 🔧 Native Features Included

- ✅ Custom splash screen (2s fade)
- ✅ Dark status bar with gold theme
- ✅ Haptic feedback support
- ✅ Keyboard handling
- ✅ Deep linking (`belleluxe://`)
- ✅ Offline-capable PWA inside

## 🆘 Troubleshooting

| Issue | Solution |
|---|---|
| `ANDROID_HOME not set` | Install Android Studio, then `export ANDROID_HOME=~/Android/Sdk` |
| `gradlew permission denied` | Run `chmod +x android/gradlew` |
| `SDK location not found` | Create `android/local.properties` with `sdk.dir=/path/to/sdk` |
| `Release build fails` | Debug build works without signing; release needs keystore |
| App crashes on start | Check `adb logcat` for errors |

## 📞 Support

Belle Luxe by Kim — Dar es Salaam, Tanzania  
WhatsApp: +255 796 619 669  
Instagram: @belleluxebykim
