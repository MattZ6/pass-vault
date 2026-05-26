import { createContext, useCallback, useMemo, useState } from "react";

import { Dialog } from "@/components/ui/dialog";

import type {
  ConfirmDialogContextTypes as ContextTypes,
  ConfirmDialogProviderTypes as ProviderTypes,
} from "./types";

const ConfirmContext = createContext({} as ContextTypes.Context);

function ConfirmProvider({ children }: ProviderTypes.Props) {
  const [dialogState, setDialogState] =
    useState<ContextTypes.DialogState | null>(null);

  const confirm = useCallback((options: ContextTypes.Options) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        options,
        resolve,
      });
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (!dialogState) {
      return;
    }

    dialogState.resolve(false);

    setDialogState(null);
  }, [dialogState]);

  const handleConfirm = useCallback(() => {
    if (!dialogState) {
      return;
    }

    dialogState.resolve(true);

    setDialogState(null);
  }, [dialogState]);

  const contextValues = useMemo<ContextTypes.Context>(
    () => ({ confirm }),
    [confirm],
  );

  return (
    <ConfirmContext.Provider value={contextValues}>
      {children}
      <Dialog
        isOpen={!!dialogState}
        title={dialogState?.options.title ?? ""}
        description={dialogState?.options.description}
        cancelLabel={dialogState?.options.cancelLabel ?? ""}
        onCancel={handleCancel}
        confirmLabel={dialogState?.options.confirmLabel ?? ""}
        onConfirm={handleConfirm}
        destructive={dialogState?.options.destructive}
      />
    </ConfirmContext.Provider>
  );
}

export { ConfirmContext, ConfirmProvider };
