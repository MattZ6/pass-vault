import { create } from "zustand";

import {
  type CredentialsMetaSlice,
  createCredentialsMetaSlice,
} from "./slices/meta.slice";
import {
  type CredentialsStorageSlice,
  createCredentialsStorageSlice,
} from "./slices/storage.slice";

type VaultStore = CredentialsMetaSlice & CredentialsStorageSlice;

export const useVaultStore = create<VaultStore>()((...a) => ({
  ...createCredentialsMetaSlice(...a),
  ...createCredentialsStorageSlice(...a),
}));
