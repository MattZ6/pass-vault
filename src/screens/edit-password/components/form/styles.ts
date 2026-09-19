import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing[8],
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    field: {
      flex: 1,
      padding: theme.spacing[4],
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.content.base,
    },
  });
}
