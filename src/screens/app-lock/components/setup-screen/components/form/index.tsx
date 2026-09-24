import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useAnnounceOnChange } from "@/hooks/use-announce-on-change";
import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { VaultKey } from "@/services/vault/key";

import type { SetupMasterPasswordSchemaType } from "@/screens/app-lock/components/setup-screen/hooks/schema";
import { useSubmitSetupMasterPasswordForm } from "@/screens/app-lock/components/setup-screen/hooks/use-submit-setup-master-password-form";

import { getStyles } from "./styles";

type Props = {
  onSetupComplete: (vaultKey: VaultKey) => void;
};

export function SetupMasterPasswordForm({ onSetupComplete }: Props) {
  const [visible, setVisible] = useState(false);
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<SetupMasterPasswordSchemaType>();
  const { submit, isSubmitting, hasFailed } = useSubmitSetupMasterPasswordForm({
    onSetupComplete,
  });
  const { t } = useTranslation("app-lock", { keyPrefix: "screen.setup" });

  const handleToggleVisibility = useCallback(() => {
    performTapFeedback();
    setVisible((current) => !current);
  }, [performTapFeedback]);

  const handleSubmit = useCallback(() => {
    performTapFeedback();
    submit();
  }, [performTapFeedback, submit]);

  const showsMismatchError =
    !form.formState.errors.password && Boolean(form.formState.errors.confirmPassword);

  const errorMessage = form.formState.errors.password
    ? t("form.errors.tooShort")
    : showsMismatchError
      ? t("form.errors.mismatch")
      : hasFailed
        ? t("form.errors.setupFailed")
        : undefined;

  useAnnounceOnChange(errorMessage);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Card color="element">
          <View style={styles.row}>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <TextInput
                  ref={field.ref}
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  editable={!isSubmitting}
                  accessibilityLabel={t("form.fields.password.placeholder")}
                  placeholder={t("form.fields.password.placeholder")}
                  placeholderTextColor={theme.colors.content.muted}
                  keyboardAppearance={resolvedThemeOption}
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!visible}
                  enterKeyHint="next"
                  onSubmitEditing={() => form.setFocus("confirmPassword")}
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
                visible
                  ? "form.fields.password.actions.hide.label"
                  : "form.fields.password.actions.show.label",
              )}
              onPress={handleToggleVisibility}
            >
              <SymbolView
                name={{ android: visible ? "visibility_off" : "visibility" }}
                tintColor={theme.colors.content.element}
              />
            </IconButton>
          </View>

          <Section.Divider style={styles.divider} />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                editable={!isSubmitting}
                accessibilityLabel={t(
                  "form.fields.confirmPassword.placeholder",
                )}
                placeholder={t("form.fields.confirmPassword.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                keyboardAppearance={resolvedThemeOption}
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!visible}
                enterKeyHint="done"
                onSubmitEditing={handleSubmit}
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

        {errorMessage && (
          <Text
            color="error"
            typography="bodySmall"
            style={styles.error}
            accessibilityLiveRegion="polite"
          >
            {errorMessage}
          </Text>
        )}
      </Section.Root>

      <View style={styles.buttonWrapper}>
        <Button disabled={isSubmitting} onPress={handleSubmit}>
          <View style={styles.buttonContent}>
            <Text
              weight="medium"
              style={[
                styles.buttonText,
                isSubmitting && styles.buttonTextDisabled,
              ]}
            >
              {t("form.actions.submit.label")}
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
