import type { ReactNode } from "react";

export namespace PreferencesContextTypes {
  export type Context = {
    hapticsEnabled: boolean;
    toggleHaptics: () => void;
  };
}

export namespace PreferencesProviderTypes {
  export type Props = {
    defaultHapticsEnabled: boolean;
    children: ReactNode;
  };
}
