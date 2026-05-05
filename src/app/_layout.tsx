import { Stack } from "expo-router";

import { Provider } from "@/contexts/provider";

import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
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
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.surface.base,
        },
      }}
    >
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.85],
        }}
      />
    </Stack>
  );
}
