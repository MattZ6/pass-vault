import "@/contexts/language/i18n";

import { Observe, ObserveRoot, useObserve } from "expo-observe";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

import { Provider } from "@/contexts/provider";

import { useFontFamily } from "@/hooks/use-font-family";
import { useTheme } from "@/hooks/use-theme";

import { AppLockGate } from "@/screens/app-lock";

import { PerformanceMonitoringService } from "@/services/analytics/performance-monitoring";
import { ChangelogService } from "@/services/changelog/changelog";

ExpoSplashScreen.preventAutoHideAsync();
ChangelogService.initialize();

Observe.configure({
  integrations: { "expo-router": true },
  dispatchingEnabled: PerformanceMonitoringService.isEnabled(),
  environment: process.env.EXPO_PUBLIC_APP_VARIANT,
});

function RootLayout() {
  const [fontsLoaded] = useFontFamily();
  const { markInteractive } = useObserve();

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
      markInteractive();
    }
  }, [fontsLoaded, markInteractive]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <AppLockGate>
        <RootStack />
      </AppLockGate>
    </Provider>
  );
}

function RootStack() {
  const { theme } = useTheme();

  return (
    <Stack
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
            default: [0.8, 1],
          }),
          contentStyle: {
            backgroundColor: theme.colors.surface.elevated,
          },
        }}
      />
    </Stack>
  );
}

export default ObserveRoot.wrap(RootLayout);
