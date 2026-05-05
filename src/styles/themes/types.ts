import type { Colors } from "./semantic/colors/types";
import type { Typography } from "./semantic/typography";
import type { Radii } from "./tokens/radii";
import type { Spacing } from "./tokens/spacing";
import type { FontFamily } from "./tokens/text/font-family";
import type { FontSize } from "./tokens/text/font-size";
import type { LineHeight } from "./tokens/text/line-height";

export type ResolvedThemeOptions = "light" | "dark";
export type ThemeOptions = "system" | ResolvedThemeOptions;

export type Theme = {
  typography: Typography;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: LineHeight;
  spacing: Spacing;
  radii: Radii;
  colors: Colors;
};
