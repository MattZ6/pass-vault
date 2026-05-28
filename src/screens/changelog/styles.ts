import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    list: {
      flex: 1,
    },
    scrollContainer: {
      paddingTop: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
      paddingBottom: insets.bottom + theme.spacing[4],
      gap: theme.spacing[8],
    },
  });
}
