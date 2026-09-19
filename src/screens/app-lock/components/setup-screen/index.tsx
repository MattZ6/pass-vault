import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import type { VaultKey } from "@/services/vault/key";

import { SetupMasterPasswordForm } from "./components/form";

import { useSetupMasterPasswordForm } from "./hooks/use-setup-master-password-form";

import { getStyles } from "./styles";

type Props = {
  onSetupComplete: (vaultKey: VaultKey) => void;
};

export function SetupScreen({ onSetupComplete }: Props) {
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const form = useSetupMasterPasswordForm();
  const { t } = useTranslation("app-lock", { keyPrefix: "screen.setup" });

  return (
    <FormProvider {...form}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Text weight="bold" typography="title" style={styles.title}>
            {t("title")}
          </Text>

          <Text color="muted" style={styles.subtitle}>
            {t("subtitle")}
          </Text>
        </View>

        <SetupMasterPasswordForm onSetupComplete={onSetupComplete} />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}
