import { ConfigContext, ExpoConfig } from 'expo/config'

import { darkTheme, lightTheme } from '@/lib/unistyles/themes'

import { version, name } from './package.json'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Pass Vault',
  slug: name,
  version,
  scheme: name,
  orientation: 'default',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: darkTheme.colors.mauve1,
  primaryColor: darkTheme.colors.mauve12,
  androidNavigationBar: {
    backgroundColor: darkTheme.colors.mauve1,
  },
  androidStatusBar: {
    barStyle: 'light-content',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    splash: {
      image: './assets/adaptive-icon.png',
      resizeMode: 'contain',
      backgroundColor: lightTheme.colors.mauve1,
      dark: {
        backgroundColor: darkTheme.colors.mauve1,
      },
    },
  },
  android: {
    versionCode: 2,
    package: 'com.passvault',
    splash: {
      image: './assets/adaptive-icon.png',
      resizeMode: 'contain',
      backgroundColor: lightTheme.colors.mauve1,
      dark: {
        backgroundColor: darkTheme.colors.mauve1,
      },
    },
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: darkTheme.colors.mauve1,
    },
  },
  platforms: ['android', 'ios'],
  plugins: ['expo-router', 'expo-font', 'expo-localization'],
  extra: {
    eas: {
      projectId: 'be904ac7-2434-437b-a4ae-c5e9412d3168',
    },
  },
})
