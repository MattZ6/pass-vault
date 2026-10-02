import { Stack } from "expo-router";
import { Platform } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { AppLockGate } from "@/screens/app-lock";

export default function AppLayout() {
  return (
    <AppLockGate>
      <AppStack />
    </AppLockGate>
  );
}

function AppStack() {
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
