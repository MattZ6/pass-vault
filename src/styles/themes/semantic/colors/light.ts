import { palette } from "@/styles/themes/tokens/palette/light";

import type { Colors } from "./types";

export const colors: Colors = {
  surface: {
    base: palette.gray["1"],
    elevated: palette.gray["2"],
  },

  content: {
    base: palette.gray["12"],
    muted: palette.gray["11"],
  },

  border: {
    default: palette.gray["6"],
  },

  androidRipple: {
    foreground: true,
    color: `${palette.gray["12"]}1A`,
  },
} as const;
