import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    passwordContainer: {
      padding: theme.spacing[4],
    },
    divider: {
      marginLeft: theme.spacing[4],
    },
    footer: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: theme.spacing[4],
      padding: theme.spacing[4],
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
      gap: theme.spacing[2],
      height: theme.size[11],
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.content.base,
    },
  });
}
