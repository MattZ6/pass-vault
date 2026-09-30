import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      overflow: "hidden",
      borderRadius: theme.radii.full,
      marginRight: theme.spacing["1"],
    },
    content: {
      alignItems: "center",
      justifyContent: "center",
      height: theme.size["10"],
      paddingHorizontal: theme.spacing["4"],
    },
    text: {
      alignItems: "center",
    },
    textDisabled: {
      alignItems: "center",
      color: theme.colors.content.element,
    },
  });
}
