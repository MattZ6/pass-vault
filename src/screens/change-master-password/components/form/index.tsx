import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useAnnounceOnChange } from "@/hooks/use-announce-on-change";
import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { ChangeMasterPasswordSchemaType } from "@/screens/change-master-password/hooks/schema";

import { getStyles } from "./styles";

export function ChangeMasterPasswordForm() {
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<ChangeMasterPasswordSchemaType>();
  const isSubmitting = form.formState.isSubmitting;
  const { t } = useTranslation("change-master-password", {
    keyPrefix: "screen.form",
  });

  const handleToggleCurrentVisibility = useCallback(() => {
    performTapFeedback();
    setCurrentVisible((current) => !current);
  }, [performTapFeedback]);

  const handleToggleNewVisibility = useCallback(() => {
    performTapFeedback();
    setNewVisible((current) => !current);
  }, [performTapFeedback]);

  const showsMismatchError =
    !form.formState.errors.newPassword &&
    Boolean(form.formState.errors.confirmNewPassword);

  useAnnounceOnChange(
    form.formState.errors.currentPassword
      ? t("errors.incorrectCurrentPassword")
      : undefined,
  );
  useAnnounceOnChange(
    form.formState.errors.newPassword ? t("errors.tooShort") : undefined,
  );
  useAnnounceOnChange(showsMismatchError ? t("errors.mismatch") : undefined);
  useAnnounceOnChange(
    form.formState.errors.root ? t("errors.changeFailed") : undefined,
  );

  return (
    <View style={styles.container}>
      <Section.Root>
        <Section.Header>
          <Section.Header.Title>
            {t("fields.currentPassword.label")}
          </Section.Header.Title>
        </Section.Header>

        <Card color="element">
          <View style={styles.row}>
            <Controller
              control={form.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <TextInput
                  ref={field.ref}
                  onChangeText={(value) => {
                    field.onChange(value);
                    form.clearErrors("currentPassword");
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                  editable={!isSubmitting}
                  accessibilityLabel={t("fields.currentPassword.placeholder")}
                  placeholder={t("fields.currentPassword.placeholder")}
                  placeholderTextColor={theme.colors.content.muted}
                  keyboardAppearance={resolvedThemeOption}
                  autoComplete="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!currentVisible}
                  enterKeyHint="next"
                  onSubmitEditing={() => form.setFocus("newPassword")}
                  style={styles.field}
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
                />
              )}
            />

            <IconButton
              size={10}
              accessibilityLabel={t(
                currentVisible
                  ? "fields.currentPassword.actions.hide.label"
                  : "fields.currentPassword.actions.show.label",
              )}
              onPress={handleToggleCurrentVisibility}
            >
              <SymbolView
                name={{
                  android: currentVisible ? "visibility_off" : "visibility",
                }}
                tintColor={theme.colors.content.element}
              />
            </IconButton>
          </View>
        </Card>

        {form.formState.errors.currentPassword && (
          <Text
            color="error"
            typography="bodySmall"
            accessibilityLiveRegion="polite"
          >
            {t("errors.incorrectCurrentPassword")}
          </Text>
        )}
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Header.Title>
            {t("fields.newPassword.label")}
          </Section.Header.Title>
        </Section.Header>

        <Card color="element">
          <View style={styles.row}>
            <Controller
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <TextInput
                  ref={field.ref}
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  editable={!isSubmitting}
                  accessibilityLabel={t("fields.newPassword.placeholder")}
                  placeholder={t("fields.newPassword.placeholder")}
                  placeholderTextColor={theme.colors.content.muted}
                  keyboardAppearance={resolvedThemeOption}
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!newVisible}
                  enterKeyHint="next"
                  onSubmitEditing={() => form.setFocus("confirmNewPassword")}
                  style={styles.field}
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
                />
              )}
            />

            <IconButton
              size={10}
              accessibilityLabel={t(
                newVisible
                  ? "fields.newPassword.actions.hide.label"
                  : "fields.newPassword.actions.show.label",
              )}
              onPress={handleToggleNewVisibility}
            >
              <SymbolView
                name={{ android: newVisible ? "visibility_off" : "visibility" }}
                tintColor={theme.colors.content.element}
              />
            </IconButton>
          </View>

          <Section.Divider style={styles.divider} />

          <Controller
            control={form.control}
            name="confirmNewPassword"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                accessibilityLabel={t(
                  "fields.confirmNewPassword.placeholder",
                )}
                placeholder={t("fields.confirmNewPassword.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                keyboardAppearance={resolvedThemeOption}
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!newVisible}
                enterKeyHint="done"
                style={styles.field}
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
              />
            )}
          />
        </Card>

        {form.formState.errors.newPassword && (
          <Text
            color="error"
            typography="bodySmall"
            accessibilityLiveRegion="polite"
          >
            {t("errors.tooShort")}
          </Text>
        )}

        {showsMismatchError && (
          <Text
            color="error"
            typography="bodySmall"
            accessibilityLiveRegion="polite"
          >
            {t("errors.mismatch")}
          </Text>
        )}

        {form.formState.errors.root && (
          <Text
            color="error"
            typography="bodySmall"
            accessibilityLiveRegion="polite"
          >
            {t("errors.changeFailed")}
          </Text>
        )}
      </Section.Root>
    </View>
  );
}
