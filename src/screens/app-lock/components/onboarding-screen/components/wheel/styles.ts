import { StyleSheet } from "react-native";

// Ratios lifted directly from the source icon (614x614 viewBox, center at
// 307,307): stroke width 8, body rect x/y 4 rx 124, door rect x/y 60 rx 92,
// ring r 120, hub r 64, each spoke bar 28 thick spanning the full width/
// height with fully rounded ends, hinges 28x88 (rx 14) centered 104 above/
// below the vertical center, left edge at x 46. Dividing every value by 614
// keeps them proportional at any diameter.
const SOURCE_SIZE = 614;

const STROKE_WIDTH_RATIO = 8 / SOURCE_SIZE;
const BODY_INSET_RATIO = 4 / SOURCE_SIZE;
const BODY_RADIUS_RATIO = 124 / SOURCE_SIZE;
const DOOR_INSET_RATIO = 60 / SOURCE_SIZE;
const DOOR_RADIUS_RATIO = 92 / SOURCE_SIZE;
const RING_RADIUS_RATIO = 120 / SOURCE_SIZE;
const HUB_RADIUS_RATIO = 64 / SOURCE_SIZE;
const BAR_HALF_LENGTH_RATIO = 207 / SOURCE_SIZE;
const BAR_THICKNESS_RATIO = 28 / SOURCE_SIZE;
const HINGE_X_RATIO = 46 / SOURCE_SIZE;
const HINGE_WIDTH_RATIO = 28 / SOURCE_SIZE;
const HINGE_HEIGHT_RATIO = 88 / SOURCE_SIZE;
const HINGE_CENTER_OFFSET_RATIO = 104 / SOURCE_SIZE;

export function getWheelGeometry(size: number) {
  const center = size / 2;
  const strokeWidth = STROKE_WIDTH_RATIO * size;

  const bodyInset = BODY_INSET_RATIO * size;
  const doorInset = DOOR_INSET_RATIO * size;

  const barHalfLength = BAR_HALF_LENGTH_RATIO * size;
  const barThickness = BAR_THICKNESS_RATIO * size;

  const hingeWidth = HINGE_WIDTH_RATIO * size;
  const hingeHeight = HINGE_HEIGHT_RATIO * size;
  const hingeOffset = HINGE_CENTER_OFFSET_RATIO * size;

  return {
    center,
    strokeWidth,

    body: {
      x: bodyInset,
      y: bodyInset,
      size: size - bodyInset * 2,
      radius: BODY_RADIUS_RATIO * size,
    },

    door: {
      x: doorInset,
      y: doorInset,
      size: size - doorInset * 2,
      radius: DOOR_RADIUS_RATIO * size,
    },

    hinges: [
      {
        x: HINGE_X_RATIO * size,
        y: center - hingeOffset - hingeHeight / 2,
        width: hingeWidth,
        height: hingeHeight,
        radius: hingeWidth / 2,
      },
      {
        x: HINGE_X_RATIO * size,
        y: center + hingeOffset - hingeHeight / 2,
        width: hingeWidth,
        height: hingeHeight,
        radius: hingeWidth / 2,
      },
    ],

    ring: {
      radius: RING_RADIUS_RATIO * size,
    },

    horizontalBar: {
      x: center - barHalfLength,
      y: center - barThickness / 2,
      width: barHalfLength * 2,
      height: barThickness,
      radius: barThickness / 2,
    },

    verticalBar: {
      x: center - barThickness / 2,
      y: center - barHalfLength,
      width: barThickness,
      height: barHalfLength * 2,
      radius: barThickness / 2,
    },

    hub: {
      radius: HUB_RADIUS_RATIO * size,
    },
  };
}

export function getStyles(size: number) {
  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    layer: {
      position: "absolute",
      top: 0,
      left: 0,
    },
  });
}
