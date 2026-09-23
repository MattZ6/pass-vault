import { useEffect, useLayoutEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useStyles } from "@/hooks/use-styles";

import type { EditCredentialNotesSchemaType } from "@/screens/edit-notes/hooks/schema";

import { getStyles } from "./styles";

type Props = {
  notes?: string;
};

export function EditCredentialNotesForm({ notes }: Props) {
  const { styles, theme, resolvedThemeOption } = useStyles(getStyles);
  const form = useFormContext<EditCredentialNotesSchemaType>();
  const { t } = useTranslation("edit-notes", {
    keyPrefix: "screen.form.fields",
  });

  useEffect(() => form.reset({ notes: notes ?? "" }), [form.reset, notes]);

  useLayoutEffect(() => {
    setTimeout(() => {
      form.setFocus("notes");
    }, 300);
  }, [form.setFocus]);

  return (
    <View style={styles.container}>
      <Section.Root>
        <Card color="element">
          <Controller
            control={form.control}
            name="notes"
            render={({ field, fieldState }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                accessibilityLabel={t("notes.placeholder")}
                placeholder={t("notes.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                keyboardAppearance={resolvedThemeOption}
                multiline
                scrollEnabled
                returnKeyType="done"
                style={styles.textarea}
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
