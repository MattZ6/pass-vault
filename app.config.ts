import type { ConfigContext, ExpoConfig } from "expo/config";
import { z } from "zod";
import { name, version } from "./package.json";

const variantSchema = z.enum(["development", "preview", "production"]);

const buildVariant = variantSchema.parse(
  process.env.EXPO_PUBLIC_APP_VARIANT ?? "development",
);

const appName = "Pass Vault";
const packageName = "dev.zanin.passvault";

const variantConfig = {
  development: {
    name: `${appName} (Dev Client)`,
    package: `${packageName}.dev`,
    primaryColor: "#1458E8",
    splash: {
      android: {
        light: {
          imagePath: "./assets/variants/dev/splash.png",
          backgroundColor: "#1458E8",
        },
        dark: {
          imagePath: "./assets/variants/dev/splash.png",
          backgroundColor: "#1458E8",
        },
      },
      ios: {
        light: {
          imagePath: "./assets/variants/dev/splash.png",
          backgroundColor: "#1458E8",
        },
        dark: {
          imagePath: "./assets/variants/dev/splash.png",
          backgroundColor: "#1458E8",
        },
      },
    },
    icon: {
      android: {
        foregroundImagePath:
          "./assets/variants/dev/android-adaptive-icon-foreground.png",
        backgroundImagePath:
          "./assets/variants/dev/android-adaptive-icon-background.png",
        monochromeImagePath: "./assets/variants/android-monochrome-icon.png",
        backgroundColor: "#1458E8",
      },
      ios: {
        light: {
          imagePath: "./assets/variants/dev/ios-icon.png",
        },
        dark: {
          imagePath: "./assets/variants/dev/ios-icon.png",
        },
        tinted: {
          imagePath: "./assets/variants/ios-tinted-icon.png",
        },
      },
    },
    locales: {
      en: "./languages/variants/dev/en.json",
      pt: "./languages/variants/dev/pt.json",
      es: "./languages/variants/dev/es.json",
    },
  },
  preview: {
    name: `${appName} (Preview)`,
    package: `${packageName}.preview`,
    primaryColor: "#eeeef0",
    splash: {
      android: {
        light: {
          imagePath: "./assets/variants/preview/splash-light.png",
          backgroundColor: "#fdfcfd",
        },
        dark: {
          imagePath: "./assets/variants/preview/splash-dark.png",
          backgroundColor: "#121113",
        },
      },
      ios: {
        light: {
          imagePath: "./assets/variants/preview/splash-light.png",
          backgroundColor: "#fdfcfd",
        },
        dark: {
          imagePath: "./assets/variants/preview/splash-dark.png",
          backgroundColor: "#121113",
        },
      },
    },
    icon: {
      android: {
        foregroundImagePath:
          "./assets/variants/preview/android-adaptive-icon-foreground.png",
        backgroundImagePath:
          "./assets/variants/preview/android-adaptive-icon-background.png",
        monochromeImagePath: "./assets/variants/android-monochrome-icon.png",
        backgroundColor: "#121113",
      },
      ios: {
        light: {
          imagePath: "./assets/variants/preview/ios-light-icon.png",
        },
        dark: {
          imagePath: "./assets/variants/preview/ios-dark-icon.png",
        },
        tinted: {
          imagePath: "./assets/variants/ios-tinted-icon.png",
        },
      },
    },
    locales: {
      en: "./languages/variants/preview/en.json",
      pt: "./languages/variants/preview/pt.json",
      es: "./languages/variants/preview/es.json",
    },
  },
  production: {
    name: appName,
    package: packageName,
    primaryColor: "#eeeef0",
    splash: {
      android: {
        light: {
          imagePath: "./assets/variants/production/splash-light.png",
          backgroundColor: "#fdfcfd",
        },
        dark: {
          imagePath: "./assets/variants/production/splash-dark.png",
          backgroundColor: "#121113",
        },
      },
      ios: {
        light: {
          imagePath: "./assets/variants/production/splash-light.png",
          backgroundColor: "#fdfcfd",
        },
        dark: {
          imagePath: "./assets/variants/production/splash-dark.png",
          backgroundColor: "#121113",
        },
      },
    },
    icon: {
      android: {
        foregroundImagePath:
          "./assets/variants/production/android-adaptive-icon-foreground.png",
        backgroundImagePath: undefined,
        monochromeImagePath: "./assets/variants/android-monochrome-icon.png",
        backgroundColor: "#121113",
      },
      ios: {
        light: {
          imagePath: "./assets/variants/production/ios-light-icon.png",
        },
        dark: {
          imagePath: "./assets/variants/production/ios-dark-icon.png",
        },
        tinted: {
          imagePath: "./assets/variants/ios-tinted-icon.png",
        },
      },
    },
    locales: {
      en: "./languages/variants/prod/en.json",
      pt: "./languages/variants/prod/pt.json",
      es: "./languages/variants/prod/es.json",
    },
  },
} as const;

const variant = variantConfig[buildVariant];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: variant.name,

  slug: name,
  version,
  scheme: name,

  platforms: ["ios", "android"],

  orientation: "default",
  userInterfaceStyle: "automatic",

  icon: variant.icon.ios.dark.imagePath,

  ios: {
    bundleIdentifier: variant.package,
    supportsTablet: true,
    icon: {
      light: variant.icon.ios.light.imagePath,
      dark: variant.icon.ios.dark.imagePath,
      tinted: variant.icon.ios.tinted.imagePath,
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },

  android: {
    package: variant.package,
    adaptiveIcon: {
      foregroundImage: variant.icon.android.foregroundImagePath,
      backgroundImage: variant.icon.android.backgroundImagePath,
      monochromeImage: variant.icon.android.monochromeImagePath,
      backgroundColor: variant.icon.android.backgroundColor,
    },
  },

  locales: variant.locales,

  plugins: [
    ["expo-router"],
    ["expo-font"],
    ["expo-local-authentication"],
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "pt", "es"],
          android: ["en", "pt", "es"],
        },
      },
    ],
    ["expo-secure-store"],
    ["react-native-quick-crypto"],
    [
      "expo-dev-client",
      {
        launchMode: "launcher",
      },
    ],
    ["expo-status-bar"],
    [
      "expo-splash-screen",
      {
        android: {
          image: variant.splash.android.light.imagePath,
          backgroundColor: variant.splash.android.light.backgroundColor,
          resizeMode: "contain",
          imageWidth: 200,
          dark: {
            image: variant.splash.android.dark.imagePath,
            backgroundColor: variant.splash.android.dark.backgroundColor,
            resizeMode: "contain",
            imageWidth: 200,
          },
        },
        ios: {
          image: variant.splash.ios.light.imagePath,
          tabletImage: variant.splash.ios.light.imagePath,
          backgroundColor: variant.splash.ios.light.backgroundColor,
          resizeMode: "contain",
          imageWidth: 200,
          dark: {
            image: variant.splash.ios.dark.imagePath,
            tabletImage: variant.splash.ios.dark.imagePath,
            backgroundColor: variant.splash.ios.dark.backgroundColor,
            resizeMode: "contain",
            imageWidth: 200,
          },
        },
      },
    ],
    ["expo-quick-actions"],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "be904ac7-2434-437b-a4ae-c5e9412d3168",
    },
    variant: buildVariant,
  },
});
