import { use } from "react";

import { PreferencesContext } from "@/contexts/preferences";

export function usePreferences() {
  const context = use(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}
