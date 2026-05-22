import type { ReactNode } from "react";

export namespace FieldContextTypes {
  export type Context = {
    focused: boolean;
    invalid: boolean;
    setFocused: (value: boolean) => void;
  };
}

export namespace FieldProviderTypes {
  export type Props = {
    children: ReactNode;
    invalid?: boolean;
  };
}
