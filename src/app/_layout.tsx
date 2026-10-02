import "@/contexts/language/i18n";

import { Observe, ObserveRoot, useObserve } from "expo-observe";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Provider } from "@/contexts/provider";

import { useFontFamily } from "@/hooks/use-font-family";
import { useTheme } from "@/hooks/use-theme";

import { PerformanceMonitoringService } from "@/services/analytics/performance-monitoring";
import { ChangelogService } from "@/services/changelog/changelog";
import { MasterPasswordService } from "@/services/vault/master-password";

import { useMasterPasswordStore } from "@/store/master-password/master-password.store";

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
  const hasMasterPassword = useMasterPasswordStore((s) => s.hasMasterPassword);
  const setHasMasterPassword = useMasterPasswordStore(
    (s) => s.setHasMasterPassword,
  );

  useEffect(() => {
    MasterPasswordService.hasMasterPassword().then(setHasMasterPassword);
  }, [setHasMasterPassword]);

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
      markInteractive();
    }
  }, [fontsLoaded, markInteractive]);

  if (!fontsLoaded || hasMasterPassword === null) {
    return null;
  }

  return (
    <Provider>
      <RootStack hasMasterPassword={hasMasterPassword} />
    </Provider>
  );
}

type RootStackProps = {
  hasMasterPassword: boolean;
};

function RootStack({ hasMasterPassword }: RootStackProps) {
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
      <Stack.Protected guard={!hasMasterPassword}>
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
      </Stack.Protected>

      <Stack.Protected guard={hasMasterPassword}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default ObserveRoot.wrap(RootLayout);
