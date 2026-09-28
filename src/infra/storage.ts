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

  // MMKV rejects an AES-256 `encryptionKey` longer than 32 bytes.
  // `serialized` is the vault key base64-encoded, which is 44 characters
  // (base64 always expands 3 raw bytes into 4 text characters) — well
  // past that limit. Every base64 character is a single ASCII byte, so
  // slicing to 32 characters is exactly 32 bytes once it crosses the JSI
  // bridge (which encodes strings as UTF-8), with no risk of the encoding
  // inflating it further.
  const encryptionKey = serialized.slice(0, 32);

  const storage = createMMKV({
    ...configuration,
    encryptionType: "AES-256",
    encryptionKey,
  });

  storageInstances.set(configuration.id, storage);

  return storage;
}
