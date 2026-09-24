import { useEffect } from "react";
import type { View } from "react-native";
import { usePanGesture } from "react-native-gesture-handler";
import { useAnimatedRef, useSharedValue, withSpring } from "react-native-reanimated";
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
// (0°, fully closed) no matter how far you drag.
const BACKWARD_ROTATION_RANGE_DEG = 10;
const BACKWARD_RUBBER_DISTANCE = 50;

// Fires a light tick as the wheel rotates, in either direction — spaced out
// (rather than every degree) so it reads as the heavy detents of a vault
// door turning, not a buzz.
const HAPTIC_STEP_DEG = 4;

type Input = {
  onUnlocked: () => void;
  hintDelay: number;
};

export function useVaultWheelGesture({ onUnlocked, hintDelay }: Input) {
  const wheelRef = useAnimatedRef<View>();
  const rotation = useSharedValue(0);
  // Raw, unclamped horizontal drag distance — unlike `rotation`, this never
  // saturates, so the hint can keep drifting (decelerating) even once the
  // wheel itself has hit its rotation limit.
  const dragDistance = useSharedValue(0);
  const hasUnlocked = useSharedValue(false);
  const hasInteracted = useSharedValue(false);
  const hasCrossedThreshold = useSharedValue(false);
  const lastHapticStep = useSharedValue(0);

  const { performDragFeedback, performReleaseFeedback, performImpactFeedback } =
    useHaptics();

  const panGesture = usePanGesture({
    activeOffsetX: [-10, 10],
    failOffsetY: [-10, 10],
    onActivate: () => {
      hasInteracted.value = true;
      lastHapticStep.value = 0;
      hasCrossedThreshold.value = false;
    },
    onUpdate: (event) => {
      if (hasUnlocked.value) {
        return;
      }

      const translationX = event.translationX;
      dragDistance.value = translationX;

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

      // Fire the "unlocked"/"locked" tick live, right as the finger crosses
      // the threshold in either direction — not only once you let go.
      if (translationX >= FORWARD_UNLOCK_DISTANCE && !hasCrossedThreshold.value) {
        hasCrossedThreshold.value = true;
        scheduleOnRN(performImpactFeedback);
      } else if (
        translationX < FORWARD_UNLOCK_DISTANCE &&
        hasCrossedThreshold.value
      ) {
        hasCrossedThreshold.value = false;
        scheduleOnRN(performReleaseFeedback);
      }
    },
    onDeactivate: () => {
      if (hasUnlocked.value) {
        return;
      }

      dragDistance.value = withSpring(0, SPRING_CONFIG);

      if (hasCrossedThreshold.value) {
        hasUnlocked.value = true;
        scheduleOnRN(onUnlocked);
      } else {
        rotation.value = withSpring(REST_ROTATION_DEG, SPRING_CONFIG);
        scheduleOnRN(performReleaseFeedback);
      }
    },
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

  return { wheelRef, rotation, dragDistance, panGesture };
}
