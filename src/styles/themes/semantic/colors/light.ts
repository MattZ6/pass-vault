import { palette } from "@/styles/themes/tokens/palette/light";

import type { Colors } from "./types";

export const colors: Colors = {
  surface: {
    base: palette.gray["1"],
  },

  content: {
    base: palette.gray["12"],
    muted: palette.gray["11"],
  },

  border: {
    default: palette.gray["6"],
  },
} as const;
