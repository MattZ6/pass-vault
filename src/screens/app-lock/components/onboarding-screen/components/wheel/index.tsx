import { useWindowDimensions, View } from "react-native";
import Animated, {
  type AnimatedRef,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle, Rect } from "react-native-svg";

import { useTheme } from "@/hooks/use-theme";

import { getStyles, getWheelGeometry } from "./styles";

type Props = {
  wheelRef: AnimatedRef<View>;
  rotation: SharedValue<number>;
};

// Vault icon, drawn flat with no baked-in lighting so it keeps reading
// correctly at any rotation. The body/door/hinges stay put; only the ring +
// crossbars + hub (the "tampa" you turn) rotate with the drag gesture, so
// they're a separate layer stacked on top rather than part of the same Svg.
// See components/wheel/styles.ts for where the geometry ratios come from.
export function VaultWheel({ wheelRef, rotation }: Props) {
  const { width, height } = useWindowDimensions();
  const diameter = Math.round(Math.min(width, height) * 0.55);
  const { theme } = useTheme();
  const styles = getStyles(diameter);
  const geometry = getWheelGeometry(diameter);

  const strokeColor = theme.colors.content.element.toString();
  const punchThroughColor = theme.colors.surface.base.toString();

  const animatedWheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View ref={wheelRef} collapsable={false} style={styles.container}>
      <Svg
        style={styles.layer}
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <Rect
          x={geometry.body.x}
          y={geometry.body.y}
          width={geometry.body.size}
          height={geometry.body.size}
          rx={geometry.body.radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={geometry.strokeWidth}
        />

        <Rect
          x={geometry.door.x}
          y={geometry.door.y}
          width={geometry.door.size}
          height={geometry.door.size}
          rx={geometry.door.radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={geometry.strokeWidth}
        />

        {geometry.hinges.map((hinge) => (
          <Rect
            key={hinge.y}
            x={hinge.x}
            y={hinge.y}
            width={hinge.width}
            height={hinge.height}
            rx={hinge.radius}
            fill={punchThroughColor}
            stroke={strokeColor}
            strokeWidth={geometry.strokeWidth}
          />
        ))}
      </Svg>

      <Animated.View style={[styles.layer, animatedWheelStyle]}>
        <Svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          <Circle
            cx={geometry.center}
            cy={geometry.center}
            r={geometry.ring.radius}
            fill={punchThroughColor}
            stroke={strokeColor}
            strokeWidth={geometry.strokeWidth}
          />

          <Rect
            x={geometry.horizontalBar.x}
            y={geometry.horizontalBar.y}
            width={geometry.horizontalBar.width}
            height={geometry.horizontalBar.height}
            rx={geometry.horizontalBar.radius}
            fill={punchThroughColor}
            stroke={strokeColor}
            strokeWidth={geometry.strokeWidth}
          />

          <Rect
            x={geometry.verticalBar.x}
            y={geometry.verticalBar.y}
            width={geometry.verticalBar.width}
            height={geometry.verticalBar.height}
            rx={geometry.verticalBar.radius}
            fill={punchThroughColor}
            stroke={strokeColor}
            strokeWidth={geometry.strokeWidth}
          />

          <Circle
            cx={geometry.center}
            cy={geometry.center}
            r={geometry.hub.radius}
            fill={punchThroughColor}
            stroke={strokeColor}
            strokeWidth={geometry.strokeWidth}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
