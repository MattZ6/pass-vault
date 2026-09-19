import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(_theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    overlay: StyleSheet.absoluteFill,
  });
}
