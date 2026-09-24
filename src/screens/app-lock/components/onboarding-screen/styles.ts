import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing[10],
      backgroundColor: theme.colors.surface.base,
      paddingTop: insets.top + theme.spacing[4],
      paddingBottom: insets.bottom + theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
    },
    wheelContainer: {
      alignItems: "center",
      justifyContent: "center",
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
