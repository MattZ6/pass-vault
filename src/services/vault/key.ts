import { AESEncryptionKey, AESKeySize } from "expo-crypto";

import { VaultRepository } from "@/repositories/vault.repository";

type VaultKey = {
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
};
