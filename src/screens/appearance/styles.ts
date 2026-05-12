import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    list: {
      flex: 1,
    },
    scrollContainer: {
      padding: theme.spacing[4],
    },
  });
}
