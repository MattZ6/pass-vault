import { useEffect } from "react";
import type { View } from "react-native";
import Animated, {
  type AnimatedRef,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import { SPRING_CONFIG } from "@/config/animations/spring";

import { useStyles } from "@/hooks/use-styles";

import { VaultWheel } from "./components/wheel";

import { getStyles } from "./styles";

type Props = {
  wheelRef: AnimatedRef<View>;
  rotation: SharedValue<number>;
  delay?: number;
};

export function AnimatedLogo({ delay, rotation, wheelRef }: Props) {
  const visibility = useSharedValue(0);
  const { styles } = useStyles(getStyles);

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
    <Animated.View key="animated-logo" style={[styles.container, animatedStyle]}>
      <VaultWheel wheelRef={wheelRef} rotation={rotation} />
    </Animated.View>
  );
}
