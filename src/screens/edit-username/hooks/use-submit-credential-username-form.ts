import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { VaultService } from "@/services/vault/credentials";

import type { EditCredentialUsernameSchemaType } from "./schema";

import type { EditWorkoutExerciseFormType } from "./use-edit-credential-username-form";

type OnSubmitInput = EditWorkoutExerciseFormType & {
  credentialId: string;
};

type SubmitInput = {
  credentialId: string;
};

export function useSubmitCredentialUsernameForm() {
  const router = useRouter();
  const form = useFormContext<EditCredentialUsernameSchemaType>();

  const onSubmit = useCallback(
    async (input: OnSubmitInput) => {
      await VaultService.updateCredentialEmail({
        credentialId: input.credentialId,
        username: input.username,
      });

      router.back();
    },
    [router.back],
  );

  const submit = useCallback(
    (input: SubmitInput) => {
      const fn = form.handleSubmit((values) =>
        onSubmit({
          username: values.username,
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
