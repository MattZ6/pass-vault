import { StyleSheet } from "react-native";

export function getWheelGeometry(diameter: number) {
  const rimStrokeWidth = Math.max(3, diameter * 0.015);
  const hubRadius = diameter * 0.09;
  const hubStrokeWidth = 2;
  const spokeWidth = Math.max(4, diameter * 0.02);
  const rimRadius = diameter / 2 - rimStrokeWidth / 2;

  return {
    center: diameter / 2,
    rimRadius,
    rimStrokeWidth,
    hubRadius,
    hubStrokeWidth,
    spokeWidth,
    spokeInnerRadius: hubRadius + spokeWidth / 2,
    spokeOuterRadius: rimRadius - rimStrokeWidth,
  };
}

export function getStyles(diameter: number) {
  return StyleSheet.create({
    container: {
      width: diameter,
      height: diameter,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
