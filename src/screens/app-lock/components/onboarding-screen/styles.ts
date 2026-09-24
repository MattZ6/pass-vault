import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "center",
      gap: theme.spacing[12],
      backgroundColor: theme.colors.surface.base,
      paddingTop: insets.top + theme.spacing[4],
      paddingBottom: insets.bottom + theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
    },
    content: {
      gap: theme.spacing[4],
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
    },
  });
}
