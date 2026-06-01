import { create } from "zustand";

import {
  type LastVersionSlice,
  lastVersionSlice,
} from "./slices/last-version.slice";

type ChangelogStore = LastVersionSlice;

export const useChangelogStore = create<ChangelogStore>()((...a) => ({
  ...lastVersionSlice(...a),
}));
