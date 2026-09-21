import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, diameter: number) {
  const hubSize = diameter * 0.18;
  const spokeWidth = Math.max(4, diameter * 0.02);
  const rimBorderWidth = Math.max(3, diameter * 0.015);

  return StyleSheet.create({
    container: {
      width: diameter,
      height: diameter,
      alignItems: "center",
      justifyContent: "center",
    },
    rim: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      borderWidth: rimBorderWidth,
      backgroundColor: theme.colors.surface.element,
      alignItems: "center",
      justifyContent: "center",
    },
    spokeContainer: {
      position: "absolute",
      width: diameter,
      height: diameter,
      alignItems: "center",
    },
    spoke: {
      width: spokeWidth,
      height: diameter / 2 - hubSize / 2,
      borderRadius: spokeWidth / 2,
      backgroundColor: theme.colors.content.muted,
    },
    hub: {
      position: "absolute",
      width: hubSize,
      height: hubSize,
      borderRadius: hubSize / 2,
      backgroundColor: theme.colors.content.base,
      borderWidth: 2,
      borderColor: theme.colors.surface.base,
    },
  });
}
