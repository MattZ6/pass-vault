import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { ActivityIndicator, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

import { VaultService } from "@/services/vault/credentials";

import {
  type FormOutput,
  useNewCredentialForm,
} from "./hooks/use-new-credential-form";

export function CreateCredentialForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const { control, handleSubmit, formState, setFocus } = useNewCredentialForm();

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
    <View style={{ gap: theme.spacing[8] }}>
      <Section.Root>
        <Section.Header>
          <Section.Header.Title>App</Section.Header.Title>
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
                placeholder="App name"
                placeholderTextColor={`${theme.colors.content.muted.toString()}8F`}
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
                style={{
                  padding: theme.spacing[4],
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.typography.body.fontSize,
                  lineHeight: theme.typography.body.lineHeight,
                  color: theme.colors.content.base,
                }}
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
                placeholder="Website"
                placeholderTextColor={`${theme.colors.content.muted.toString()}8F`}
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
                style={{
                  padding: theme.spacing[4],
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.typography.body.fontSize,
                  lineHeight: theme.typography.body.lineHeight,
                  color: theme.colors.content.base,
                }}
              />
            )}
          />
        </Card>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Header.Title>Account</Section.Header.Title>
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
                placeholder="Email or username"
                placeholderTextColor={`${theme.colors.content.muted.toString()}8F`}
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
                style={{
                  margin: 0,
                  padding: theme.spacing[4],
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.typography.body.fontSize,
                  lineHeight: theme.typography.body.lineHeight,
                  color: theme.colors.content.base,
                }}
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
                placeholder="Password"
                placeholderTextColor={`${theme.colors.content.muted.toString()}8F`}
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
                style={{
                  padding: theme.spacing[4],
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.typography.body.fontSize,
                  lineHeight: theme.typography.body.lineHeight,
                  color: theme.colors.content.base,
                }}
              />
            )}
          />
        </Card>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Header.Title>Notes</Section.Header.Title>
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
                placeholder="Add notes"
                placeholderTextColor={`${theme.colors.content.muted.toString()}8F`}
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
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  verticalAlign: "top",
                  padding: theme.spacing[4],
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.typography.body.fontSize,
                  lineHeight: theme.typography.body.lineHeight,
                  color: theme.colors.content.base,
                  minHeight: 128,
                }}
              />
            )}
          />
        </Card>
      </Section.Root>

      <View
        style={{
          height: theme.size[12],
          borderRadius: theme.radii.full,
          overflow: "hidden",
        }}
      >
        <Button onPress={handleSubmitPress}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: theme.size[12],
              backgroundColor: theme.colors.content.base,
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.surface.base}
              />
            ) : (
              <Text
                weight="medium"
                typography="body"
                style={{
                  textAlign: "center",
                  color: theme.colors.surface.base,
                }}
              >
                Save password
              </Text>
            )}
          </View>
        </Button>
      </View>
    </View>
  );
}
