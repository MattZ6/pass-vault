import { mock } from "bun:test";

import type { MasterPasswordRecord } from "@/repositories/master-password.repository";

// In-memory stand-ins for the SecureStore-backed repositories, so vault
// service tests don't need a device. State lives at module scope (shared
// across the mocked module's calls, same as the real SecureStore would
// behave) — call resetRepositoryMocks() between tests to clear it.

let masterPasswordRecord: MasterPasswordRecord | null = null;
let biometricVaultKey: string | null = null;
let vaultKeyEncrypted: string | null = null;

export function installRepositoryMocks() {
  mock.module("@/repositories/master-password.repository", () => ({
    MasterPasswordRepository: {
      getRecord: async () => masterPasswordRecord,
      saveRecord: async (record: MasterPasswordRecord) => {
        masterPasswordRecord = record;
      },
      getBiometricVaultKey: async () => biometricVaultKey,
      saveBiometricVaultKey: async (vaultKeySerialized: string) => {
        biometricVaultKey = vaultKeySerialized;
      },
      deleteBiometricVaultKey: async () => {
        biometricVaultKey = null;
      },
    },
  }));

  mock.module("@/repositories/vault.repository", () => ({
    VaultRepository: {
      getKey: async () => vaultKeyEncrypted,
      saveKey: async ({ encryptedKey }: { encryptedKey: string }) => {
        vaultKeyEncrypted = encryptedKey;
      },
    },
  }));
}

export function resetRepositoryMocks() {
  masterPasswordRecord = null;
  biometricVaultKey = null;
  vaultKeyEncrypted = null;
}
