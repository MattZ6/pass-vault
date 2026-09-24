import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing[2],
      height: theme.size[8],
    },
    text: {
      textAlign: "center",
    },
    icon: {
      width: theme.size[5],
      color: theme.colors.content.element,
    },
  });
}
