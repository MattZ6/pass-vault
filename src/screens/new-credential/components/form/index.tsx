import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Pressable, TextInput, View } from "react-native";

import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { AddCredentialMetaInput } from "@/store/credentials/slices/meta.slice";
import { useVaultStore } from "@/store/credentials/vault.store";

import { useNewCredentialForm } from "./hooks/use-new-credential-form";

import { getStyles } from "./styles";

export function NewCredentialForm() {
  const router = useRouter();
  const { t } = useTranslation("new-credential", { keyPrefix: "screen.form" });
  const addCredentialMeta = useVaultStore((s) => s.addCredentialMeta);
  const { notifySuccess, notifyFailure } = useHaptics();
  const { styles, theme } = useStyles(getStyles);
  const { control, handleSubmit, formState } = useNewCredentialForm();

  const onSubmit = useCallback(
    (input: AddCredentialMetaInput) => {
      notifySuccess();
      addCredentialMeta(input);
      router.back();
    },
    [notifySuccess, router, addCredentialMeta],
  );

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        <View style={styles.field}>
          <Text weight="medium" typography="bodySmall">
            {t("fields.provider.label")}
          </Text>
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={field.disabled}
                style={styles.input}
                placeholderTextColor={theme.colors.content.muted}
                selectionColor={theme.colors.content.base}
                keyboardType="default"
                placeholder={t("fields.provider.placeholder")}
                returnKeyType="next"
              />
            )}
          />
          <Text weight="regular" typography="bodySmall">
            {formState.errors.provider?.type
              ? t(
                  `fields.provider.validations.${formState.errors.provider?.type}`,
                )
              : ""}
          </Text>
        </View>

        <View style={styles.field}>
          <Text weight="medium" typography="bodySmall">
            {t("fields.username.label")}
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={field.disabled}
                style={styles.input}
                placeholderTextColor={theme.colors.content.muted}
                selectionColor={theme.colors.content.base}
                keyboardType="email-address"
                placeholder={t("fields.username.placeholder")}
                returnKeyType="send"
              />
            )}
          />
          <Text weight="regular" typography="bodySmall">
            {formState.errors.username?.type
              ? t(
                  `fields.username.validations.${formState.errors.username?.type}`,
                )
              : ""}
          </Text>
        </View>

        <View style={styles.field}>
          <Text weight="medium" typography="bodySmall">
            {t("fields.password.label")}
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={field.disabled}
                style={styles.input}
                placeholderTextColor={theme.colors.content.muted}
                selectionColor={theme.colors.content.base}
                keyboardType="email-address"
                placeholder={t("fields.password.placeholder")}
                returnKeyType="send"
              />
            )}
          />
          <Text weight="regular" typography="bodySmall">
            {formState.errors.password?.type
              ? t(
                  `fields.password.validations.${formState.errors.password?.type}`,
                )
              : ""}
          </Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          android_disableSound
          android_ripple={theme.colors.androidRipple}
          onPress={handleSubmit(onSubmit, notifyFailure)}
        >
          <View style={styles.buttonContent}>
            <Text weight="medium" typography="body">
              {t("actions.save.label")}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
