import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: theme.colors.border.default,
      marginLeft: theme.spacing[4] + theme.size[6] + theme.spacing[4],
      marginRight: theme.spacing[4],
    },
  });
}
