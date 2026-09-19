import * as ExpoSecureStore from "expo-secure-store";

import type { ScryptParams } from "@/services/cryptography/key-derivation";

const KEYS = {
  RECORD: "master_password.record",
  BIOMETRIC_VAULT_KEY: "master_password.biometric_vault_key",
};

export type MasterPasswordRecord = {
  saltBase64: string;
  kdfParams: ScryptParams;
  wrappedVaultKeyBase64: string;
};

export const MasterPasswordRepository = {
  getRecord: async () => {
    const stored = await ExpoSecureStore.getItemAsync(KEYS.RECORD, {
      requireAuthentication: false,
    });

    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as MasterPasswordRecord;
  },
  saveRecord: async (record: MasterPasswordRecord) => {
    await ExpoSecureStore.setItemAsync(KEYS.RECORD, JSON.stringify(record), {
      requireAuthentication: false,
    });
  },
  // Gated by requireAuthentication: true, so the OS (Face ID/Touch ID/
  // fingerprint) is what protects this copy of the vault key, not the
  // master password. It's a convenience fast path, seeded only after a
  // successful password unlock — see MasterPasswordService.
  getBiometricVaultKey: async () => {
    return ExpoSecureStore.getItemAsync(KEYS.BIOMETRIC_VAULT_KEY, {
      requireAuthentication: true,
    });
  },
  saveBiometricVaultKey: async (vaultKeySerialized: string) => {
    await ExpoSecureStore.setItemAsync(
      KEYS.BIOMETRIC_VAULT_KEY,
      vaultKeySerialized,
      { requireAuthentication: true },
    );
  },
  deleteBiometricVaultKey: async () => {
    await ExpoSecureStore.deleteItemAsync(KEYS.BIOMETRIC_VAULT_KEY, {
      requireAuthentication: true,
    });
  },
};
