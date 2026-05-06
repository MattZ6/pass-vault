import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing[4],
      gap: theme.spacing[6],
    },
    fields: {
      gap: theme.spacing[2],
    },
    field: {
      gap: theme.spacing[2],
    },
    input: {
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.typography.bodySmall.fontSize,
      color: theme.colors.content.base,

      height: theme.size[12],
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: theme.spacing[4],

      borderWidth: 1,
      borderColor: theme.colors.border.element,
      borderRadius: theme.radii[4],
    },
    buttonWrapper: {
      height: theme.size[12],
      borderRadius: theme.radii[4],
      borderWidth: 1,
      borderColor: theme.colors.border.element,
      overflow: "hidden",
    },
    buttonContent: {
      alignItems: "center",
      justifyContent: "center",
      height: theme.size[12],
      borderRadius: theme.radii[4],

      backgroundColor: theme.colors.surface.element,
    },
  });
}
