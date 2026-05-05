import { StyleSheet } from "react-native";
import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    actionsContainer: {
      flexDirection: "row",
      transform: [{ translateX: theme.spacing[2] }],
    },
  });
}
