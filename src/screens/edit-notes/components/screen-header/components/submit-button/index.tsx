import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialNotesSchemaType } from "@/screens/edit-notes/hooks/schema";

import { useSubmitCredentialNotesForm } from "@/screens/edit-notes/hooks/use-submit-credential-notes-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function SubmitButton({ credentialId }: Props) {
  const { styles } = useStyles(getStyles);
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
