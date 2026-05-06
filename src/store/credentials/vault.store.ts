import { create } from "zustand";

import {
  type CredentialsMetaSlice,
  createCredentialsMetaSlice,
} from "./slices/meta.slice";

type VaultStore = CredentialsMetaSlice;

export const useVaultStore = create<VaultStore>()((...a) => ({
  ...createCredentialsMetaSlice(...a),
}));
