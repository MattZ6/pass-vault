import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    trailing: {
      alignItems: "center",
    },
    newsDot: {
      width: theme.size[2],
      height: theme.size[2],
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.content.error,
    },
  });
}
