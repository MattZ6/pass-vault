import { createContext, useMemo, useState } from "react";

import type { FieldContextTypes, FieldProviderTypes } from "./types";

export const FieldContext = createContext({} as FieldContextTypes.Context);

export function FieldProvider({ invalid, ...props }: FieldProviderTypes.Props) {
  const [focused, setFocused] = useState(false);

  const contextValues = useMemo(
    () => ({
      focused,
      invalid: !!invalid,
      setFocused,
    }),
    [focused, invalid],
  );

  return <FieldContext.Provider {...props} value={contextValues} />;
}
