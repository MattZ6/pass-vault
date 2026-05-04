import { Stack } from "expo-router";
import { Platform } from "react-native";

import { colors } from "@/styles/themes/colors/dark";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" ? "transparent" : colors.mauve1,
        },
        contentStyle: {
          backgroundColor: colors.mauve1,
        },
      }}
    />
  );
}
