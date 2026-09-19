import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { LocalAuthenticationService } from "@/services/device/local-authentication";
import { VaultService } from "@/services/vault/credentials";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function CurrentPasswordSection({ credentialId }: Props) {
  const [password, setPassword] = useState<string | null>(null);
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const { t } = useTranslation("edit-password", {
    keyPrefix: "screen.sections.current",
  });

  const handleShowPassword = useCallback(async () => {
    performTapFeedback();

    try {
      const isEnrolled =
        await LocalAuthenticationService.checkIfDeviceIsEnrolled();

      if (!isEnrolled) {
        // TODO: Exibir mensagem

        return;
      }

      const localAuthOutput = await LocalAuthenticationService.authenticate();

      if (!localAuthOutput.success) {
        // TODO: Exibir mensagem

        return;
      }

      const password = await VaultService.getPassword({ credentialId });

      setPassword(password);
      notifySuccess();
    } catch (error) {
      console.log(error); // TODO: tratar aqui o erro
      notifyFailure();
    }
  }, [performTapFeedback, credentialId, notifyFailure, notifySuccess]);

  const handleHidePassword = useCallback(() => {
    performTapFeedback();
    setPassword(null);
  }, [performTapFeedback]);

  useEffect(() => {
    return () => setPassword(null);
  }, []);

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <View style={styles.passwordContainer}>
          <Text>{password ?? "●●●●●●●●●●●●"}</Text>
        </View>

        <Section.Divider style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={password ? handleHidePassword : handleShowPassword}
            >
              <View style={styles.buttonContent}>
                <SymbolView
                  name={{
                    android: password ? "visibility_off" : "visibility",
                  }}
                  tintColor={theme.colors.content.base}
                />
                <Text weight="medium" style={styles.buttonText}>
                  {password ? t("actions.hide.label") : t("actions.show.label")}
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </Card>
    </Section.Root>
  );
}
