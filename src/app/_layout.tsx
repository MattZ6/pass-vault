import { Stack } from "expo-router";
import { colors } from "@/styles/themes/colors/dark";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="(main)"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: "modal",
          contentStyle: {
            backgroundColor: colors.mauve1,
          },
        }}
      />
    </Stack>
  );
}
