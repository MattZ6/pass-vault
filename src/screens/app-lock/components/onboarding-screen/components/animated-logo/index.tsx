import type { View } from "react-native";
import Animated, { type AnimatedRef, type SharedValue } from "react-native-reanimated";

import { useRevealAnimation } from "@/hooks/use-reveal-animation";
import { useStyles } from "@/hooks/use-styles";

import { VaultWheel } from "./components/wheel";

import { getStyles } from "./styles";

type Props = {
  wheelRef: AnimatedRef<View>;
  rotation: SharedValue<number>;
  delay?: number;
};

export function AnimatedLogo({ delay, rotation, wheelRef }: Props) {
  const { styles } = useStyles(getStyles);
  const animatedStyle = useRevealAnimation(delay);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <VaultWheel wheelRef={wheelRef} rotation={rotation} />
    </Animated.View>
  );
}
