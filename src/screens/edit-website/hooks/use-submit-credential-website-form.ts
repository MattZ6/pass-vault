import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { VaultService } from "@/services/vault/credentials";

import type { EditCredentialWebsiteSchemaType } from "./schema";

type OnSubmitInput = EditCredentialWebsiteSchemaType & {
  credentialId: string;
};

type SubmitInput = {
  credentialId: string;
};

export function useSubmitCredentialWebsiteForm() {
  const router = useRouter();
  const form = useFormContext<EditCredentialWebsiteSchemaType>();

  const onSubmit = useCallback(
    async (input: OnSubmitInput) => {
      await VaultService.updateCredentialWebsite({
        credentialId: input.credentialId,
        website: input.website,
      });

      router.back();
    },
    [router.back],
  );

  const submit = useCallback(
    (input: SubmitInput) => {
      const fn = form.handleSubmit((values) =>
        onSubmit({
          website: values.website,
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
