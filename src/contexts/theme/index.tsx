import { createContext, useCallback, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { darkTheme } from "@/styles/themes/dark";
import { lightTheme } from "@/styles/themes/light";

import type { ThemeContextTypes, ThemeProviderTypes } from "./types";

const THEME_OPTIONS: ThemeContextTypes.ThemeOption[] = [
  "system",
  "light",
  "dark",
];

export const ThemeContext = createContext({} as ThemeContextTypes.Context);

export function ThemeProvider({ children }: ThemeProviderTypes.Props) {
  const deviceColorScheme = useColorScheme();
  const [appColorMode, setAppColorMode] =
    useState<ThemeContextTypes.ThemeOption>("system");

  const resolvedColorMode = useMemo(() => {
    if (appColorMode === "system") {
      if (deviceColorScheme === "unspecified" || !deviceColorScheme) {
        return "light";
      }

      return deviceColorScheme;
    }

    return appColorMode;
  }, [appColorMode, deviceColorScheme]);

  const theme = useMemo(() => {
    if (resolvedColorMode === "light") {
      return lightTheme;
    }

    if (resolvedColorMode === "dark") {
      return darkTheme;
    }

    throw new Error(`Color mode ${resolvedColorMode} not implemented.`);
  }, [resolvedColorMode]);

  const changeTheme = useCallback((input: ThemeContextTypes.ThemeOption) => {
    setAppColorMode(input);
  }, []);

  const contextValue = useMemo<ThemeContextTypes.Context>(
    () => ({
      theme,
      themeOptions: THEME_OPTIONS,
      themeOption: appColorMode,
      resolvedThemeOption: resolvedColorMode,
      changeTheme,
    }),
    [appColorMode, changeTheme, resolvedColorMode, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
