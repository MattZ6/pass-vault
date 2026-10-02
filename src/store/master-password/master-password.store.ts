import { create } from "zustand";

type MasterPasswordStore = {
  // null while the initial MasterPasswordRepository check is in flight.
  hasMasterPassword: boolean | null;
  setHasMasterPassword: (hasMasterPassword: boolean) => void;
};

export const useMasterPasswordStore = create<MasterPasswordStore>((set) => ({
  hasMasterPassword: null,
  setHasMasterPassword: (hasMasterPassword) => set({ hasMasterPassword }),
}));
