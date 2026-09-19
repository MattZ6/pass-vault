import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialUsernameSchemaType } from "@/screens/edit-username/hooks/schema";

import { useSubmitCredentialUsernameForm } from "@/screens/edit-username/hooks/use-submit-credential-username-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { styles } = useStyles(getStyles);
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
