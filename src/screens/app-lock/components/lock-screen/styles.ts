import { StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { Theme } from "@/styles/themes/types";

export function getStyles(theme: Theme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: theme.colors.surface.base,
      paddingTop: insets.top + theme.spacing[6],
      paddingBottom: insets.bottom + theme.spacing[4],
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing[3],
      paddingHorizontal: theme.spacing[6],
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: theme.size[24],
      height: theme.size[24],
      borderRadius: theme.radii.full,
      marginBottom: theme.spacing[6],
      backgroundColor: theme.colors.surface.element,
      borderWidth: 1,
      borderColor: theme.colors.border.default,
    },
    title: {
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing[6],
      gap: theme.spacing[2],
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    field: {
      flex: 1,
      padding: theme.spacing[4],
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.content.base,
    },
    error: {
      textAlign: "center",
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
    },
    buttonWrapper: {
      flex: 1,
      height: theme.size[11],
      borderRadius: theme.radii[6],
      overflow: "hidden",
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: theme.size[11],
    },
    buttonText: {
      textAlign: "center",
      color: theme.colors.content.base,
    },
  });
}
