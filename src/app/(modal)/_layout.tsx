import { Stack } from "expo-router";
import { Platform } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export default function ModalLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
        contentStyle: {
          backgroundColor: Platform.select({
            ios: "transparent",
            default: theme.colors.surface.elevated,
          }),
        },
      }}
    />
  );
}
