import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { EditCredentialNotesSchemaType } from "@/screens/edit-notes/hooks/schema";

import { useSubmitCredentialNotesForm } from "@/screens/edit-notes/hooks/use-submit-credential-notes-form";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialNotesSchemaType>();
  const { submit } = useSubmitCredentialNotesForm();
  const { t } = useTranslation("edit-notes", {
    keyPrefix: "screen.form.actions",
  });

  const handleSubmit = useCallback(() => {
    performTapFeedback();
    submit({ credentialId });
  }, [performTapFeedback, submit, credentialId]);

  return (
    <SheetHeader.RightActions.TextButton
      label={t("submit.label")}
      disabled={!form.formState.isValid}
      onPress={handleSubmit}
    />
  );
}
