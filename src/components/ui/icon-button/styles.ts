import { StyleSheet } from "react-native";

import type { SizeOptions } from "@/styles/themes/tokens/size";
import type { Theme } from "@/styles/themes/types";

export type IconButtonStyledOptions = {
  size: SizeOptions;
};

export function getStyles(theme: Theme, options: IconButtonStyledOptions) {
  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      justifyContent: "center",
      width: theme.size[options.size],
      height: theme.size[options.size],
      borderRadius: theme.radii.full,
      overflow: "hidden",
    },
    content: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      width: theme.size[options.size],
      height: theme.size[options.size],
    },
  });
}
