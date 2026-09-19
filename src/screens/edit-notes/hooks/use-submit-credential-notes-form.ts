import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { VaultService } from "@/services/vault/credentials";

import type { EditCredentialNotesSchemaType } from "./schema";

type OnSubmitInput = EditCredentialNotesSchemaType & {
  credentialId: string;
};

type SubmitInput = {
  credentialId: string;
};

export function useSubmitCredentialNotesForm() {
  const router = useRouter();
  const form = useFormContext<EditCredentialNotesSchemaType>();

  const onSubmit = useCallback(
    async (input: OnSubmitInput) => {
      await VaultService.updateCredentialNotes({
        credentialId: input.credentialId,
        notes: input.notes,
      });

      router.back();
    },
    [router.back],
  );

  const submit = useCallback(
    (input: SubmitInput) => {
      const fn = form.handleSubmit((values) =>
        onSubmit({
          notes: values.notes,
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
