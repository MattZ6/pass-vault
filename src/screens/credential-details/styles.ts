import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      padding: theme.spacing[4],
    },
    toolbar: {
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[6],
    },
    title: {
      textAlign: "center",
    },
    field: {
      gap: theme.spacing[1],
    },
  });
}
