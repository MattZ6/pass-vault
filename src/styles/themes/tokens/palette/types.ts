export type PaletteScale = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

type ColorPalette = "gray";

export type Palette = Record<ColorPalette, PaletteScale>;
