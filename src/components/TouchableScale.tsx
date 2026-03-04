import { useCallback } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCALE = {
  PRESSED: 0.97,
  RELEASED: 1,
};

type Props = Omit<PressableProps, "onPressIn" | "onPressOut"> & {
  children: React.ReactNode;
};

export function TouchableOpacity({ children, ...props }: Props) {
  const scale = useSharedValue(SCALE.RELEASED);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(SCALE.PRESSED, { damping: 50 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(SCALE.RELEASED, { damping: 50 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scale.value,
      [SCALE.PRESSED, SCALE.RELEASED],
      [0.85, 1],
      "clamp",
    ),
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
