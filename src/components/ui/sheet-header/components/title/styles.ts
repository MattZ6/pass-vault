import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(_: Theme) {
  return StyleSheet.create({
    title: {
      flex: 1,
      textAlign: "center",
    },
  });
}
