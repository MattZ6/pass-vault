import { useEffect } from "react";
import { useWindowDimensions, type View } from "react-native";
import { usePanGesture } from "react-native-gesture-handler";
import { useAnimatedRef, useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { SPRING_CONFIG } from "@/config/animations/spring";
import { useHaptics } from "@/hooks/use-haptics";

const REST_ROTATION_DEG = -10;

const FORWARD_ROTATION_RANGE_DEG = 65;

const BACKWARD_ROTATION_RANGE_DEG = 10;
const BACKWARD_RUBBER_DISTANCE = 50;

type Input = {
  onUnlocked: () => void;
  hintDelay: number;
};

export function useVaultWheelGesture({ onUnlocked, hintDelay }: Input) {
  const { width } = useWindowDimensions()
  const FORWARD_UNLOCK_DISTANCE = Math.round((width / 3) * 1.5);

  const wheelRef = useAnimatedRef<View>();
  const rotation = useSharedValue(0);

  const dragDistance = useSharedValue(0);
  const hasUnlocked = useSharedValue(false);
  const hasInteracted = useSharedValue(false);
  const hasCrossedThreshold = useSharedValue(false);

  const { performReleaseFeedback, performImpactFeedback, performConfirmFeedback } = useHaptics();

  const panGesture = usePanGesture({
    activeOffsetX: [-10, 10],
    failOffsetY: [-10, 10],
    onActivate: () => {
      hasInteracted.value = true;
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

      const isUnlocked = translationX >= FORWARD_UNLOCK_DISTANCE && !hasCrossedThreshold.value;

      if (isUnlocked) {
        hasCrossedThreshold.value = true;
        scheduleOnRN(performConfirmFeedback);
      } else if (
        translationX < FORWARD_UNLOCK_DISTANCE &&
        hasCrossedThreshold.value
      ) {
        hasCrossedThreshold.value = false;
        scheduleOnRN(performImpactFeedback);
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
