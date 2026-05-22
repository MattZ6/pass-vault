import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    form: {
      flex: 1,
      gap: theme.spacing[6],
    },
    fields: {
      gap: theme.spacing[2],
    },
    buttonWrapper: {
      height: theme.size[12],
      borderRadius: theme.radii.full,
      overflow: "hidden",
    },
    buttonContent: {
      alignItems: "center",
      justifyContent: "center",
      height: theme.size[12],
      backgroundColor: theme.colors.content.base,
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.surface.base,
    },
  });
}
