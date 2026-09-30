import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { EditCredentialWebsiteSchemaType } from "@/screens/edit-website/hooks/schema";
import { useSubmitCredentialWebsiteForm } from "@/screens/edit-website/hooks/use-submit-credential-website-form";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialWebsiteSchemaType>();
  const { submit } = useSubmitCredentialWebsiteForm();
  const { t } = useTranslation("edit-website", {
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
