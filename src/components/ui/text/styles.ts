import { StyleSheet } from "react-native";

import type { ContentColorsOptions } from "@/styles/themes/semantic/colors/types";
import type { TypographyOptions } from "@/styles/themes/semantic/typography";
import type { FontFamilyOptions } from "@/styles/themes/tokens/text/font-family";

import type { Theme } from "@/styles/themes/types";

export type TextStyledOptions = {
  weight: FontFamilyOptions;
  typography: TypographyOptions;
  color: ContentColorsOptions;
};

export function getStyles(theme: Theme, options: TextStyledOptions) {
  return StyleSheet.create({
    text: {
      fontFamily: theme.fontFamily[options.weight],
      fontSize: theme.typography[options.typography].fontSize,
      lineHeight: theme.typography[options.typography].lineHeight,
      color: theme.colors.content[options.color],
    },
  });
}
