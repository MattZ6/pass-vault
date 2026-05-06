import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "@/hooks/use-theme";

export default function ModalLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: Platform.select({
          ios: true,
          default: false,
        }),
        headerStyle: {
          backgroundColor: Platform.select({
            ios: "transparent",
            default: theme.colors.surface.base.toString(),
          }),
        },
        contentStyle: {
          backgroundColor: theme.colors.surface.elevated,
        },
      }}
    />
  );
}
