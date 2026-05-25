import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { VaultService } from "@/services/vault/credentials";

import { PasswordField } from "./components/password-field";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function PasswordSection({ credentialId }: Props) {
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.password",
  });
  const { styles } = useStyles(getStyles);
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const [password, setPassword] = useState<string | null>(null);

  const handleShowPassword = useCallback(async () => {
    performTapFeedback();

    try {
      const password = await VaultService.getPassword({ credentialId });

      setPassword(password);
      notifySuccess();
    } catch (error) {
      console.log(error); // TODO: tratar aqui o erro
      notifyFailure();
    }
  }, [performTapFeedback, credentialId, notifyFailure, notifySuccess]);

  useEffect(() => {
    return () => setPassword(null);
  }, []);

  return (
    <Section.Root>
      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title typography="bodySmall">
              {t("fields.password.label")}
            </Section.Item.Content.Title>
            <PasswordField password={password} />
          </Section.Item.Content>
        </Section.Item.Root>

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <Button onPress={handleShowPassword}>
              <View style={styles.buttonContent}>
                <Text weight="medium" style={styles.buttonText}>
                  {t("actions.show.label")}
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </Card>
    </Section.Root>
  );
}
