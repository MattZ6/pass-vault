import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  const DOT_SIZE = 6;

  return StyleSheet.create({
    section: {
      gap: theme.spacing[4],
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[4],
    },
    highlights: {
      gap: theme.spacing[1],
    },
    highlight: {
      flexDirection: "row",
      gap: theme.spacing[4],
    },
    highlightContent: {
      flex: 1,
    },
    dot: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.content.element,
      transform: [{ translateY: DOT_SIZE + DOT_SIZE / 2 }],
    },
  });
}
