import { useEffect } from "react";
import type { View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useHaptics } from "@/hooks/use-haptics";

// How far right you need to drag to unlock. Rotation ramps up linearly
// with the drag and clamps here, so "fully rotated" and "far enough to
// unlock" are the same point.
const FORWARD_UNLOCK_DISTANCE = 96;
const FORWARD_MAX_ROTATION_DEG = 40;

// Dragging left ("closing" the door further) never unlocks anything — it's
// just a heavier, limited-travel rubber band: RUBBER_DISTANCE controls how
// quickly it saturates (smaller = heavier), and it never rotates past
// BACKWARD_MAX_ROTATION_DEG no matter how far you drag.
const BACKWARD_MAX_ROTATION_DEG = 10;
const BACKWARD_RUBBER_DISTANCE = 50;

// A small counter-clockwise nudge that plays once, timed to the hint's own
// delay, so the wheel itself hints that it turns.
const IDLE_HINT_ROTATION_DEG = -10;

// Fires a light haptic tick every few degrees of rotation, in either
// direction, as a continuous "you're dragging this" signal.
const HAPTIC_STEP_DEG = 4;

const RETURN_SPRING_CONFIG = { damping: 18, stiffness: 220 };

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

  const { performTapFeedback, performImpactFeedback } = useHaptics();

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
          -(clamped / FORWARD_UNLOCK_DISTANCE) * FORWARD_MAX_ROTATION_DEG;
      } else {
        const distance = -translationX;
        const rubberBandFactor =
          distance / (distance + BACKWARD_RUBBER_DISTANCE);
        rotation.value = rubberBandFactor * BACKWARD_MAX_ROTATION_DEG;
      }

      const hapticStep = Math.floor(Math.abs(rotation.value) / HAPTIC_STEP_DEG);

      if (hapticStep !== lastHapticStep.value) {
        lastHapticStep.value = hapticStep;
        runOnJS(performTapFeedback)();
      }
    })
    .onEnd((event) => {
      if (hasUnlocked.value) {
        return;
      }

      if (event.translationX >= FORWARD_UNLOCK_DISTANCE) {
        hasUnlocked.value = true;
        runOnJS(performImpactFeedback)();
        runOnJS(onUnlocked)();
      } else {
        rotation.value = withSpring(0, RETURN_SPRING_CONFIG);
      }
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once per hintDelay value, when the hint itself is about to appear.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasUnlocked.value || hasInteracted.value) {
        return;
      }

      rotation.value = withSequence(
        withTiming(IDLE_HINT_ROTATION_DEG, { duration: 220 }),
        withTiming(0, { duration: 220 }),
      );
    }, hintDelay);

    return () => clearTimeout(timeoutId);
  }, [hintDelay]);

  // Normalized -1..1: negative while dragging left (closing further),
  // positive while dragging right (opening), scaled so each direction's own
  // max rotation maps to -1/1 regardless of how differently they're driven.
  const progress = useDerivedValue(() => {
    const value = rotation.value;

    if (value <= 0) {
      return -value / FORWARD_MAX_ROTATION_DEG;
    }

    return -value / BACKWARD_MAX_ROTATION_DEG;
  });

  return { wheelRef, rotation, progress, panGesture };
}
