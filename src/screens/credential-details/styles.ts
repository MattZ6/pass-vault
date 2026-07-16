import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      paddingTop: theme.spacing[4],
      paddingBottom: theme.spacing[4] + insets.bottom,
      paddingHorizontal: theme.spacing[4],
      gap: theme.spacing[8]
    },
    fadingEdgeLength: {
      start: theme.size[2],
      end: theme.size[8],
    },
  });
}
