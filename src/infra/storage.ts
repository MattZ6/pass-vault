import { type Configuration, createMMKV, type MMKV } from "react-native-mmkv";

import { VaultKeyService } from "@/services/vault/key";

const storageInstances = new Map<string, Promise<MMKV>>();

type GetStorageInput = Pick<Configuration, "id" | "compareBeforeSet">;

async function createEncryptedStorage(configuration: GetStorageInput) {
  const { serialized } = await VaultKeyService.getVaultKey();

  const encryptionKey = serialized.slice(0, 32);

  return createMMKV({
    ...configuration,
    encryptionType: "AES-256",
    encryptionKey,
  });
}

export function getEncryptedStorage(configuration: GetStorageInput) {
  const cached = storageInstances.get(configuration.id);

  if (cached) {
    return cached;
  }

  // Cache the in-flight promise itself, not just its resolved value:
  // loadCredentialsIntoStore() reads meta size/contents through
  // Promise.all, which calls this twice for the same id before either
  // call's first await resolves. Caching only the resolved MMKV instance
  // left both calls racing past the "not cached yet" check and each
  // constructing (and registering) their own native MMKV instance for
  // the same id.
  const storagePromise = createEncryptedStorage(configuration);

  storageInstances.set(configuration.id, storagePromise);

  return storagePromise;
}
