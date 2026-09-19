import { AESEncryptionKey, AESKeySize } from "expo-crypto";

import { VaultRepository } from "@/repositories/vault.repository";

export type VaultKey = {
  key: AESEncryptionKey;
  serialized: string;
};

let cachedVaultKey: VaultKey | null = null;

export const VaultKeyService = {
  getVaultKey: async () => {
    if (cachedVaultKey) {
      return cachedVaultKey;
    }

    const storedKey = await VaultRepository.getKey();

    if (storedKey) {
      const key = await AESEncryptionKey.import(storedKey, "base64");

      cachedVaultKey = {
        key,
        serialized: storedKey,
      };

      return cachedVaultKey;
    }

    const key = await AESEncryptionKey.generate(AESKeySize.AES256);

    const serialized = await key.encoded("base64");

    await VaultRepository.saveKey({
      encryptedKey: serialized,
    });

    cachedVaultKey = {
      key,
      serialized,
    };

    return cachedVaultKey;
  },

  // Used once a key has been established through MasterPasswordService
  // (setup/unlock), so the rest of the app keeps reading it from here
  // without knowing how it was obtained.
  setVaultKey: (vaultKey: VaultKey) => {
    cachedVaultKey = vaultKey;
  },

  // Drops the in-memory key when the app re-locks, so a locked app doesn't
  // keep it sitting in memory. getVaultKey() falls back to re-reading (or,
  // pre-master-password, generating) the raw key from SecureStore, so this
  // never leaves the app unable to decrypt anything.
  clearVaultKey: () => {
    cachedVaultKey = null;
  },
};
