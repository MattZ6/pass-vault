import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { useAppLock } from "@/hooks/security/use-app-lock";

import { LockScreen } from "./components/lock-screen";

type Props = {
  children: ReactNode;
};

export function AppLockGate({ children }: Props) {
  const { isPending, isLocked, unlock } = useAppLock();

  if (isPending) {
    return null;
  }

  return (
    <View style={styles.container}>
      {children}

      {isLocked && (
        <View style={styles.overlay}>
          <LockScreen onUnlock={unlock} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: StyleSheet.absoluteFill,
});
