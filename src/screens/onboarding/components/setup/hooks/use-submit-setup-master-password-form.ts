import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { VaultKey } from "@/services/vault/key";
import { MasterPasswordService } from "@/services/vault/master-password";

import type { SetupMasterPasswordSchemaType } from "./schema";

type Input = {
  onSetupComplete: (vaultKey: VaultKey) => void;
};

export function useSubmitSetupMasterPasswordForm({ onSetupComplete }: Input) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const form = useFormContext<SetupMasterPasswordSchemaType>();

  const onSubmit = useCallback(
    async (values: SetupMasterPasswordSchemaType) => {
      setHasFailed(false);
      setIsSubmitting(true);

      try {
        const vaultKey = await MasterPasswordService.setup({
          password: values.password,
        });

        onSetupComplete(vaultKey);
      } catch (error) {
        console.log(error); // TODO: tratar aqui o erro
        setHasFailed(true);
        setIsSubmitting(false);
      }
    },
    [onSetupComplete],
  );

  const submit = useCallback(() => {
    const fn = form.handleSubmit(onSubmit);
    return fn();
  }, [form.handleSubmit, onSubmit]);

  return { submit, isSubmitting, hasFailed };
}
