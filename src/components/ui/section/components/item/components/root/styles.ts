import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[4],
    },
  });
}
