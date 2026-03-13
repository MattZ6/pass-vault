import { useCallback } from "react";
import {
  cancelAnimation,
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type Input = {
  duration: number;
  onStart?: () => void;
  onFinish?: () => void;
};

type Status = "idle" | "running" | "paused";

export function useCountdownController({ duration, onStart, onFinish }: Input) {
  const isOnStartTriggered = useSharedValue(false);

  const progress = useSharedValue(0);
  const status = useSharedValue<Status>("idle");

  const remaining = useSharedValue(duration);
  const startTimestamp = useSharedValue(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Just "duration", "onStart" and "onFinish" are used
  const start = useCallback(() => {
    if (status.value === "running") {
      return;
    }

    status.value = "running";
    startTimestamp.value = Date.now();

    if (onStart && !isOnStartTriggered.value) {
      isOnStartTriggered.value = true;

      onStart();
    }

    progress.value = withTiming(
      1,
      {
        duration: remaining.value,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          remaining.value = duration;
          progress.value = 0;
          status.value = "idle";
          isOnStartTriggered.value = false;

          if (onFinish) {
            scheduleOnRN(onFinish);
          }
        }
      },
    );
  }, [duration, onFinish, onStart]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: No dependencies needed
  const pause = useCallback(() => {
    if (status.value !== "running") {
      return;
    }

    status.value = "paused";

    cancelAnimation(progress);

    const elapsed = Date.now() - startTimestamp.value;
    remaining.value = Math.max(0, remaining.value - elapsed);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Just "start" method is needed
  const resume = useCallback(() => {
    if (status.value !== "paused") {
      return;
    }

    start();
  }, [start]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Just "duration" is state
  const reset = useCallback(() => {
    cancelAnimation(progress);
    progress.value = 0;
    remaining.value = duration;
    status.value = "idle";
  }, [duration]);

  return {
    progress,
    start,
    pause,
    resume,
    reset,
  };
}
