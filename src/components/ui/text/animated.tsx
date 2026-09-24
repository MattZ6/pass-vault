import type { TextProps as RNTextProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";

import { useStyles } from "@/hooks/use-styles";

import { getStyles, type TextStyledOptions } from "./styles";

export type AnimatedTextProps = Partial<TextStyledOptions> & AnimatedProps<RNTextProps>;

export function AnimatedText({
  style,
  weight = "regular",
  typography = "body",
  color = "base",
  ...props
}: AnimatedTextProps) {
  const { styles } = useStyles((input) =>
    getStyles(input, { weight, typography, color }),
  );

  return <Animated.Text style={[styles.text, style]} {...props} />;
}
