import { useWindowDimensions, View } from "react-native";
import Animated, {
  type AnimatedRef,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

const SPOKE_COUNT = 8;
const SPOKE_ANGLES = Array.from(
  { length: SPOKE_COUNT },
  (_, index) => index * (360 / SPOKE_COUNT),
);

type Props = {
  wheelRef: AnimatedRef<View>;
  rotation: SharedValue<number>;
  progress: SharedValue<number>;
};

// Placeholder vault-wheel graphic built from plain Views (rim + spokes +
// hub) so this doesn't need a new SVG dependency. Swap this component's
// internals for the real artwork later — the gesture/rotation logic in
// use-vault-wheel-gesture.ts doesn't need to change.
export function VaultWheel({ wheelRef, rotation, progress }: Props) {
  const { width, height } = useWindowDimensions();
  const diameter = Math.round(Math.min(width, height) * 0.55);
  const { styles, theme } = useStyles((input) => getStyles(input, diameter));

  const animatedRimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [
        theme.colors.border.default.toString(),
        theme.colors.border.active.toString(),
      ],
    ),
  }));

  return (
    <View ref={wheelRef} collapsable={false} style={styles.container}>
      <Animated.View style={[styles.rim, animatedRimStyle]}>
        {SPOKE_ANGLES.map((angle) => (
          <View
            key={angle}
            style={[
              styles.spokeContainer,
              { transform: [{ rotate: `${angle}deg` }] },
            ]}
          >
            <View style={styles.spoke} />
          </View>
        ))}

        <View style={styles.hub} />
      </Animated.View>
    </View>
  );
}
