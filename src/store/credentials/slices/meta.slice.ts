import type { StateCreator } from "zustand";

export type CredentialMeta = {
  id: string;
  username: string;
  website?: string;
  provider: string;
  notes?: string;
  updatedAt?: Date;
};

export type AddCredentialMetaInput = CredentialMeta;
export type UpdateCredentialMetaInput = CredentialMeta;
export type GetCredentialMetaInput = Pick<CredentialMeta, "id">;
export type RemoveCredentialMetaInput = Pick<CredentialMeta, "id">;

export type CredentialsMetaSlice = {
  credentialsMeta: CredentialMeta[];
  setupCredentialsMeta: (input: CredentialMeta[]) => void;
  addCredentialMeta: (input: AddCredentialMetaInput) => void;
  updateCredentialMeta: (input: UpdateCredentialMetaInput) => void;
  getCredentialMeta: (input: GetCredentialMetaInput) => CredentialMeta | null;
  removeCredentialMeta: (input: RemoveCredentialMetaInput) => void;
};

export const createCredentialsMetaSlice: StateCreator<
  CredentialsMetaSlice,
  [],
  [],
  CredentialsMetaSlice
> = (set, get) => ({
  credentialsMeta: [],

  setupCredentialsMeta(input) {
    set({ credentialsMeta: input });
  },

  addCredentialMeta(input) {
    const { id, provider, website, username, notes, updatedAt } = input;

    const newCredentialMeta: CredentialMeta = {
      id,
      provider,
      website,
      username,
      notes,
      updatedAt,
    };

    const credentialsMeta = get().credentialsMeta;

    const updatedCredentialsMeta = [...credentialsMeta, newCredentialMeta];

    set({ credentialsMeta: updatedCredentialsMeta });
  },

  updateCredentialMeta(input) {
    const { id, provider, website, username, notes, updatedAt } = input;

    const updatedCredentialMeta: CredentialMeta = {
      id,
      provider,
      website,
      username,
      notes,
      updatedAt,
    };

    const credentialsMeta = get().credentialsMeta;

    const updatedCredentialsMeta = credentialsMeta.map((credential) =>
      credential.id === updatedCredentialMeta.id
        ? updatedCredentialMeta
        : credential,
    );

    set({ credentialsMeta: updatedCredentialsMeta });
  },

  getCredentialMeta(input) {
    const credentialsMeta = get().credentialsMeta;

    const credential = credentialsMeta.find(
      (credential) => credential.id === input.id,
    );

    return credential ?? null;
  },

  removeCredentialMeta(input) {
    const credentialsMeta = get().credentialsMeta;

    const updatedCredentialsMetaList = credentialsMeta.filter(
      (credential) => credential.id !== input.id,
    );

    set({ credentialsMeta: updatedCredentialsMetaList });
  },
});
