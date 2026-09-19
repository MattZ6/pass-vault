import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.base,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      paddingTop: insets.top + theme.spacing[6],
      paddingBottom: insets.bottom + theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
      gap: theme.spacing[8],
    },
    header: {
      gap: theme.spacing[2],
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
    },
  });
}
