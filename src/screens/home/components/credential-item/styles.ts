import { StyleSheet } from "react-native";

import type { ResolvedThemeOptions, Theme } from "@/styles/themes/types";

export function getStyles(
  theme: Theme,
  resolvedThemeOption: ResolvedThemeOptions,
) {
  const buttonBackgroundColorMap = {
    light: theme.colors.surface.element,
    dark: theme.colors.surface.elevated,
  };

  const iconContainerBackgroundColorMap = {
    light: theme.colors.surface.elevated,
    dark: theme.colors.surface.element,
  };

  return StyleSheet.create({
    wrapper: {
      borderRadius: theme.radii[8],
      overflow: "hidden",
      backgroundColor: buttonBackgroundColorMap[resolvedThemeOption],
    },
    button: {
      padding: theme.spacing[3],
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: theme.size[14],
      height: theme.size[14],
      borderRadius: theme.radii[6],
      backgroundColor: iconContainerBackgroundColorMap[resolvedThemeOption],
    },
  });
}
