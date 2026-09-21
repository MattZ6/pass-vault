import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.surface.base,
      paddingTop: insets.top + theme.spacing[8],
      paddingBottom: insets.bottom + theme.spacing[8],
      paddingHorizontal: theme.spacing[6],
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
    wheelContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    hint: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[2],
      height: theme.size[8],
    },
    hintText: {
      textAlign: "center",
    },
  });
}
