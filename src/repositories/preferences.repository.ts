import { createMMKV } from "react-native-mmkv";

import type { ThemeOptions } from "@/styles/themes/types";

const storage = createMMKV({
  id: "preferences",
  compareBeforeSet: true,
});

const KEYS = {
  theme: "theme",
  language: "language",
  haptics: "haptics",
};

export const PreferencesRepository = {
  getTheme: () => {
    const storedTheme = storage.getString(KEYS.theme);
    return (storedTheme ?? null) as ThemeOptions | null;
  },
  saveTheme: (theme: ThemeOptions) => {
    storage.set(KEYS.theme, theme);
  },
  getLanguage: () => {
    const storedLanguage = storage.getString(KEYS.language);
    return (storedLanguage ?? null) as string | null;
  },
  saveLanguage: (language: string) => {
    storage.set(KEYS.language, language);
  },
  getHaptics: () => {
    const storedHaptics = storage.getBoolean(KEYS.haptics);
    return storedHaptics ?? null;
  },
  saveHaptics: (haptics: boolean) => {
    storage.set(KEYS.haptics, haptics);
  },
};
