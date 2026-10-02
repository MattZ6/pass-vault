import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { type VaultKey, VaultKeyService } from "@/services/vault/key";

export type AppLockPhase = "locked" | "unlocked";

// Only reached once a master password is already known to exist — the root
// layout routes to onboarding instead of mounting this when it doesn't — so
// this never needs its own async check. It starts "unlocked" only when a
// vault key is already cached, which happens right after onboarding sets
// one and navigates here — otherwise a fresh cold boot flashes the lock
// screen for a key the app already has.
export function useAppLock() {
  const [phase, setPhase] = useState<AppLockPhase>(() =>
    VaultKeyService.hasVaultKey() ? "unlocked" : "locked",
  );
  const appStateRef = useRef<AppStateStatus | null>(
    AppState.currentState as AppStateStatus,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // Only "background" means the app was actually left (home button,
      // app switcher, ...). "inactive" is a transient, iOS-only state the
      // app also passes through for system UI that doesn't leave the app
      // at all — the Face ID prompt chief among them (active -> inactive
      // -> active) — so treating it the same as "background" re-locked
      // the app immediately after every successful Face ID unlock.
      const isReturningToForeground =
        appStateRef.current === "background" && nextAppState === "active";

      if (isReturningToForeground) {
        VaultKeyService.clearVaultKey();
        setPhase("locked");
      }

      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const unlock = useCallback((vaultKey: VaultKey) => {
    VaultKeyService.setVaultKey(vaultKey);
    setPhase("unlocked");
  }, []);

  return {
    phase,
    unlock,
  };
}
