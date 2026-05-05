import { createContext, useCallback, useMemo, useState } from "react";

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
    return defaultHapticsEnabled;
  });

  const toggleHaptics = useCallback(
    () => setIsHapticsEnabled((prev) => !prev),
    [],
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
