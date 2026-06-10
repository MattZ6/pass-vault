import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    divider: {
      marginLeft: theme.spacing[4],
    },
    supportedTypesContainer: {
      marginTop: theme.spacing[3],
      gap: theme.spacing[2],
    },
    value: {
      textAlign: "right",
    },
  });
}
