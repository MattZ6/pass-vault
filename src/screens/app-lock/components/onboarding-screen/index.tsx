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
import { AnimatedDescription } from "./components/animated-description";
import { AnimatedHint } from "./components/animated-hint";
import { AnimatedLogo } from "./components/animated-logo";
import { AnimatedTitle } from "./components/animated-title";
import { useVaultWheelGesture } from "./hooks/use-vault-wheel-gesture";
import { getStyles } from "./styles";

type Props = {
  onOnboardingComplete: () => void;
};

const initialDelay = 400;

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
        <AnimatedLogo delay={initialDelay} wheelRef={wheelRef} rotation={rotation} />

        <View style={styles.content}>
          <AnimatedTitle delay={initialDelay * 2} style={styles.title}>
            {t("title")}
          </AnimatedTitle>
          <AnimatedDescription delay={initialDelay * 4} style={styles.title}>
            {t("subtitle")}
          </AnimatedDescription>
          <AnimatedHint delay={initialDelay * 6} panTranslationX={rotation}>
            {t("hint")}
          </AnimatedHint>
        </View>
      </View>
    </GestureDetector>
  );
}
