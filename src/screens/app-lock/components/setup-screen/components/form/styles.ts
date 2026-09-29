import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing[4],
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    field: {
      flex: 1,
      padding: theme.spacing[4],
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.content.base,
    },
    divider: {
      marginLeft: theme.spacing[4],
    },
    error: {
      textAlign: "center",
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
      backgroundColor: theme.colors.content.base,
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.surface.base,
    },
    buttonTextDisabled: {
      color: theme.colors.content.element,
    },
  });
}
