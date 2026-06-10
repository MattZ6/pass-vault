import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    list: {
      flex: 1,
    },
    scrollContainer: {
      paddingTop: theme.spacing[4],
      paddingHorizontal: theme.spacing[4],
      paddingBottom: insets.bottom + theme.spacing[4],
      gap: theme.spacing[8],
    },
    section: {
      gap: theme.spacing[4],
    },
    sectionContent: {
      gap: theme.spacing[2],
    },

    hint: {
      padding: theme.spacing[4],
      borderRadius: theme.radii[8],
      backgroundColor: theme.colors.surface.element,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[3],
    },
    listItemDot: {
      flexShrink: 0,
      width: 6,
      height: 6,
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.content.element,
    },
    listItemContent: {
      flex: 1,
    },
    actions: {
      gap: theme.spacing[4],
    },
    buttonWrapper: {
      alignSelf: "flex-start",
      overflow: "hidden",
      borderRadius: theme.radii.full,
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      backgroundColor: theme.colors.surface.element,
    },
    lastUpdated: {
      textAlign: "center",
    },
  });
}
