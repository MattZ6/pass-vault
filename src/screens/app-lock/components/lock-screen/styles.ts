import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: theme.colors.surface.base,
      paddingTop: insets.top + theme.spacing[6],
      paddingBottom: insets.bottom + theme.spacing[4],
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing[3],
      paddingHorizontal: theme.spacing[6],
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: theme.size[24],
      height: theme.size[24],
      borderRadius: theme.radii.full,
      marginBottom: theme.spacing[6],
      backgroundColor: theme.colors.surface.element,
      borderWidth: 1,
      borderColor: theme.colors.border.default,
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
    },
    footer: {
      paddingHorizontal: theme.spacing[4],
    },
    buttonWrapper: {
      height: theme.size[11],
      borderRadius: theme.radii[6],
      overflow: "hidden",
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: theme.size[11],
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.content.base,
    },
  });
}
