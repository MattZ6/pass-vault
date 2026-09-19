import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { VaultService } from "@/services/vault/credentials";

import type { EditCredentialPasswordSchemaType } from "./schema";

type OnSubmitInput = EditCredentialPasswordSchemaType & {
  credentialId: string;
};

type SubmitInput = {
  credentialId: string;
};

export function useSubmitCredentialPasswordForm() {
  const router = useRouter();
  const form = useFormContext<EditCredentialPasswordSchemaType>();

  const onSubmit = useCallback(
    async (input: OnSubmitInput) => {
      await VaultService.updateCredentialPassword({
        credentialId: input.credentialId,
        password: input.password,
      });

      router.back();
    },
    [router.back],
  );

  const submit = useCallback(
    (input: SubmitInput) => {
      const fn = form.handleSubmit((values) =>
        onSubmit({
          password: values.password,
          credentialId: input.credentialId,
        }),
      );

      return fn();
    },
    [form.handleSubmit, onSubmit],
  );

  return {
    submit,
  };
}
