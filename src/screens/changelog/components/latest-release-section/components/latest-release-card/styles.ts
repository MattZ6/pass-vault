import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    content: {
      padding: theme.spacing[4],
      gap: theme.spacing[3],
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[2],
    },
  });
}
