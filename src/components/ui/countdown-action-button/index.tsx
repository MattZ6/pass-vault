import { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { SpringConfig } from "react-native-reanimated/lib/typescript/animation/spring";

const SCALE = {
  PRESSED: 0.97,
  RELEASED: 1,
};

const SPRING_CONFIG: SpringConfig = {
  damping: 50,
};

type Props = {
  progress: SharedValue<number>;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  idleText: string;
  runningText: string;
};

export function CountdownActionButton({
  progress,
  onPress,
  onPressIn,
  onPressOut,
  idleText,
  runningText,
}: Props) {
  const scale = useSharedValue(SCALE.RELEASED);
  const width = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(SCALE.PRESSED, SPRING_CONFIG);

    if (onPressIn) {
      onPressIn();
    }
  }, [onPressIn, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(SCALE.RELEASED, SPRING_CONFIG);

    if (onPressOut) {
      onPressOut();
    }
  }, [onPressOut, scale]);

  const animatedStyles = useAnimatedStyles({
    progress,
    scale,
    width,
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        onLayout={(e) => {
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.button, animatedStyles.button]}
      >
        <Animated.View
          style={[styles.progressLayer, animatedStyles.progress]}
        />

        <Animated.Text style={[styles.text, animatedStyles.idleText]}>
          {idleText}
        </Animated.Text>

        <Animated.Text
          style={[styles.text, styles.absolute, animatedStyles.runningText]}
        >
          {runningText}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 14,
    // backgroundColor: colors.mauve3,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  progressLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: colors.mauve6,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    // color: colors.mauve12,
  },
  absolute: {
    position: "absolute",
  },
});

type UseAnimatedStylesInput = {
  width: SharedValue<number>;
  scale: SharedValue<number>;
  progress: SharedValue<number>;
};

function useAnimatedStyles({ width, progress, scale }: UseAnimatedStylesInput) {
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
    transform: [
      {
        translateX: -width.value * progress.value,
      },
    ],
  }));

  const idleTextStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value > 0 ? 0 : 1, { duration: 150 }),
    transform: [
      {
        translateY: withTiming(progress.value > 0 ? -6 : 0, { duration: 150 }),
      },
      { scale: withTiming(progress.value > 0 ? 0.96 : 1, { duration: 150 }) },
    ],
  }));

  const runningTextStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value > 0 ? 1 : 0, { duration: 150 }),
    transform: [
      { translateY: withTiming(progress.value > 0 ? 0 : 6, { duration: 150 }) },
      { scale: withTiming(progress.value > 0 ? 1 : 0.96, { duration: 150 }) },
    ],
  }));

  return {
    button: buttonStyle,
    progress: progressStyle,
    idleText: idleTextStyle,
    runningText: runningTextStyle,
  };
}
