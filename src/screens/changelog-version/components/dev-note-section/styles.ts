import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      padding: theme.spacing[4],
      gap: theme.spacing[2],
    },
    content: {
      gap: theme.spacing[2],
    },
    footer: {
      alignItems: "flex-end",
    },
    authorAvatar: {
      position: "absolute",
      alignSelf: "center",
      width: theme.size[12],
      height: theme.size[12],
      backgroundColor: theme.colors.surface.elevated,
    },
    avatarRing: {
      position: "absolute",
      alignSelf: "center",
      width: theme.size[12],
      height: theme.size[12],
      borderRadius: theme.radii.full,
      borderWidth: 4,
      borderColor: `rgba(0, 0, 0, 0.25)`,
      zIndex: 2,
    },
  });
}
