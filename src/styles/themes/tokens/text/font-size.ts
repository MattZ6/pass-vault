export const fontSize = {
  1: 12,
  2: 14,
  3: 16,
  4: 18,
  5: 20,
  6: 24,
  7: 30,
  8: 36,
} as const;

export type FontSize = typeof fontSize;
export type FontSizeOptions = keyof FontSize;
