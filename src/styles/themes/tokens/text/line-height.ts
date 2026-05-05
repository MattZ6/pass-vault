export const lineHeight = {
  1: 20,
  2: 24,
  3: 24,
  4: 28,
  5: 28,
  6: 32,
  7: 38,
  8: 44,
} as const;

export type LineHeight = typeof lineHeight;
export type LineHeightOptions = keyof LineHeight;
