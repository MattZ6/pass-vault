import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      borderRadius: theme.radii[8],
      overflow: "hidden",
      backgroundColor: theme.colors.surface.elevated,
    },
    button: {
      padding: theme.spacing[4],
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[4],
      borderRadius: theme.radii[8],
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: theme.size[12],
      height: theme.size[12],
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.surface.base,
    },
    content: {
      flex: 1,
      gap: theme.spacing[1],
    },
  });
}
