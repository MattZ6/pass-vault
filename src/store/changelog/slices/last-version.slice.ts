import type { StateCreator } from "zustand";

export type LastVersionSlice = {
  hasUnreadVersion: boolean;
  setHasUnreadVersion: (value: boolean) => void;
};

export const lastVersionSlice: StateCreator<
  LastVersionSlice,
  [],
  [],
  LastVersionSlice
> = (set) => ({
  hasUnreadVersion: false,
  setHasUnreadVersion: (value) => set({ hasUnreadVersion: value }),
});
