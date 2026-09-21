import { useWindowDimensions, View } from "react-native";
import Animated, {
  type AnimatedRef,
  interpolateColor,
  type SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle, Line } from "react-native-svg";

import { useTheme } from "@/hooks/use-theme";

import { getStyles, getWheelGeometry } from "./styles";

const SPOKE_COUNT = 8;
const SPOKE_ANGLES = Array.from(
  { length: SPOKE_COUNT },
  (_, index) => index * (360 / SPOKE_COUNT),
);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  wheelRef: AnimatedRef<View>;
  rotation: SharedValue<number>;
  progress: SharedValue<number>;
};

// Tintable vector wheel graphic (rim + spokes + hub) drawn flat, with no
// baked-in lighting, so it keeps reading correctly at any rotation — see
// components/wheel/styles.ts for the geometry constants.
export function VaultWheel({ wheelRef, rotation, progress }: Props) {
  const { width, height } = useWindowDimensions();
  const diameter = Math.round(Math.min(width, height) * 0.55);
  const { theme } = useTheme();
  const styles = getStyles(diameter);
  const geometry = getWheelGeometry(diameter);

  const animatedWheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedRimProps = useAnimatedProps(() => ({
    stroke: interpolateColor(
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
      <Animated.View style={animatedWheelStyle}>
        <Svg width={diameter} height={diameter}>
          <AnimatedCircle
            cx={geometry.center}
            cy={geometry.center}
            r={geometry.rimRadius}
            fill={theme.colors.surface.element.toString()}
            stroke={theme.colors.border.default.toString()}
            strokeWidth={geometry.rimStrokeWidth}
            animatedProps={animatedRimProps}
          />

          {SPOKE_ANGLES.map((angle) => (
            <Line
              key={angle}
              x1={geometry.center}
              y1={geometry.center - geometry.spokeOuterRadius}
              x2={geometry.center}
              y2={geometry.center - geometry.spokeInnerRadius}
              stroke={theme.colors.content.muted.toString()}
              strokeWidth={geometry.spokeWidth}
              strokeLinecap="round"
              transform={`rotate(${angle} ${geometry.center} ${geometry.center})`}
            />
          ))}

          <Circle
            cx={geometry.center}
            cy={geometry.center}
            r={geometry.hubRadius}
            fill={theme.colors.content.base.toString()}
            stroke={theme.colors.surface.base.toString()}
            strokeWidth={geometry.hubStrokeWidth}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
