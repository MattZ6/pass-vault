import { useEffect, useLayoutEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialProviderSchemaType } from "@/screens/edit-provider/hooks/schema";
import { useSubmitCredentialProviderForm } from "@/screens/edit-provider/hooks/use-submit-credential-provider-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
  provider: string;
};

export function EditCredentialProviderForm({ credentialId, provider }: Props) {
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const form = useFormContext<EditCredentialProviderSchemaType>();
  const { submit } = useSubmitCredentialProviderForm();
  const { t } = useTranslation("edit-provider", {
    keyPrefix: "screen.form.fields",
  });

  useEffect(() => form.reset({ provider }), [form.reset, provider]);

  useLayoutEffect(() => {
    setTimeout(() => {
      form.setFocus("provider");
    }, 300);
  }, [form.setFocus]);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Card color="element">
          <Controller
            control={form.control}
            name="provider"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                placeholder={t("provider.placeholder")}
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
