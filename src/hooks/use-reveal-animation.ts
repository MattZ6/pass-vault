import { useEffect } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import { SPRING_CONFIG } from "@/config/animations/spring";

export function useRevealAnimation(delay?: number) {
  const visibility = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: visibility.value,
    transform: [
      {
        translateY: interpolate(visibility.value, [0, 1], [4, 0]),
      },
    ],
  }));

  useEffect(() => {
    visibility.value = withDelay(delay ?? 0, withSpring(1, SPRING_CONFIG));
  }, [visibility, delay]);

  return animatedStyle;
}
