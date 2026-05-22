import { useEffect } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useFieldContext } from "@/components/ui/field/hooks/use-field";

import { Text, type TextProps } from "@/components/ui/text";

import { useTheme } from "@/hooks/use-theme";

const AnimatedText = Animated.createAnimatedComponent(Text);

type Props = TextProps;

export function FieldLabel(props: Props) {
  const { invalid } = useFieldContext();
  const { theme } = useTheme();
  const isInvalidProgress = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        isInvalidProgress.value,
        [0, 1],
        [
          theme.colors.content.muted.toString(),
          theme.colors.content.error.toString(),
        ],
      ),
    };
  });

  useEffect(() => {
    isInvalidProgress.value = withTiming(invalid ? 1 : 0, {
      duration: 180,
    });
  }, [invalid, isInvalidProgress]);

  return (
    <AnimatedText
      weight="medium"
      typography="bodySmall"
      style={animatedStyles}
      {...props}
    />
  );
}
