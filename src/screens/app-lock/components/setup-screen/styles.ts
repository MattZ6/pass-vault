import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.base,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      gap: theme.spacing[8],
      paddingTop: insets.top + theme.spacing[6],
      paddingBottom: insets.bottom + theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
    },
    iconContainer: {
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      width: theme.size[24],
      height: theme.size[24],
      borderRadius: theme.radii[6],
      marginBottom: theme.spacing[4],
      backgroundColor: theme.colors.surface.element,
      borderWidth: 1,
      borderColor: theme.colors.border.default,
    },
    header: {
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
