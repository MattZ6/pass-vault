import { type Configuration, createMMKV, type MMKV } from "react-native-mmkv";

import { VaultKeyService } from "@/services/vault/key";

const storageInstances = new Map<string, MMKV>();

type GetStorageInput = Pick<Configuration, "id" | "compareBeforeSet">;

export async function getEncryptedStorage(configuration: GetStorageInput) {
  const cached = storageInstances.get(configuration.id);

  if (cached) {
    return cached;
  }

  const { serialized } = await VaultKeyService.getVaultKey();

  const storage = createMMKV({
    ...configuration,
    encryptionType: "AES-256",
    encryptionKey: serialized,
  });

  storageInstances.set(configuration.id, storage);

  return storage;
}
