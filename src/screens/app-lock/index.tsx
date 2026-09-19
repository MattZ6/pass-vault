import type { ReactNode } from "react";
import { View } from "react-native";

import { useAppLock } from "@/hooks/security/use-app-lock";
import { useStyles } from "@/hooks/use-styles";

import { LockScreen } from "./components/lock-screen";

import { getStyles } from "./styles";

type Props = {
  children: ReactNode;
};

export function AppLockGate({ children }: Props) {
  const { styles } = useStyles(getStyles);
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
