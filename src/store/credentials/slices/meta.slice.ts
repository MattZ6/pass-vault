import type { StateCreator } from "zustand";

export type CredentialMeta = {
  id: string;
  username: string;
  provider: string;
};

export type AddCredentialMetaInput = Pick<
  CredentialMeta,
  "username" | "provider"
>;

export type CredentialsMetaSlice = {
  credentialsMeta: CredentialMeta[];

  addCredentialMeta: (input: AddCredentialMetaInput) => void;
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
});
