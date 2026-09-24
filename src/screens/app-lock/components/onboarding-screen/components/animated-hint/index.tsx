import { SymbolView } from "expo-symbols";
import { useEffect } from "react";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { SPRING_CONFIG } from "@/config/animations/spring";
import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";
import { getStyles } from "./styles";

const HINT_MOVING_AREA = 30;

type Props = {
  progress: SharedValue<number>;
  children: string;
  delay?: number;
};

export function AnimatedHint({ delay, children, progress }: Props) {
  const visibility = useSharedValue(0);
  const { styles } = useStyles(getStyles);
  const { performSelectFeedback } = useHaptics();

  const animatedStyle = useAnimatedStyle(() => {
    const introOffset = interpolate(
      visibility.value,
      [0, 1],
      [-HINT_MOVING_AREA, 0],
    );

    const panOffset = interpolate(
      progress.value,
      [-1, 0, 1],
      [-HINT_MOVING_AREA, 0, HINT_MOVING_AREA],
    );

    return {
      opacity: interpolate(visibility.value, [0, 0.9], [0, 1]),
      transform: [{ translateX: introOffset + panOffset }],
    };
  });

  useEffect(() => {
    const waitTime = delay ?? 0;

    const timeoutId = setTimeout(() => {
      performSelectFeedback();
      visibility.value = withSpring(1, SPRING_CONFIG);
    }, waitTime);

    return () => clearTimeout(timeoutId);
  }, [delay, visibility, performSelectFeedback]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text color="muted" style={[styles.text]}>
        {children}
      </Text>

      <SymbolView
        name={{ android: "arrow_forward", ios: "arrow.right" }}
        size={styles.icon.width}
        tintColor={styles.icon.color}
      />
    </Animated.View>
  );
}
