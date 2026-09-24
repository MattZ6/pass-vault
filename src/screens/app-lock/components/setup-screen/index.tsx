import { SymbolView } from "expo-symbols";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedText } from "@/components/ui/text/animated";

import { useRevealAnimation } from "@/hooks/use-reveal-animation";
import { useStyles } from "@/hooks/use-styles";

import type { VaultKey } from "@/services/vault/key";

import { SetupMasterPasswordForm } from "./components/form";

import { useSetupMasterPasswordForm } from "./hooks/use-setup-master-password-form";

import { getStyles } from "./styles";

type Props = {
  onSetupComplete: (vaultKey: VaultKey) => void;
};

const initialDelay = 200;

export function SetupScreen({ onSetupComplete }: Props) {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));
  const form = useSetupMasterPasswordForm();
  const { t } = useTranslation("app-lock", { keyPrefix: "screen.setup" });

  const iconStyle = useRevealAnimation(initialDelay);
  const titleStyle = useRevealAnimation(initialDelay * 2);
  const subtitleStyle = useRevealAnimation(initialDelay * 4);
  const formStyle = useRevealAnimation(initialDelay * 6);

  return (
    <FormProvider {...form}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <SymbolView
            name={{ android: "key", ios: "key.fill" }}
            size={theme.size[10]}
            tintColor={theme.colors.content.base}
          />
        </Animated.View>

        <View style={styles.header}>
          <AnimatedText
            weight="semiBold"
            typography="subtitle"
            style={[styles.title, titleStyle]}
          >
            {t("title")}
          </AnimatedText>

          <AnimatedText color="muted" style={[styles.subtitle, subtitleStyle]}>
            {t("subtitle")}
          </AnimatedText>
        </View>

        <Animated.View style={formStyle}>
          <SetupMasterPasswordForm onSetupComplete={onSetupComplete} />
        </Animated.View>
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}
