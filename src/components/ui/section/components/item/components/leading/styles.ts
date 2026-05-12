import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    leading: {
      flexDirection: "row",
      gap: theme.spacing[2],
    },
  });
}
