import type { StateCreator } from "zustand";

export type CredentialsStorageSlice = {
  sizeInBytes: number;
  updatedAt: Date | null;
  setStorageSizeInBytes: (sizeInBytes: number) => void;
  setLastUpdateDate: (updatedAt: Date) => void;
};

export const createCredentialsStorageSlice: StateCreator<
  CredentialsStorageSlice,
  [],
  [],
  CredentialsStorageSlice
> = (set) => ({
  sizeInBytes: 0,
  updatedAt: null,

  setStorageSizeInBytes(sizeInBytes) {
    set({ sizeInBytes });
  },

  setLastUpdateDate(updatedAt) {
    set({ updatedAt });
  },
});
