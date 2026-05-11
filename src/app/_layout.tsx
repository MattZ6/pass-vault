import "@/contexts/language/i18n";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { Provider } from "@/contexts/provider";
import { useTheme } from "@/hooks/use-theme";

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <RootStack />
    </Provider>
  );
}

function RootStack() {
  const { theme } = useTheme();

  return (
    <Stack
      initialRouteName="(main)"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.surface.base,
        },
      }}
    >
      <Stack.Screen
        name="(modal)"
        options={{
          headerStyle: {
            backgroundColor: Platform.select({
              ios: "transparent",
              default: theme.colors.surface.base.toString(),
            }),
          },
          presentation: "formSheet",
          sheetAllowedDetents: Platform.select({
            ios: [1],
            default: [0.85, 1],
          }),
          contentStyle: {
            backgroundColor: theme.colors.surface.elevated,
          },
        }}
      />
    </Stack>
  );
}
