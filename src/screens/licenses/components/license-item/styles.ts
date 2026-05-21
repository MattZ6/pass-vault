import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    avatarContainer: {
      width: theme.size[8],
      height: theme.size[8],
      borderRadius: theme.radii[3],
      backgroundColor: theme.colors.surface.element,
      overflow: "hidden",
    },
    avatar: {
      width: theme.size[8],
      height: theme.size[8],
    },
    avatarRing: {
      position: "absolute",
      width: theme.size[8],
      height: theme.size[8],
      borderRadius: theme.radii[3],
      borderWidth: 1,
      borderColor: theme.colors.content.base,
      opacity: 0.2,
    },
    version: {
      textAlign: "right",
    },
  });
}
