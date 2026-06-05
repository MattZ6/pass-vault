import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    divider: {
      marginLeft: theme.spacing[4],
    },
  });
}
