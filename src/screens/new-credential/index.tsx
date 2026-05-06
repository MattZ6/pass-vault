import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { NewCredentialForm } from "./components/form";

import { getStyles } from "./styles";

export function NewCredentialScreen() {
  const { t } = useTranslation("new-credential", { keyPrefix: "meta" });
  const { styles } = useStyles(getStyles);

  return (
    <>
      <Stack.Screen.Title>{t("title")}</Stack.Screen.Title>

      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
        >
          {Platform.OS === "android" && (
            <View style={styles.toolbar}>
              <Text weight="semiBold" typography="body" style={styles.title}>
                {t("title")}
              </Text>
            </View>
          )}
          <NewCredentialForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
