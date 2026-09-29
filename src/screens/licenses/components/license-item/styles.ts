import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  const imageSize = theme.size[8];

  return StyleSheet.create({
    avatarContainer: {
      position: "relative",
      width: imageSize,
      height: imageSize,
      borderRadius: theme.radii[3],
      backgroundColor: theme.colors.surface.element,
      overflow: "hidden",
    },
    avatar: {
      position: "absolute",
      width: imageSize,
      height: imageSize,
    },
    avatarRing: {
      position: "absolute",
      width: imageSize,
      height: imageSize,
      borderRadius: theme.radii[3],
      borderWidth: 1.5,
      borderColor: theme.colors.content.base,
      opacity: 0.2,
    },
    version: {
      textAlign: "right",
    },
  });
}
