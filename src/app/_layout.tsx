import { Stack } from "expo-router";

import { Provider } from "@/contexts/Provider";

import { colors } from "@/styles/themes/colors/dark";

export default function RootLayout() {
  return (
    <Provider>
      <RootStack />
    </Provider>
  );
}

function RootStack() {
  return (
    <Stack
      initialRouteName="(main)"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.mauve1,
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
