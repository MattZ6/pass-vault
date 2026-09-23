import { useCallback } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { type ButtonProps, IOS_SCALE_CONFIG, IOS_SPRINT_CONFIG } from "./types";

export function Button({
  children,
  accessibilityRole = "button",
  iosPressedScale = IOS_SCALE_CONFIG.PRESSED,
  ioSpringConfig = IOS_SPRINT_CONFIG,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(IOS_SCALE_CONFIG.RELEASED);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(iosPressedScale, ioSpringConfig);
  }, [scale, iosPressedScale, ioSpringConfig]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(IOS_SCALE_CONFIG.RELEASED, ioSpringConfig);
  }, [scale, ioSpringConfig]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scale.value,
        [iosPressedScale, IOS_SCALE_CONFIG.RELEASED],
        [0.75, 1],
        "clamp",
      ),
      transform: [{ scale: scale.value }],
    }),
    [iosPressedScale],
  );

  return (
    <Pressable
      {...props}
      accessibilityRole={accessibilityRole}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
