import { getEncryptedStorage } from "@/infra/storage";

function getStorage() {
  return getEncryptedStorage({
    id: "credentials:meta",
    compareBeforeSet: true,
  });
}

type SaveInput = {
  id: string;
  app: string;
  username: string;
};

export const CredentialsMetaRepository = {
  saveMetadata: async (input: SaveInput) => {
    const storage = await getStorage();

    storage.set(
      input.id,
      JSON.stringify({
        app: input.app,
        username: input.username,
      }),
    );
  },
};
