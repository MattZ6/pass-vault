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
  updatedAt?: Date;
};

type SaveMetadataInput = {
  id: string;
  provider: string;
  website?: string;
  username: string;
  notes?: string;
  updatedAt?: Date;
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
  updatedAt?: string;
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
        updatedAt: parsedObject.updatedAt
          ? new Date(parsedObject.updatedAt)
          : undefined,
      };
    });
  },
  saveMetadata: async (input: SaveMetadataInput) => {
    const storage = await getStorage();

    const credentialToStore: StoredCredentialMeta = {
      provider: input.provider,
      website: input.website,
      username: input.username,
      notes: input.notes,
      updatedAt: input.updatedAt?.toJSON(),
    };

    storage.set(input.id, JSON.stringify(credentialToStore));
  },
  deleteMetadata: async (input: DeleteMetadataInput) => {
    const storage = await getStorage();

    storage.remove(input.id);
  },
};
