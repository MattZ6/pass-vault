import type { ConfigContext, ExpoConfig } from "expo/config";

import { name, version } from "./package.json";

type Variant = "development" | "preview" | "production";

const variantConfig = {
  development: {
    name: "Pass Vault (Dev Client)",
    package: "com.passvault.dev",
    primaryColor: "#ffffff",
    splash: {
      android: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
      ios: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
    },
    icon: {
      android: {
        imagePath: "./assets/adaptive-icon.png",
        backgroundColor: "#121214",
      },
      ios: {
        light: {
          imagePath: "./assets/icon.png",
        },
        dark: {
          imagePath: "./assets/icon.png",
        },
        tinted: {
          imagePath: "./assets/icon.png",
        },
      },
    },
  },
  preview: {
    name: "Pass Vault (Preview)",
    package: "com.passvault.preview",
    primaryColor: "#ffffff",
    splash: {
      android: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
      ios: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
    },
    icon: {
      android: {
        imagePath: "./assets/adaptive-icon.png",
        backgroundColor: "#121214",
      },
      ios: {
        light: {
          imagePath: "./assets/icon.png",
        },
        dark: {
          imagePath: "./assets/icon.png",
        },
        tinted: {
          imagePath: "./assets/icon.png",
        },
      },
    },
  },
  production: {
    name: "Pass Vault",
    package: "com.passvault",
    primaryColor: "#ffffff",
    splash: {
      android: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
      ios: {
        imagePath: "./assets/splash.png",
        light: {
          backgroundColor: "#121214",
        },
        dark: {
          backgroundColor: "#121214",
        },
      },
    },
    icon: {
      android: {
        imagePath: "./assets/adaptive-icon.png",
        backgroundColor: "#121214",
      },
      ios: {
        light: {
          imagePath: "./assets/icon.png",
        },
        dark: {
          imagePath: "./assets/icon.png",
        },
        tinted: {
          imagePath: "./assets/icon.png",
        },
      },
    },
  },
} as const;

const buildVariant: Variant =
  process.env.EXPO_PUBLIC_APP_VARIANT ?? "development";

const variant = variantConfig[buildVariant] ?? variantConfig.development;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: variant.name,

  slug: name,
  version,
  scheme: name,

  platforms: ["ios", "android"],

  orientation: "default",
  userInterfaceStyle: "automatic",

  icon: variant.icon.ios.light.imagePath,

  ios: {
    bundleIdentifier: variant.package,
    supportsTablet: true,
    icon: {
      light: variant.icon.ios.light.imagePath,
      dark: variant.icon.ios.dark.imagePath,
      tinted: variant.icon.ios.tinted.imagePath,
    },
    splash: {
      image: variant.splash.ios.imagePath,
      tabletImage: variant.splash.ios.imagePath,
      backgroundColor: variant.splash.ios.light.backgroundColor,
      resizeMode: "contain",
      dark: {
        image: variant.splash.ios.imagePath,
        tabletImage: variant.splash.ios.imagePath,
        backgroundColor: variant.splash.ios.dark.backgroundColor,
        resizeMode: "contain",
      },
    },
  },

  android: {
    package: variant.package,
    adaptiveIcon: {
      foregroundImage: variant.icon.android.imagePath,
      backgroundColor: variant.icon.android.backgroundColor,
    },
    splash: {
      image: variant.splash.android.imagePath,
      backgroundColor: variant.splash.android.light.backgroundColor,
      resizeMode: "contain",
      dark: {
        image: variant.splash.android.imagePath,
        backgroundColor: variant.splash.android.dark.backgroundColor,
        resizeMode: "contain",
      },
    },
  },

  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "pt"],
          android: ["en", "pt"],
        },
      },
    ],
    "expo-secure-store",
    ["expo-dev-client", { launchMode: "launcher" }],
  ],
  extra: {
    eas: {
      projectId: "be904ac7-2434-437b-a4ae-c5e9412d3168",
    },
    variant: buildVariant,
  },
});
