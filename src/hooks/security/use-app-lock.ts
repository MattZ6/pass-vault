import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { type VaultKey, VaultKeyService } from "@/services/vault/key";
import { MasterPasswordService } from "@/services/vault/master-password";

export type AppLockPhase = "checking" | "setup" | "locked" | "unlocked";

export function useAppLock() {
  const [phase, setPhase] = useState<AppLockPhase>("checking");
  const appStateRef = useRef<AppStateStatus | null>(AppState.currentState as AppStateStatus);

  useEffect(() => {
    let cancelled = false;

    MasterPasswordService.hasMasterPassword().then((hasMasterPassword) => {
      if (cancelled) {
        return;
      }

      setPhase(hasMasterPassword ? "locked" : "setup");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== "locked" && phase !== "unlocked") {
      return;
    }

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const isReturningToForeground =
        /inactive|background/.test(appStateRef.current ?? "") && nextAppState === "active";

      if (isReturningToForeground) {
        VaultKeyService.clearVaultKey();
        setPhase("locked");
      }

      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, [phase]);

  const completeSetup = useCallback((vaultKey: VaultKey) => {
    VaultKeyService.setVaultKey(vaultKey);
    setPhase("unlocked");
  }, []);

  const unlock = useCallback((vaultKey: VaultKey) => {
    VaultKeyService.setVaultKey(vaultKey);
    setPhase("unlocked");
  }, []);

  return {
    phase,
    completeSetup,
    unlock,
  };
}
