import { Stack } from "expo-router";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

import type { SheetHeaderTitleProps } from "./types";

export function SheetHeaderTitle(props: SheetHeaderTitleProps) {
  const { theme } = useStyles(getStyles);

  return (
    <Stack.Screen.Title
      style={{
        fontFamily: theme.fontFamily.semiBold,
        color: theme.colors.content.base.toString(),
      }}
      {...props}
    />
  );
}
