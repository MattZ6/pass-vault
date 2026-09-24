import { useEffect } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import {
  AnimatedText,
  type AnimatedTextProps,
} from "@/components/ui/text/animated";

import { SPRING_CONFIG } from "@/config/animations/spring";

type Props = AnimatedTextProps & {
  delay?: number;
};

export function AnimatedTitle({ style, delay, ...props }: Props) {
  const visibility = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: visibility.value,
      transform: [
        {
          translateY: interpolate(visibility.value, [0, 1], [4, 0]),
        },
      ],
    };
  });

  useEffect(() => {
    visibility.value = withDelay(delay ?? 0, withSpring(1, SPRING_CONFIG));
  }, [visibility, delay]);

  return (
    <AnimatedText
      key="animated-title"
      weight="semiBold"
      typography="subtitle"
      {...props}
      style={[style, animatedStyle]}
    />
  );
}
