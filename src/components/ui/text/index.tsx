import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles, type TextStyledOptions } from "./styles";

export type TextProps = RNTextProps & Partial<TextStyledOptions>;

export function Text({
  style,
  weight = "regular",
  typography = "body",
  color = "base",
  ...props
}: TextProps) {
  const { styles } = useStyles((input) =>
    getStyles(input, { weight, typography, color }),
  );

  return <RNText style={[styles.text, style]} {...props} />;
}
