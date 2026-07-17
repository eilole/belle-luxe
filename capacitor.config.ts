import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.belleluxe.app",
  appName: "Belle Luxe",
  webDir: "out",
  server: {
    androidScheme: "https",
    cleartext: true,
  },
  backgroundColor: "#060504",
  android: {
    backgroundColor: "#060504",
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: "#060504",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#060504",
      overlaysWebView: false,
    },
  },
};

export default config;
