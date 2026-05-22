import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    input: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.bodySmall.fontSize,
      color: theme.colors.content.base,

      height: theme.size[12],
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: theme.spacing[4],

      borderWidth: 2,
      borderColor: theme.colors.surface.element,
      borderRadius: theme.radii[6],

      backgroundColor: theme.colors.surface.element,
    },
    withFocus: {
      borderColor: theme.colors.border.element,
    },
  });
}
