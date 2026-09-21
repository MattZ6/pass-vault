import { SymbolView } from "expo-symbols";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { VaultWheel } from "./components/wheel";

import { useVaultWheelGesture } from "./hooks/use-vault-wheel-gesture";

import { getStyles } from "./styles";

type Props = {
  onOnboardingComplete: () => void;
};

export function OnboardingScreen({ onOnboardingComplete }: Props) {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));
  const { notifySuccess } = useHaptics();
  const { t } = useTranslation("app-lock", { keyPrefix: "screen.onboarding" });

  const handleUnlocked = useCallback(() => {
    notifySuccess();
    onOnboardingComplete();
  }, [notifySuccess, onOnboardingComplete]);

  const { wheelRef, rotation, progress, panGesture } = useVaultWheelGesture({
    onUnlocked: handleUnlocked,
  });

  const animatedHintStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 0.05, 0.15],
      [1, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text weight="bold" typography="title" style={styles.title}>
            {t("title")}
          </Text>

          <Text color="muted" style={styles.subtitle}>
            {t("subtitle")}
          </Text>
        </View>

        <View style={styles.wheelContainer}>
          <VaultWheel
            wheelRef={wheelRef}
            rotation={rotation}
            progress={progress}
          />
        </View>

        <Animated.View style={[styles.hint, animatedHintStyle]}>
          <Text color="muted" style={styles.hintText}>
            {t("hint")}
          </Text>

          <SymbolView
            name={{ android: "arrow_forward", ios: "arrow.right" }}
            tintColor={theme.colors.content.muted}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
