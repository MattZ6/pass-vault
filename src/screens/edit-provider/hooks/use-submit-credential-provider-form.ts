import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { VaultService } from "@/services/vault/credentials";

import type { EditCredentialProviderSchemaType } from "./schema";

type OnSubmitInput = EditCredentialProviderSchemaType & {
  credentialId: string;
};

type SubmitInput = {
  credentialId: string;
};

export function useSubmitCredentialProviderForm() {
  const router = useRouter();
  const form = useFormContext<EditCredentialProviderSchemaType>();

  const onSubmit = useCallback(
    async (input: OnSubmitInput) => {
      await VaultService.updateCredentialProvider({
        credentialId: input.credentialId,
        provider: input.provider,
      });

      router.back();
    },
    [router.back],
  );

  const submit = useCallback(
    (input: SubmitInput) => {
      const fn = form.handleSubmit((values) =>
        onSubmit({
          provider: values.provider,
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
