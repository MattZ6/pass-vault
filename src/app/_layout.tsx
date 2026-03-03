import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
	useFonts,
} from "@expo-google-fonts/poppins";
import * as ExpoNavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as ExpoSystemUi from "expo-system-ui";
import { useEffect } from "react";
import { Platform } from "react-native";

import { Provider } from "@/contexts/Provider";

import { useTheme } from "@/hooks/useTheme";

ExpoSplashScreen.preventAutoHideAsync();

ExpoSplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

function AppStack() {
	const { theme, resolvedOption } = useTheme();

	useEffect(() => {
		if (Platform.OS === "android") {
			ExpoNavigationBar.setButtonStyleAsync(resolvedOption);
		}
	}, [resolvedOption]);

	useEffect(() => {
		if (Platform.OS === "android") {
			ExpoNavigationBar.setPositionAsync("absolute");
			ExpoNavigationBar.setBackgroundColorAsync("#ffffff00");
			ExpoSystemUi.setBackgroundColorAsync(theme.colors.mauve1);
		}
	}, [theme.colors.mauve1]);

	return (
		<Stack
			screenOptions={{
				freezeOnBlur: true,
				headerShown: false,
				contentStyle: {
					backgroundColor: theme.colors.mauve1,
				},
			}}
		/>
	);
}

export default function MainLayout() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	ExpoSplashScreen.hide();

	return (
		<Provider>
			<StatusBar translucent style="light" />

			<AppStack />
		</Provider>
	);
}
