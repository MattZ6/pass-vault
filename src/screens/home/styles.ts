import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, safeInsets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.base,
    },
    scrollContainer: {
      paddingTop: theme.spacing[4],
      paddingBottom: theme.spacing[4] + safeInsets.bottom,
      paddingHorizontal: theme.spacing[4],
    },
  });
}
