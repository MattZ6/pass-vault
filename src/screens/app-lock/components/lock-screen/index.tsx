import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useAnnounceOnChange } from "@/hooks/use-announce-on-change";
import { useBiometrics } from "@/hooks/use-biometrics";
import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { VaultKey } from "@/services/vault/key";
import { MasterPasswordService } from "@/services/vault/master-password";

import { getStyles } from "./styles";

type Props = {
  onUnlock: (vaultKey: VaultKey) => void;
};

function getBiometricIconName(
  supportedAuthTypes: ("fingerprint" | "facial_recognition" | "iris")[] = [],
) {
  if (supportedAuthTypes.includes("facial_recognition")) {
    return { android: "face", ios: "faceid" } as const;
  }

  if (supportedAuthTypes.includes("fingerprint")) {
    return { android: "fingerprint", ios: "touchid" } as const;
  }

  if (supportedAuthTypes.includes("iris")) {
    return { android: "fingerprint" } as const;
  }

  return null;
}

export function LockScreen({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const safeInsets = useSafeAreaInsets();
  const { styles, theme, resolvedThemeOption } = useStyles((input) =>
    getStyles(input, safeInsets),
  );
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const { data: biometrics } = useBiometrics();
  const { t } = useTranslation("app-lock", { keyPrefix: "screen" });

  const biometricIconName = getBiometricIconName(
    biometrics?.supportedAuthTypes,
  );

  const handleUnlockWithBiometrics = useCallback(async () => {
    try {
      const vaultKey = await MasterPasswordService.unlockWithBiometrics();

      if (!vaultKey) {
        return;
      }

      notifySuccess();
      onUnlock(vaultKey);
    } catch (error) {
      console.log(error); // TODO: tratar aqui o erro
    }
  }, [notifySuccess, onUnlock]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once, when the lock screen first appears.
  useEffect(() => {
    handleUnlockWithBiometrics();
  }, []);

  const handleBiometricButtonPress = useCallback(() => {
    performTapFeedback();
    handleUnlockWithBiometrics();
  }, [performTapFeedback, handleUnlockWithBiometrics]);

  const handleToggleVisibility = useCallback(() => {
    performTapFeedback();
    setVisible((current) => !current);
  }, [performTapFeedback]);

  const handleUnlockWithPassword = useCallback(async () => {
    performTapFeedback();

    if (!password.trim()) {
      return;
    }

    setHasFailed(false);
    setIsSubmitting(true);

    try {
      const vaultKey = await MasterPasswordService.unlock({ password });

      notifySuccess();
      onUnlock(vaultKey);
    } catch (error) {
      console.log(error); // TODO: tratar aqui o erro
      notifyFailure();
      setHasFailed(true);
      setIsSubmitting(false);
    }
  }, [password, performTapFeedback, notifySuccess, notifyFailure, onUnlock]);

  useAnnounceOnChange(hasFailed ? t("errors.incorrect") : undefined);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          entering={ZoomIn.duration(400)}
          style={styles.iconContainer}
        >
          <SymbolView
            name={{ android: "lock" }}
            size={theme.size[10]}
            tintColor={theme.colors.content.base}
          />
        </Animated.View>

        <Text weight="bold" typography="title" style={styles.title}>
          {t("title")}
        </Text>

        <Text color="muted" style={styles.subtitle}>
          {t("subtitle")}
        </Text>

        <Section.Root style={styles.form}>
          <Card color="element">
            <View style={styles.row}>
              <TextInput
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setHasFailed(false);
                }}
                editable={!isSubmitting}
                accessibilityLabel={t("fields.password.placeholder")}
                placeholder={t("fields.password.placeholder")}
                placeholderTextColor={theme.colors.content.muted}
                keyboardAppearance={resolvedThemeOption}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!visible}
                enterKeyHint="done"
                onSubmitEditing={handleUnlockWithPassword}
                style={styles.field}
                cursorColor={
                  hasFailed
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
                selectionHandleColor={
                  hasFailed
                    ? theme.colors.content.error
                    : theme.colors.content.base
                }
              />

              <IconButton
                size={10}
                accessibilityLabel={t(
                  visible
                    ? "fields.password.actions.hide.label"
                    : "fields.password.actions.show.label",
                )}
                onPress={handleToggleVisibility}
              >
                <SymbolView
                  name={{ android: visible ? "visibility_off" : "visibility" }}
                  tintColor={theme.colors.content.element}
                />
              </IconButton>
            </View>
          </Card>

          {hasFailed && (
            <Text
              color="error"
              typography="bodySmall"
              style={styles.error}
              accessibilityLiveRegion="polite"
            >
              {t("errors.incorrect")}
            </Text>
          )}
        </Section.Root>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonWrapper}>
          <Button disabled={isSubmitting} onPress={handleUnlockWithPassword}>
            <View style={styles.buttonContent}>
              <Text weight="medium" style={styles.buttonText}>
                {t("actions.unlock.label")}
              </Text>
            </View>
          </Button>
        </View>

        {biometricIconName && (
          <IconButton
            size={12}
            accessibilityLabel={t("actions.biometric.label")}
            onPress={handleBiometricButtonPress}
          >
            <SymbolView
              name={biometricIconName}
              tintColor={theme.colors.content.element}
            />
          </IconButton>
        )}
      </View>
    </View>
  );
}
