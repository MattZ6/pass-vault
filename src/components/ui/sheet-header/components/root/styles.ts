import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    toolbar: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing[6],
      paddingHorizontal: theme.spacing[4] + theme.size[12] + theme.spacing[4],

      position: "relative",
    },
  });
}
