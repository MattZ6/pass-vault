import FeatherIcon from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useCallback, useLayoutEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";
import { useVaultStore } from "@/store/vault";
import { colors } from "@/styles/themes/colors/dark";

const newItemScheme = z.object({
  service: z.string().trim().min(3, { error: "Min 3 characters" }),
  username: z.string().trim().min(3, { error: "Min 3 characters" }),
  password: z.string().trim().min(3, { error: "Min 3 characters" }),
});

type NewItemFormInput = z.infer<typeof newItemScheme>;

export function NewCredentialScreen() {
  const canSubmitRef = useRef(true);
  const router = useRouter();
  const { control, setFocus, handleSubmit, formState } =
    useForm<NewItemFormInput>({
      resolver: zodResolver(newItemScheme),
    });
  const addCredential = useVaultStore((s) => s.addCredential);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmitAppField = useCallback(
    () => setFocus("username"),
    [setFocus],
  );

  const handleSubmitEmailField = useCallback(
    () => setFocus("password"),
    [setFocus],
  );

  const onSubmit = useCallback(
    (input: NewItemFormInput) => {
      if (!canSubmitRef.current) {
        return;
      }

      canSubmitRef.current = false;

      addCredential({
        service: input.service,
        username: input.username,
      });

      router.back();
    },
    [router.back, addCredential],
  );

  useLayoutEffect(() => setFocus("service"), [setFocus]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          {/* Esse cor deixo o ícone escondido por enquanto */}
          <FeatherIcon name="x" color={colors.mauve1} size={22} />
        </Pressable>

        <Text style={styles.headerTitle}>Add</Text>

        <TouchableScaleOpacity
          onPress={handleGoBack}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <FeatherIcon name="x" color={colors.mauve9} size={22} />
        </TouchableScaleOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>App name</Text>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                style={[
                  styles.input,
                  formState.errors.service ? styles.inputWithError : null,
                ]}
                returnKeyType="next"
                placeholderTextColor={colors.mauve11}
                // placeholder="What's the app name?"
                selectionColor={colors.mauve12}
                onSubmitEditing={handleSubmitAppField}
              />
            )}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Username / Email</Text>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                style={[
                  styles.input,
                  formState.errors.username ? styles.inputWithError : null,
                ]}
                returnKeyType="next"
                autoComplete="email"
                keyboardType="email-address"
                // placeholder="Email/Username"
                placeholderTextColor={colors.mauve11}
                selectionColor={colors.mauve12}
                onSubmitEditing={handleSubmitEmailField}
              />
            )}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextInput
                ref={field.ref}
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                style={[
                  styles.input,
                  formState.errors.password ? styles.inputWithError : null,
                ]}
                returnKeyType="go"
                keyboardType="visible-password"
                secureTextEntry
                // placeholder="Password"
                placeholderTextColor={colors.mauve11}
                selectionColor={colors.mauve12}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </View>

        <View style={styles.field}>
          <TouchableScaleOpacity onPress={handleSubmit(onSubmit)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </View>
          </TouchableScaleOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  headerTitle: {
    flex: 1,

    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: colors.mauve12,
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 88,
    height: 88,
    borderRadius: 24,

    alignSelf: "center",

    borderWidth: 1,
    borderColor: colors.mauve4,

    backgroundColor: colors.mauve2,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    textTransform: "uppercase",
    color: colors.mauve9,
  },
  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.mauve2,
    paddingHorizontal: 16,
    color: colors.mauve12,
    fontSize: 16,
    // lineHeight: 24,
    borderWidth: 1,
    borderColor: colors.mauve2,
  },
  inputWithError: {
    borderWidth: 1,
    borderColor: "red",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,

    height: 56,
    borderRadius: 12,

    backgroundColor: colors.mauve12,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 24,
    color: colors.mauve1,
  },
});
