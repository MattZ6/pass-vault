import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { ChangeMasterPasswordSchemaType } from "@/screens/change-master-password/hooks/schema";
import { useSubmitChangeMasterPasswordForm } from "@/screens/change-master-password/hooks/use-submit-change-master-password-form";

import { getStyles } from "./styles";

export function SubmitButton() {
  const { styles } = useStyles(getStyles);
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
    <View style={styles.wrapper}>
      <Button disabled={disabled} onPress={handleSubmit}>
        <View style={styles.content}>
          <Text
            weight="medium"
            style={[styles.text, disabled && styles.textDisabled]}
          >
            {t("submit.label")}
          </Text>
        </View>
      </Button>
    </View>
  );
}
