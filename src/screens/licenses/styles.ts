import { Platform, StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  const bottomPadding = Platform.select({
    ios: 0 + insets.bottom,
    default: theme.spacing[4] + insets.bottom
  })

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: bottomPadding,
    },
    fadingEdgeLength: {
      start: theme.size[2],
      end: theme.size[8],
    },
  });
}
