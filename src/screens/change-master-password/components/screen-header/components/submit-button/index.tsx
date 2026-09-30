import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

import type { ChangeMasterPasswordSchemaType } from "@/screens/change-master-password/hooks/schema";
import { useSubmitChangeMasterPasswordForm } from "@/screens/change-master-password/hooks/use-submit-change-master-password-form";

export function SubmitButton() {
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<ChangeMasterPasswordSchemaType>();
  const { submit } = useSubmitChangeMasterPasswordForm();
  const { t } = useTranslation("change-master-password", {
    keyPrefix: "screen.form.actions",
  });

  const handleSubmit = useCallback(() => {
    performTapFeedback();
    submit();
  }, [performTapFeedback, submit]);

  const disabled = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <SheetHeader.RightActions.TextButton
      label={t("submit.label")}
      disabled={disabled}
      onPress={handleSubmit}
    />
  );
}
