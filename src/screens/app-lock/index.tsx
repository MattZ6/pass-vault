import type { ReactNode } from "react";
import { useRef } from "react";
import { View } from "react-native";

import { useAppLock } from "@/hooks/security/use-app-lock";
import { useStyles } from "@/hooks/use-styles";

import { LockScreen } from "./components/lock-screen";
import { SetupScreen } from "./components/setup-screen";

import { getStyles } from "./styles";

type Props = {
  children: ReactNode;
};

export function AppLockGate({ children }: Props) {
  const { styles } = useStyles(getStyles);
  const { phase, completeSetup, unlock } = useAppLock();
  const hasUnlockedOnceRef = useRef(false);

  if (phase === "unlocked") {
    hasUnlockedOnceRef.current = true;
  }

  if (phase === "checking") {
    return null;
  }

  return (
    <View style={styles.container}>
      {/*
        Only mounted after the first real unlock, and kept mounted from
        then on (even across re-locks) so navigation state survives a
        lock/unlock cycle. Mounting it before that would let screens like
        Home read/decrypt the vault (via VaultKeyService's legacy
        fallback) before the user has ever authenticated through the
        master password.
      */}
      {hasUnlockedOnceRef.current && children}

      {phase === "setup" && (
        <View style={styles.overlay}>
          <SetupScreen onSetupComplete={completeSetup} />
        </View>
      )}

      {phase === "locked" && (
        <View style={styles.overlay}>
          <LockScreen onUnlock={unlock} />
        </View>
      )}
    </View>
  );
}
