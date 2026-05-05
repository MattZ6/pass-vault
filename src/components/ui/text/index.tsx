import { Text as RNText, type TextProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles, type TextStyledOptions } from "./styles";

type Props = TextProps & Partial<TextStyledOptions>;

export function Text({
  style,
  weight = "regular",
  typography = "body",
  color = "base",
  ...props
}: Props) {
  const { styles } = useStyles((input) =>
    getStyles(input, { weight, typography, color }),
  );

  return <RNText style={[styles.text, style]} {...props} />;
}
