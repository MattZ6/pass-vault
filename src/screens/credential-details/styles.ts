import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {},
    toolbar: {
      paddingVertical: theme.spacing[6],
      paddingHorizontal: theme.spacing[4],
    },
    title: {
      textAlign: "center",
    },
  });
}
