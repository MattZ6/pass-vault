import { getEncryptedStorage } from "@/infra/storage";

function getStorage() {
  return getEncryptedStorage({
    id: "credentials:meta",
    compareBeforeSet: true,
  });
}

type CredentialMeta = {
  id: string;
  provider: string;
  username: string;
};

type SaveMetadataInput = {
  id: string;
  provider: string;
  username: string;
};

type DeleteMetadataInput = {
  id: string;
};

export const CredentialsMetaRepository = {
  getAllMetadata: async () => {
    const storage = await getStorage();

    const keys = storage.getAllKeys();

    return keys.map<CredentialMeta>((key) => {
      const storedCredential = storage.getString(key);

      if (!storedCredential) {
        return { id: key, provider: "?", username: "?" };
      }

      const parsedObject = JSON.parse(storedCredential);

      return {
        id: key,
        provider: parsedObject.provider ?? parsedObject.app,
        username: parsedObject.username,
      };
    });
  },
  saveMetadata: async (input: SaveMetadataInput) => {
    const storage = await getStorage();

    storage.set(
      input.id,
      JSON.stringify({
        provider: input.provider,
        username: input.username,
      }),
    );
  },
  deleteMetadata: async (input: DeleteMetadataInput) => {
    const storage = await getStorage();

    storage.remove(input.id);
  },
};
