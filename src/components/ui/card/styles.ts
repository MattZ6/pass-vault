import { StyleSheet } from "react-native";

import type { SurfaceColorsOptions } from "@/styles/themes/semantic/colors/types";

import type { Theme } from "@/styles/themes/types";

export type CardStyledOptions = {
  color: SurfaceColorsOptions;
};

export function getStyles(theme: Theme, variants: CardStyledOptions) {
  return StyleSheet.create({
    card: {
      borderRadius: theme.radii["8"],
      backgroundColor: theme.colors.surface[variants.color],
      overflow: "hidden",
    },
  });
}
