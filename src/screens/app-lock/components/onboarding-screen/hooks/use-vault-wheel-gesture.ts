import type { View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  measure,
  runOnJS,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

// How far the wheel needs to turn counter-clockwise to count as "open".
// Negative because rotation accumulates with the same sign as the drag
// (clockwise drag -> positive, counter-clockwise -> negative) — two full
// turns the "unlock" way.
const UNLOCK_ROTATION_THRESHOLD_DEG = -720;

type Input = {
  onUnlocked: () => void;
};

export function useVaultWheelGesture({ onUnlocked }: Input) {
  const wheelRef = useAnimatedRef<View>();
  const rotation = useSharedValue(0);
  const lastAngle = useSharedValue(0);
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const hasUnlocked = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      const measured = measure(wheelRef);

      if (measured) {
        centerX.value = measured.pageX + measured.width / 2;
        centerY.value = measured.pageY + measured.height / 2;
      }

      lastAngle.value = Math.atan2(
        event.absoluteY - centerY.value,
        event.absoluteX - centerX.value,
      );
    })
    .onUpdate((event) => {
      if (hasUnlocked.value) {
        return;
      }

      const currentAngle = Math.atan2(
        event.absoluteY - centerY.value,
        event.absoluteX - centerX.value,
      );

      let delta = currentAngle - lastAngle.value;

      // Normalize so crossing the -180/180 seam doesn't register as a
      // near-full-turn jump.
      if (delta > Math.PI) {
        delta -= 2 * Math.PI;
      } else if (delta < -Math.PI) {
        delta += 2 * Math.PI;
      }

      rotation.value += delta * (180 / Math.PI);
      lastAngle.value = currentAngle;

      if (rotation.value <= UNLOCK_ROTATION_THRESHOLD_DEG) {
        hasUnlocked.value = true;
        runOnJS(onUnlocked)();
      }
    });

  const progress = useDerivedValue(() => {
    const value = rotation.value / UNLOCK_ROTATION_THRESHOLD_DEG;

    return Math.min(Math.max(value, 0), 1);
  });

  return { wheelRef, rotation, progress, panGesture };
}
