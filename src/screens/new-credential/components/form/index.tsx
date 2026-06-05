import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { VaultService } from "@/services/vault/credentials";

import {
  type FormOutput,
  useNewCredentialForm,
} from "./hooks/use-new-credential-form";

import { getStyles } from "./styles";

export function CreateCredentialForm() {
  const { styles, theme } = useStyles(getStyles);
  const router = useRouter();
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const { control, handleSubmit, formState, setFocus } = useNewCredentialForm();
  const { t } = useTranslation("new-credential", { keyPrefix: "screen.form" });

  const isSubmitting = formState.isValid && formState.isSubmitting;

  const onSubmit = useCallback(
    async (input: FormOutput) => {
      await VaultService.createCredential({
        provider: input.provider,
        website: input.website,
        username: input.username,
        password: input.password,
        notes: input.notes,
      });

      notifySuccess();
      router.back();
    },
    [notifySuccess, router.back],
  );

  const handleSubmitPress = useCallback(() => {
    performTapFeedback();
    handleSubmit(onSubmit, notifyFailure)();
  }, [handleSubmit, onSubmit, performTapFeedback, notifyFailure]);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Section.Header>
          <Section.Header.Title>
            {t("sections.provider.label")}
          </Section.Header.Title>
        </Section.Header>

        <Card color="element">
          <Controller
            control={control}
            name="provider"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                placeholder={t("sections.provider.fields.provider.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                enterKeyHint="next"
                onSubmitEditing={() => setFocus("website")}
                cursorColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionColor={
                  fieldState.invalid
                    ? `${theme.colors.content.error.toString()}1F`
                    : `${theme.colors.content.base.toString()}1F`
                }
                style={styles.field}
              />
            )}
          />

          <Section.Divider style={{ marginLeft: theme.spacing[4] }} />

          <Controller
            control={control}
            name="website"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                placeholder={t("sections.provider.fields.website.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                enterKeyHint="next"
                autoComplete="url"
                keyboardType="url"
                onSubmitEditing={() => setFocus("username")}
                cursorColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionColor={
                  fieldState.invalid
                    ? `${theme.colors.content.error.toString()}1F`
                    : `${theme.colors.content.base.toString()}1F`
                }
                style={styles.field}
              />
            )}
          />
        </Card>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Header.Title>
            {t("sections.account.label")}
          </Section.Header.Title>
        </Section.Header>

        <Card color="element">
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                placeholder={t("sections.account.fields.username.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                enterKeyHint="next"
                autoComplete="username"
                keyboardType="email-address"
                onSubmitEditing={() => setFocus("password")}
                cursorColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionColor={
                  fieldState.invalid
                    ? `${theme.colors.content.error.toString()}1F`
                    : `${theme.colors.content.base.toString()}1F`
                }
                style={styles.field}
              />
            )}
          />

          <Section.Divider style={{ marginLeft: theme.spacing[4] }} />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                placeholder={t("sections.account.fields.password.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                enterKeyHint="done"
                secureTextEntry
                cursorColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionColor={
                  fieldState.invalid
                    ? `${theme.colors.content.error.toString()}1F`
                    : `${theme.colors.content.base.toString()}1F`
                }
                style={styles.field}
              />
            )}
          />
        </Card>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Header.Title>
            {t("sections.notes.label")}
          </Section.Header.Title>
        </Section.Header>

        <Card color="element">
          <Controller
            control={control}
            name="notes"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                placeholder={t("sections.notes.fields.notes.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                multiline
                scrollEnabled
                returnKeyType="done"
                cursorColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  fieldState.invalid
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionColor={
                  fieldState.invalid
                    ? `${theme.colors.content.error.toString()}1F`
                    : `${theme.colors.content.base.toString()}1F`
                }
                style={styles.textarea}
              />
            )}
          />
        </Card>
      </Section.Root>

      <View style={styles.buttonWrapper}>
        <Button onPress={handleSubmitPress}>
          <View style={styles.buttonContent}>
            {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.surface.base}
              />
            ) : (
              <Text weight="medium" typography="body" style={styles.buttonText}>
                Save password
              </Text>
            )}
          </View>
        </Button>
      </View>
    </View>
  );
}
