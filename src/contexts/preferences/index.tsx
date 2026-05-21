import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { PreferencesRepository } from "@/repositories/preferences.repository";

import type {
  PreferencesContextTypes,
  PreferencesProviderTypes,
} from "./types";

export const PreferencesContext = createContext(
  {} as PreferencesContextTypes.Context,
);

export function PreferencesProvider({
  children,
  defaultHapticsEnabled,
}: PreferencesProviderTypes.Props) {
  const [isHapticsEnabled, setIsHapticsEnabled] = useState(() => {
    const storedHapticsEnabled = PreferencesRepository.getHaptics();
    return storedHapticsEnabled ?? defaultHapticsEnabled;
  });

  const toggleHaptics = useCallback(
    () => setIsHapticsEnabled((prev) => !prev),
    [],
  );

  useEffect(
    () => PreferencesRepository.saveHaptics(isHapticsEnabled),
    [isHapticsEnabled],
  );

  const contextValue = useMemo<PreferencesContextTypes.Context>(
    () => ({
      hapticsEnabled: isHapticsEnabled,
      toggleHaptics,
    }),
    [isHapticsEnabled, toggleHaptics],
  );

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
    </PreferencesContext.Provider>
  );
}
