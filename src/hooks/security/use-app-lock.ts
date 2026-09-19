import { useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";

import { useBiometrics } from "@/hooks/use-biometrics";

export function useAppLock() {
  const { data: biometrics, isPending } = useBiometrics();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const requiresLock = Boolean(biometrics?.isEnrolled);

  useEffect(() => {
    if (!requiresLock) {
      return;
    }

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const isReturningToForeground =
        /inactive|background/.test(appStateRef.current) &&
        nextAppState === "active";

      if (isReturningToForeground) {
        setIsUnlocked(false);
      }

      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, [requiresLock]);

  return {
    isPending,
    isLocked: requiresLock && !isUnlocked,
    unlock: () => setIsUnlocked(true),
  };
}
