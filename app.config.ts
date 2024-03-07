import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: 'Pass Vault',
  slug: 'pass-vault',
  version: '0.1.0',
  scheme: 'pass-vault',
  orientation: 'default',

  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  backgroundColor: '#121113',
  primaryColor: '#eeeef0',
  androidNavigationBar: {
    backgroundColor: '#121113'
  },
  androidStatusBar: {
    barStyle: 'light-content',
  },

  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#121113",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true
  },
  android: {
    versionCode: 1,
    package: 'com.passvault',
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#121113",
    },
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-localization"
  ],
  extra: {
    eas: {
      projectId: "be904ac7-2434-437b-a4ae-c5e9412d3168"
    }
  }
})
