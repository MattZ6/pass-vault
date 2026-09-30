import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { EditCredentialUsernameSchemaType } from "@/screens/edit-username/hooks/schema";

import { useSubmitCredentialUsernameForm } from "@/screens/edit-username/hooks/use-submit-credential-username-form";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialUsernameSchemaType>();
  const { submit } = useSubmitCredentialUsernameForm();
  const { t } = useTranslation("edit-username", {
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
