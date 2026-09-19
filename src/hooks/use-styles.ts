import { useMemo } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

import type { Theme } from "@/styles/themes/types";

import { useTheme } from "./use-theme";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type StyleFactory<T extends NamedStyles<T>> = (theme: Theme) => T;

export type UseStylesOptions = {
  cacheKey?: string;
};

export function useStyles<T extends NamedStyles<T>>(
  factory: StyleFactory<T>,
  _options: UseStylesOptions = {},
) {
  const { theme, resolvedThemeOption } = useTheme();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-mount only when theme changes.
  return useMemo(
    () => ({
      theme,
      resolvedThemeOption,
      styles: factory(theme),
    }),
    [theme],
  );
}
