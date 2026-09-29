import { type Configuration, createMMKV, type MMKV } from "react-native-mmkv";

import { VaultKeyService } from "@/services/vault/key";

const storageInstances = new Map<string, Promise<MMKV>>();

type GetStorageInput = Pick<Configuration, "id" | "compareBeforeSet">;

async function createEncryptedStorage(configuration: GetStorageInput) {
  const { serialized } = await VaultKeyService.getVaultKey();

  // AES-128 (not AES-256) is this library's own default
  // (`config.encryptionType.value_or(EncryptionType::AES_128)` in its
  // HybridMMKV.cpp) — the better-trodden path in a native module this
  // new. `encryptionKey` must be at most 16 bytes for AES-128. Every
  // base64 character is a single ASCII byte, so slicing to 16 characters
  // is exactly 16 bytes once it crosses the JSI bridge (which encodes
  // strings as UTF-8), with no risk of the encoding inflating it.
  const encryptionKey = serialized.slice(0, 16);

  return createMMKV({
    ...configuration,
    encryptionType: "AES-128",
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
