import { SymbolView } from "expo-symbols";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useBiometrics } from "@/hooks/use-biometrics";
import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { LocalAuthenticationService } from "@/services/device/local-authentication";

import { getStyles } from "./styles";

type Props = {
  onUnlock: () => void;
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

  return { android: "lock" } as const;
}

export function LockScreen({ onUnlock }: Props) {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));
  const { performTapFeedback, notifySuccess, notifyFailure } = useHaptics();
  const { data: biometrics } = useBiometrics();
  const { t } = useTranslation("app-lock", { keyPrefix: "screen" });

  const iconName = getBiometricIconName(biometrics?.supportedAuthTypes);

  const handleAuthenticate = useCallback(async () => {
    try {
      const localAuthOutput = await LocalAuthenticationService.authenticate();

      if (!localAuthOutput.success) {
        notifyFailure();
        return;
      }

      notifySuccess();
      onUnlock();
    } catch (error) {
      console.log(error); // TODO: tratar aqui o erro
      notifyFailure();
    }
  }, [notifyFailure, notifySuccess, onUnlock]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once, when the lock screen first appears.
  useEffect(() => {
    handleAuthenticate();
  }, []);

  const handleUnlockPress = useCallback(() => {
    performTapFeedback();
    handleAuthenticate();
  }, [performTapFeedback, handleAuthenticate]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          entering={ZoomIn.duration(400)}
          style={styles.iconContainer}
        >
          <SymbolView
            name={iconName}
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
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonWrapper}>
          <Button onPress={handleUnlockPress}>
            <View style={styles.buttonContent}>
              <Text weight="medium" style={styles.buttonText}>
                {t("actions.unlock.label")}
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
}
