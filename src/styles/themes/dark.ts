import { colors } from "./semantic/colors/dark";
import { radii } from "./tokens/radii";
import { spacing } from "./tokens/spacing";
import { fontFamily } from "./tokens/text/font-family";
import { fontSize } from "./tokens/text/font-size";
import { lineHeight } from "./tokens/text/line-height";
import type { Theme } from "./types";

export const darkTheme: Theme = {
  fontFamily,
  fontSize,
  lineHeight,
  radii,
  colors,
  spacing,
};
