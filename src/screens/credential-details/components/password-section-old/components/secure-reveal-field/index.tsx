import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  value: string;
  visible: boolean;
};

export function SecureRevealField({ label, value, visible }: Props) {
  const progress = useSharedValue(0);

  const animatedStyles = useAnimatedStyles({
    progress,
  });

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 260 : 160, // hide mais rápido (segurança)
    });
  }, [visible, progress]);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View style={[styles.container, animatedStyles.container]}>
        <Animated.Text style={[styles.password, animatedStyles.masked]}>
          ********
        </Animated.Text>

        <Animated.Text
          style={[styles.password, styles.absolute, animatedStyles.password]}
        >
          {value}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    // color: colors.mauve9,
    textTransform: "uppercase",
  },
  container: {
    height: 52,
    borderRadius: 12,
    // backgroundColor: colors.mauve1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  password: {
    fontSize: 16,
    fontWeight: "500",
    // color: colors.mauve12,
    letterSpacing: 0.3,
  },
  absolute: {
    position: "absolute",
  },
});

type UseAnimatedStylesInput = {
  progress: SharedValue<number>;
};

function useAnimatedStyles({ progress }: UseAnimatedStylesInput) {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // backgroundColor: interpolateColor(
    //   progress.value,
    //   [0, 1],
    //   [colors.mauve2, colors.mauve3],
    // ),
    shadowOpacity: interpolate(progress.value, [0, 1], [0, 0.25]),
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.01]),
      },
    ],
  }));

  const maskedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [0, -4]),
      },
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.98]),
      },
    ],
  }));

  const realStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [6, 0]),
      },
      {
        scale: interpolate(progress.value, [0, 1], [0.98, 1]),
      },
    ],
  }));

  return {
    container: containerAnimatedStyle,
    masked: maskedStyle,
    password: realStyle,
  };
}
