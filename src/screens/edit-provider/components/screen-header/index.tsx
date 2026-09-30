import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { EditCredentialProviderSchemaType } from "@/screens/edit-provider/hooks/schema";
import { useSubmitCredentialProviderForm } from "@/screens/edit-provider/hooks/use-submit-credential-provider-form";

type Props = {
  credentialId: string;
};

export function ScreenHeader({ credentialId }: Props) {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialProviderSchemaType>();
  const { submit } = useSubmitCredentialProviderForm();
  const { t } = useTranslation("edit-provider", { keyPrefix: "meta" });
  const { t: tActions } = useTranslation("edit-provider", {
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
