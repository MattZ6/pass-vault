import { use } from "react";

import { FieldContext } from "../contexts/field";

export function useFieldContext() {
  const context = use(FieldContext);

  if (!context) {
    throw new Error("Field components must be used inside Field.Root");
  }

  return context;
}
