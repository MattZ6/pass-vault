import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.base,
    },
    scrollContainer: {
      paddingVertical: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
      gap: theme.spacing[8],
    },
  });
}
