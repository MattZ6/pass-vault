export const fontFamily = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
} as const;

export type FontFamily = typeof fontFamily;
export type FontFamilyOptions = keyof FontFamily;
