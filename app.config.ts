import type { ConfigContext, ExpoConfig } from "expo/config";

import { name, version } from "./package.json";

const buildNumber = 5;

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Pass Vault",
	slug: name,
	version,
	scheme: name,
	orientation: "default",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	backgroundColor: "#121214",
	primaryColor: "#ffffff",
	androidNavigationBar: {
		backgroundColor: "#121214",
	},
	androidStatusBar: {
		barStyle: "light-content",
		translucent: true,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "com.passvault",
		buildNumber: String(buildNumber),
		supportsTablet: true,
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/adaptive-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
			dark: {
				backgroundColor: "#121214",
			},
		},
	},
	android: {
		versionCode: buildNumber,
		package: "com.passvault",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/adaptive-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
			dark: {
				backgroundColor: "#121214",
			},
		},
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#121214",
		},
	},
	platforms: ["android", "ios"],
	plugins: ["expo-router", "expo-font", "expo-localization"],
	extra: {
		eas: {
			projectId: "be904ac7-2434-437b-a4ae-c5e9412d3168",
		},
	},
});
