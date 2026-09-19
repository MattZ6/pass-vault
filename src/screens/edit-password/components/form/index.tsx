import { SymbolView } from "expo-symbols";
import { useCallback, useLayoutEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialPasswordSchemaType } from "@/screens/edit-password/hooks/schema";
import { useSubmitCredentialPasswordForm } from "@/screens/edit-password/hooks/use-submit-credential-password-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function EditCredentialPasswordForm({ credentialId }: Props) {
  const [visible, setVisible] = useState(false);
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const form = useFormContext<EditCredentialPasswordSchemaType>();
  const { submit } = useSubmitCredentialPasswordForm();
  const { t } = useTranslation("edit-password", {
    keyPrefix: "screen.form.fields",
  });

  const handleToggleVisibility = useCallback(() => {
    performTapFeedback();
    setVisible((current) => !current);
  }, [performTapFeedback]);

  useLayoutEffect(() => {
    setTimeout(() => {
      form.setFocus("password");
    }, 300);
  }, [form.setFocus]);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Section.Header>
          <Section.Header.Title>{t("password.label")}</Section.Header.Title>
        </Section.Header>

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
                  placeholder={t("password.placeholder")}
                  placeholderTextColor={theme.colors.content.muted}
                  keyboardAppearance={resolvedThemeOption}
                  autoComplete="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!visible}
                  enterKeyHint="done"
                  onSubmitEditing={() => submit({ credentialId })}
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

            <IconButton size={10} onPress={handleToggleVisibility}>
              <SymbolView
                name={{ android: visible ? "visibility_off" : "visibility" }}
                tintColor={theme.colors.content.element}
              />
            </IconButton>
          </View>
        </Card>
      </Section.Root>
    </View>
  );
}
