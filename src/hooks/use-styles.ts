import { useMemo } from "react";
import type { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

import { useTheme } from "./use-theme";

export type StyleFactory<T extends StyleSheet.NamedStyles<T>> = (
  theme: Theme,
) => T;

export type UseStylesOptions = {
  cacheKey?: string;
};

export function useStyles<T extends StyleSheet.NamedStyles<T>>(
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
