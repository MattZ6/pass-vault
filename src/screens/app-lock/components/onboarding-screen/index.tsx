import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

const initialDelay = 200;
const hintDelay = initialDelay * 6;

export function OnboardingScreen({ onOnboardingComplete }: Props) {
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const { t } = useTranslation("app-lock", { keyPrefix: "screen.onboarding" });

  const { wheelRef, rotation, dragDistance, panGesture } = useVaultWheelGesture({
    onUnlocked: onOnboardingComplete,
    hintDelay,
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <AnimatedLogo delay={initialDelay} wheelRef={wheelRef} rotation={rotation} />

        <View style={styles.content}>
          <AnimatedTitle delay={initialDelay * 2} style={styles.title}>
            {t("title")}
          </AnimatedTitle>
          <AnimatedDescription delay={initialDelay * 4} style={styles.subtitle}>
            {t("subtitle")}
          </AnimatedDescription>
          <AnimatedHint delay={hintDelay} translationX={dragDistance}>
            {t("hint")}
          </AnimatedHint>
        </View>
      </View>
    </GestureDetector>
  );
}
