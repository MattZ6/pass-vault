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
  website?: string;
  username: string;
  notes?: string;
};

type SaveMetadataInput = {
  id: string;
  provider: string;
  website?: string;
  username: string;
  notes?: string;
};

type DeleteMetadataInput = {
  id: string;
};

type StoredCredentialMeta = {
  provider: string;
  /** @deprecated Use `provider` instead. */
  app?: string;
  website?: string;
  username: string;
  notes?: string;
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

      const parsedObject = JSON.parse(storedCredential) as StoredCredentialMeta;

      return {
        id: key,
        provider: parsedObject.provider ?? parsedObject.app,
        website: parsedObject.website,
        username: parsedObject.username,
        notes: parsedObject.notes,
      };
    });
  },
  saveMetadata: async (input: SaveMetadataInput) => {
    const storage = await getStorage();

    storage.set(
      input.id,
      JSON.stringify({
        provider: input.provider,
        website: input.website,
        username: input.username,
        notes: input.notes,
      }),
    );
  },
  deleteMetadata: async (input: DeleteMetadataInput) => {
    const storage = await getStorage();

    storage.remove(input.id);
  },
};
