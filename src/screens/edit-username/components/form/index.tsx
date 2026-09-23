import { useEffect, useLayoutEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialUsernameSchemaType } from "@/screens/edit-username/hooks/schema";
import { useSubmitCredentialUsernameForm } from "@/screens/edit-username/hooks/use-submit-credential-username-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
  username: string;
};

export function EditCredentialUsernameForm({ credentialId, username }: Props) {
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const form = useFormContext<EditCredentialUsernameSchemaType>();
  const { submit } = useSubmitCredentialUsernameForm();
  const { t } = useTranslation("edit-username", {
    keyPrefix: "screen.form.fields",
  });

  useEffect(() => form.reset({ username }), [form.reset, username]);

  useLayoutEffect(() => {
    setTimeout(() => {
      form.setFocus("username");
    }, 300);
  }, [form.setFocus]);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Card color="element">
          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                // editable={!isSubmitting}
                accessibilityLabel={t("username.placeholder")}
                placeholder={t("username.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                keyboardAppearance={resolvedThemeOption}
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
        </Card>
      </Section.Root>
    </View>
  );
}
