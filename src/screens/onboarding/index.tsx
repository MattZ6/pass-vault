import { useState } from "react";
import { View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import type { VaultKey } from "@/services/vault/key";

import { SetupScreen } from "./components/setup";
import { WelcomeScreen } from "./components/welcome";

import { getStyles } from "./styles";

type Props = {
  onComplete: (vaultKey: VaultKey) => void;
};

type Step = "welcome" | "setup";

export function OnboardingScreen({ onComplete }: Props) {
  const { styles } = useStyles(getStyles);
  const [step, setStep] = useState<Step>("welcome");

  return (
    <View style={styles.container}>
      {step === "welcome" && (
        <WelcomeScreen onComplete={() => setStep("setup")} />
      )}
      {step === "setup" && <SetupScreen onSetupComplete={onComplete} />}
    </View>
  );
}
