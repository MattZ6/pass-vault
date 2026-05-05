export const radii = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 18,
  full: 9999,
} as const;

export type Radii = typeof radii;
export type RadiiOptions = keyof Radii;
