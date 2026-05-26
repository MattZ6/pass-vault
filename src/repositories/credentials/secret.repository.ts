import { getEncryptedStorage } from "@/infra/storage";

function getStorage() {
  return getEncryptedStorage({
    id: "credentials:secret",
    compareBeforeSet: true,
  });
}

type SaveSecretInput = {
  id: string;
  encryptedBytes: ArrayBuffer;
};

type GetSecretInput = {
  id: string;
};

type DeleteSecretInput = {
  id: string;
};

export const CredentialsSecretRepository = {
  saveSecret: async (input: SaveSecretInput) => {
    const storage = await getStorage();

    storage.set(input.id, input.encryptedBytes);
  },
  getSecret: async (input: GetSecretInput) => {
    const storage = await getStorage();

    return storage.getBuffer(input.id);
  },
  deleteSecret: async (input: DeleteSecretInput) => {
    const storage = await getStorage();

    storage.remove(input.id);
  },
};
