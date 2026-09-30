import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { EditCredentialPasswordSchemaType } from "@/screens/edit-password/hooks/schema";
import { useSubmitCredentialPasswordForm } from "@/screens/edit-password/hooks/use-submit-credential-password-form";

type Props = {
  credentialId: string;
};

export function ScreenHeader({ credentialId }: Props) {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialPasswordSchemaType>();
  const { submit } = useSubmitCredentialPasswordForm();
  const { t } = useTranslation("edit-password", { keyPrefix: "meta" });
  const { t: tActions } = useTranslation("edit-password", {
    keyPrefix: "screen.form.actions",
  });

  const handleSubmit = useCallback(() => {
    performTapFeedback();
    submit({ credentialId });
  }, [performTapFeedback, submit, credentialId]);

  return (
    <SheetHeader.Root>
      <SheetHeader.BackButton />
      <SheetHeader.Title>{t("title")}</SheetHeader.Title>
      <SheetHeader.RightActions>
        <SheetHeader.RightActions.TextButton
          label={tActions("submit.label")}
          disabled={!form.formState.isValid}
          onPress={handleSubmit}
        />
      </SheetHeader.RightActions>
    </SheetHeader.Root>
  );
}
