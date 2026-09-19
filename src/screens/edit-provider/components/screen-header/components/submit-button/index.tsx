import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialProviderSchemaType } from "@/screens/edit-provider/hooks/schema";
import { useSubmitCredentialProviderForm } from "@/screens/edit-provider/hooks/use-submit-credential-provider-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { styles } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialProviderSchemaType>();
  const { submit } = useSubmitCredentialProviderForm();
  const { t } = useTranslation("edit-provider", {
    keyPrefix: "screen.form.actions",
  });

  const handleSubmit = useCallback(() => {
    performTapFeedback();
    submit({ credentialId });
  }, [performTapFeedback, submit, credentialId]);

  return (
    <View style={styles.wrapper}>
      <Button disabled={!form.formState.isValid} onPress={handleSubmit}>
        <View style={styles.content}>
          <Text
            weight="medium"
            style={[
              styles.text,
              !form.formState.isValid && styles.textDisabled,
            ]}
          >
            {t("submit.label")}
          </Text>
        </View>
      </Button>
    </View>
  );
}
