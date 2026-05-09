import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    pressable: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing[4],
      padding: theme.spacing[6],
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",

      width: theme.size[24],
      height: theme.size[24],
      borderRadius: theme.radii[8],
      marginBottom: theme.spacing[6],

      borderWidth: 1,
      borderColor: theme.colors.border.default,
    },
    title: {
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.typography.subtitle.fontSize,
      lineHeight: theme.typography.subtitle.lineHeight,
      color: theme.colors.content.base,
    },
    description: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      color: theme.colors.content.muted,
      textAlign: "center",
    },
    hint: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.body.fontSize,
      lineHeight: theme.typography.body.lineHeight,
      color: theme.colors.content.muted,
      textAlign: "center",
    },
  });
}
