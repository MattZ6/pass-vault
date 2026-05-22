import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { VaultService } from "@/services/vault/credentials";

import {
  type FormOutput,
  useNewCredentialForm,
} from "./hooks/use-new-credential-form";

import { getStyles } from "./styles";

export function NewCredentialForm() {
  const router = useRouter();
  const { t } = useTranslation("new-credential", { keyPrefix: "screen.form" });
  const { notifySuccess, notifyFailure, performTapFeedback } = useHaptics();
  const { styles, theme } = useStyles(getStyles);
  const { control, handleSubmit, formState } = useNewCredentialForm();

  const isSubmitting = formState.isValid && formState.isSubmitting;

  const onSubmit = useCallback(
    async (input: FormOutput) => {
      await VaultService.createCredential({
        provider: input.provider,
        username: input.username,
        password: input.password,
      });

      notifySuccess();
      router.back();
    },
    [notifySuccess, router.back],
  );

  const handleSubmitPress = useCallback(() => {
    performTapFeedback();
    handleSubmit(onSubmit, notifyFailure)();
  }, [handleSubmit, notifyFailure, onSubmit, performTapFeedback]);

  return (
    <View style={styles.form}>
      <View style={styles.fields}>
        <Field.Root invalid={!!formState.errors.provider?.type}>
          <Field.Label>{t("fields.provider.label")}</Field.Label>
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <Field.TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                keyboardType="default"
                returnKeyType="next"
              />
            )}
          />
          <Field.Error>
            {formState.errors.provider?.type && (
              <Field.Error.Text>
                {t(
                  `fields.provider.validations.${formState.errors.provider.type}`,
                )}
              </Field.Error.Text>
            )}
          </Field.Error>
        </Field.Root>

        <Field.Root invalid={!!formState.errors.username?.type}>
          <Field.Label>{t("fields.username.label")}</Field.Label>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Field.TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                keyboardType="email-address"
                returnKeyType="next"
              />
            )}
          />
          <Field.Error>
            {formState.errors.username?.type && (
              <Field.Error.Text>
                {t(
                  `fields.username.validations.${formState.errors.username.type}`,
                )}
              </Field.Error.Text>
            )}
          </Field.Error>
        </Field.Root>

        <Field.Root invalid={!!formState.errors.password?.type}>
          <Field.Label>{t("fields.password.label")}</Field.Label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Field.TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                returnKeyType="send"
                secureTextEntry
              />
            )}
          />
          <Field.Error>
            {formState.errors.password?.type && (
              <Field.Error.Text>
                {t(
                  `fields.password.validations.${formState.errors.password.type}`,
                )}
              </Field.Error.Text>
            )}
          </Field.Error>
        </Field.Root>
      </View>

      <View style={styles.buttonWrapper}>
        <Button onPress={handleSubmitPress} disabled={isSubmitting}>
          <View style={styles.buttonContent}>
            {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.surface.base}
              />
            ) : (
              <Text weight="medium" typography="body" style={styles.buttonText}>
                {t("actions.save.label")}
              </Text>
            )}
          </View>
        </Button>
      </View>
    </View>
  );
}
