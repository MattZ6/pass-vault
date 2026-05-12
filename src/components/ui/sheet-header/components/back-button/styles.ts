import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      position: "absolute",
      left: theme.spacing[1],
    },
  });
}
