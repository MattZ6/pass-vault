import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import {
  IncorrectMasterPasswordError,
  MasterPasswordService,
} from "@/services/vault/master-password";

import type { ChangeMasterPasswordSchemaType } from "./schema";

export function useSubmitChangeMasterPasswordForm() {
  const router = useRouter();
  const form = useFormContext<ChangeMasterPasswordSchemaType>();

  const onSubmit = useCallback(
    async (values: ChangeMasterPasswordSchemaType) => {
      try {
        await MasterPasswordService.changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        router.back();
      } catch (error) {
        if (error instanceof IncorrectMasterPasswordError) {
          form.setError("currentPassword", { type: "manual" });
        } else {
          console.log(error); // TODO: tratar aqui o erro
          form.setError("root", { type: "manual" });
        }
      }
    },
    [router.back, form.setError],
  );

  const submit = useCallback(() => {
    form.clearErrors("root");

    const fn = form.handleSubmit(onSubmit);
    return fn();
  }, [form.handleSubmit, form.clearErrors, onSubmit]);

  return { submit };
}
