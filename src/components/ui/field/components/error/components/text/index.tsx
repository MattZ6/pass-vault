import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

import { Text, type TextProps } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

const AnimatedText = Animated.createAnimatedComponent(Text);

const ANIMATION_DURATION_IN_MS = 140;

type Props = TextProps;

export function FieldErrorText({ style, ...props }: Props) {
  const { styles, theme } = useStyles(getStyles);

  return (
    <AnimatedText
      typography="bodySmall"
      entering={FadeInDown.duration(ANIMATION_DURATION_IN_MS).withInitialValues(
        { transform: [{ translateY: theme.spacing[1] }] },
      )}
      exiting={FadeOut.duration(ANIMATION_DURATION_IN_MS)}
      style={[styles.text, style]}
      {...props}
    />
  );
}
