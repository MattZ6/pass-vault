import { getEncryptedStorage } from "@/infra/storage";

import { BinaryUtils } from "@/utils/binary";

function getStorage() {
  return getEncryptedStorage({
    id: "credentials:secret",
    compareBeforeSet: true,
  });
}

type SaveSecretInput = {
  id: string;
  encryptedBytes: Uint8Array;
};

type getSecretOutput = {
  id: string;
};

export const CredentialsSecretRepository = {
  saveSecret: async (input: SaveSecretInput) => {
    const storage = await getStorage();

    storage.set(input.id, BinaryUtils.toArrayBuffer(input.encryptedBytes));
  },
  getSecret: async (input: getSecretOutput) => {
    const storage = await getStorage();

    return storage.getBuffer(input.id);
  },
};
