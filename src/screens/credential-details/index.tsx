import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView, View } from "react-native";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { getStyles } from "./styles";

type Props = {
  id: string;
};

export function CredentialDetailsScreen({ id }: Props) {
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.fields",
  });
  const credential = useVaultStore((s) => s.getCredentialMeta)({ id });
  const { styles } = useStyles(getStyles);

  if (!credential) {
    return (
      <View style={styles.container}>
        <Text color="muted">Credencial não existe</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen.Title>{credential.provider}</Stack.Screen.Title>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        {Platform.OS === "android" && (
          <View style={styles.toolbar}>
            <Text weight="semiBold" typography="subtitle" style={styles.title}>
              {credential.provider}
            </Text>
          </View>
        )}

        <View style={styles.field}>
          <Text typography="bodySmall" color="muted">
            {t("username.label")}
          </Text>
          <Text>{credential.username}</Text>
        </View>
      </ScrollView>
    </>
  );
}
