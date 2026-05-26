import { use } from "react";

import { ConfirmContext } from "@/contexts/confirm";

export function useConfirm() {
  const context = use(ConfirmContext);

  if (!context) {
    throw new Error("useTheme must be used within ConfirmProvider");
  }

  return context;
}
