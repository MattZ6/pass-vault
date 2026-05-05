import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.mauve1,
    },
    scrollContent: {
      paddingVertical: 24,
      gap: 24,
    },
  });
}
