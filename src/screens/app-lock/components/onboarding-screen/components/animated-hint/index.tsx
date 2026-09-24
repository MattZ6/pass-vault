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
// Dragging forward (unlocking) moves the hint a lot less than dragging
// backward does — the wheel itself is already carrying the motion forward,
// the hint doesn't need to travel as far to read as "following along".
const HINT_MOVING_AREA_FORWARD = 12;

// Unlike the wheel's own rotation, the hint never hard-stops: it keeps
// drifting toward its area limit for as long as you keep dragging, just at a
// diminishing rate. Smaller softness = the curve saturates sooner (heavier).
const HINT_FORWARD_SOFTNESS = 90;
const HINT_BACKWARD_SOFTNESS = 40;

type Props = {
  translationX: SharedValue<number>;
  children: string;
  delay?: number;
};

export function AnimatedHint({ delay, children, translationX }: Props) {
  const visibility = useSharedValue(0);
  const { styles } = useStyles(getStyles);
  const { performSelectFeedback } = useHaptics();

  const animatedStyle = useAnimatedStyle(() => {
    const introOffset = interpolate(
      visibility.value,
      [0, 1],
      [-HINT_MOVING_AREA, 0],
    );

    const distance = translationX.value;
    const panOffset =
      distance >= 0
        ? (distance / (distance + HINT_FORWARD_SOFTNESS)) *
          HINT_MOVING_AREA_FORWARD
        : -((-distance / (-distance + HINT_BACKWARD_SOFTNESS)) *
            HINT_MOVING_AREA);

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
