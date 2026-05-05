import type { ReactNode } from "react";

import type {
  ResolvedThemeOptions,
  Theme,
  ThemeOptions,
} from "@/styles/themes/types";

export namespace ThemeContextTypes {
  export type ResolvedThemeOption = ResolvedThemeOptions;
  export type ThemeOption = ThemeOptions;

  export type Context = {
    theme: Theme;
    themeOptions: ThemeOption[];
    themeOption: ThemeOption;
    resolvedThemeOption: ResolvedThemeOption;
    changeTheme: (input: ThemeOption) => void;
  };
}

export namespace ThemeProviderTypes {
  export type Props = {
    children: ReactNode;
  };
}
