import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    list: {
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: insets.bottom + theme.spacing[4],
    },
  });
}
