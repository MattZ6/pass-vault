import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "@/hooks/use-theme";

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Platform.select({
            ios: "transparent",
            default: theme.colors.surface.base.toString(),
          }),
        },
        contentStyle: {
          backgroundColor: theme.colors.surface.base,
        },
      }}
    />
  );
}
