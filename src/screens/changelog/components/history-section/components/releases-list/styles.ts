import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

const VERSION_TEXT_SIZE = 40;

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    divider: {
      marginLeft: theme.spacing[4] + VERSION_TEXT_SIZE + theme.spacing[4],
    },
    leading: {
      width: VERSION_TEXT_SIZE,
    },
    version: {
      fontVariant: ["tabular-nums"],
    },
    trailing: {
      transform: [{ translateX: theme.spacing[2] }],
    },
  });
}
