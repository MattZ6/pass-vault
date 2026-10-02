import { useRouter } from "expo-router";
import { useCallback } from "react";

import { OnboardingScreen } from "@/screens/onboarding";

import type { VaultKey } from "@/services/vault/key";
import { VaultKeyService } from "@/services/vault/key";

import { useMasterPasswordStore } from "@/store/master-password/master-password.store";

export default function OnboardingPage() {
  const router = useRouter();
  const setHasMasterPassword = useMasterPasswordStore(
    (s) => s.setHasMasterPassword,
  );

  const handleComplete = useCallback(
    (vaultKey: VaultKey) => {
      VaultKeyService.setVaultKey(vaultKey);
      setHasMasterPassword(true);
      router.replace("/");
    },
    [setHasMasterPassword, router.replace],
  );

  return <OnboardingScreen onComplete={handleComplete} />;
}
