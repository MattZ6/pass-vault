import {
  AESSealedData,
  aesDecryptAsync,
  aesEncryptAsync,
  randomUUID,
} from "expo-crypto";

import { VaultKeyService } from "@/services/vault/key";

type EncryptInput = {
  value: string;
};

type DecryptInput = {
  encryptedBytes: Uint8Array;
};

export const CryptographyService = {
  generateUUID: () => randomUUID(),
  encrypt: async (input: EncryptInput) => {
    const { key } = await VaultKeyService.getVaultKey();

    const plaintextBase64 = btoa(input.value);

    const encryptedData = await aesEncryptAsync(plaintextBase64, key);
    const encryptedBytes = await encryptedData.combined();

    return encryptedBytes;
  },
  decrypt: async (input: DecryptInput) => {
    const { key } = await VaultKeyService.getVaultKey();

    const encryptedData = AESSealedData.fromCombined(input.encryptedBytes);

    const decryptedBase64 = await aesDecryptAsync(encryptedData, key, {
      output: "base64",
    });

    return atob(decryptedBase64);
  },
};
