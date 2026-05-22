import type { StateCreator } from "zustand";

export type CredentialMeta = {
  id: string;
  username: string;
  provider: string;
};

export type AddCredentialMetaInput = CredentialMeta;
export type GetCredentialMetaInput = Pick<CredentialMeta, "id">;

export type CredentialsMetaSlice = {
  credentialsMeta: CredentialMeta[];
  addCredentialMeta: (input: AddCredentialMetaInput) => void;
  getCredentialMeta: (input: GetCredentialMetaInput) => CredentialMeta | null;
};

export const createCredentialsMetaSlice: StateCreator<
  CredentialsMetaSlice,
  [],
  [],
  CredentialsMetaSlice
> = (set, get) => ({
  credentialsMeta: [],

  addCredentialMeta(input) {
    const { username, provider } = input;
    const id = Date.now().toString();

    const newCredentialMeta: CredentialMeta = {
      id,
      username,
      provider,
    };

    const credentialsMeta = get().credentialsMeta;

    const updatedCredentialsMeta = [...credentialsMeta, newCredentialMeta];

    set({ credentialsMeta: updatedCredentialsMeta });
  },

  getCredentialMeta(input) {
    const credentialsMeta = get().credentialsMeta;

    const credential = credentialsMeta.find(
      (credential) => credential.id === input.id,
    );

    return credential ?? null;
  },
});
