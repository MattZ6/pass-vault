import { useEffect } from "react";
import type { View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { SPRING_CONFIG } from "@/config/animations/spring";
import { useHaptics } from "@/hooks/use-haptics";

// Resting angle once the intro settles: "a little open" rather than
// perfectly flat, so there's something to see even before you touch it.
const REST_ROTATION_DEG = -10;

// How far right you need to drag to unlock. Rotation beyond rest ramps up
// linearly with the drag and clamps here, so "fully rotated" and "far
// enough to unlock" are the same point.
const FORWARD_UNLOCK_DISTANCE = 150;
const FORWARD_ROTATION_RANGE_DEG = 70;

// Dragging left ("closing" the door further, back past rest) never unlocks
// anything — it's just a heavier, limited-travel rubber band:
// RUBBER_DISTANCE controls how quickly it saturates (smaller = heavier),
// and it never rotates past REST_ROTATION_DEG + BACKWARD_ROTATION_RANGE_DEG
// no matter how far you drag.
const BACKWARD_ROTATION_RANGE_DEG = 10;
const BACKWARD_RUBBER_DISTANCE = 50;

// Fires a light tick every degree of rotation change while dragging, in
// either direction — noticeably lighter than the release/unlock haptics
// below, so it reads as "still turning" rather than another event.
const HAPTIC_STEP_DEG = 1;

type Input = {
  onUnlocked: () => void;
  hintDelay: number;
};

export function useVaultWheelGesture({ onUnlocked, hintDelay }: Input) {
  const wheelRef = useAnimatedRef<View>();
  const rotation = useSharedValue(0);
  const hasUnlocked = useSharedValue(false);
  const hasInteracted = useSharedValue(false);
  const lastHapticStep = useSharedValue(0);

  const { performDragFeedback, performReleaseFeedback, performImpactFeedback } =
    useHaptics();

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(() => {
      hasInteracted.value = true;
      lastHapticStep.value = 0;
    })
    .onUpdate((event) => {
      if (hasUnlocked.value) {
        return;
      }

      const translationX = event.translationX;

      if (translationX >= 0) {
        const clamped = Math.min(translationX, FORWARD_UNLOCK_DISTANCE);
        rotation.value =
          REST_ROTATION_DEG -
          (clamped / FORWARD_UNLOCK_DISTANCE) * FORWARD_ROTATION_RANGE_DEG;
      } else {
        const distance = -translationX;
        const rubberBandFactor =
          distance / (distance + BACKWARD_RUBBER_DISTANCE);
        rotation.value =
          REST_ROTATION_DEG + rubberBandFactor * BACKWARD_ROTATION_RANGE_DEG;
      }

      const step = Math.floor(
        Math.abs(rotation.value - REST_ROTATION_DEG) / HAPTIC_STEP_DEG,
      );

      if (step !== lastHapticStep.value) {
        lastHapticStep.value = step;
        scheduleOnRN(performDragFeedback);
      }
    })
    .onEnd((event) => {
      if (hasUnlocked.value) {
        return;
      }

      if (event.translationX >= FORWARD_UNLOCK_DISTANCE) {
        hasUnlocked.value = true;
        scheduleOnRN(performImpactFeedback);
        scheduleOnRN(onUnlocked);
      } else {
        rotation.value = withSpring(REST_ROTATION_DEG, SPRING_CONFIG);
        scheduleOnRN(performReleaseFeedback);
      }
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once per hintDelay value, when the hint itself is about to appear.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnlocked.value || hasInteracted.value) {
        return;
      }

      rotation.value = withSpring(REST_ROTATION_DEG, SPRING_CONFIG);
    }, hintDelay);

    return () => clearTimeout(timeoutId);
  }, [hintDelay]);

  // Normalized -1..1, relative to the resting angle: negative while
  // dragging left (closing further, back past rest), positive while
  // dragging right (opening), each scaled by that direction's own rotation
  // range so both read consistently.
  const progress = useDerivedValue(() => {
    const delta = REST_ROTATION_DEG - rotation.value;

    if (delta >= 0) {
      return delta / FORWARD_ROTATION_RANGE_DEG;
    }

    return delta / BACKWARD_ROTATION_RANGE_DEG;
  });

  return { wheelRef, rotation, progress, panGesture };
}
