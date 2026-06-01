import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CountdownActionButton } from "@/components/ui/countdown-action-button";

import { useRevealPassword } from "@/hooks/security/use-reveal-password";

import { SecureRevealField } from "./components/secure-reveal-field";

const DURATION = 3_000;

const seconds = Math.ceil(DURATION / 1000);

export function PasswordSection() {
  const { visible, reveal, progress, reset, pause, resume } = useRevealPassword(
    {
      duration: DURATION,
    },
  );

  const handleRevealPassword = useCallback(() => {
    reveal();
  }, [reveal]);

  useEffect(() => {
    return () => reset(); // Reset animation on unmount
  }, [reset]);

  return (
    <View style={styles.content}>
      <SecureRevealField
        label="Password"
        value="asjbhdaslkjdnasd"
        visible={visible}
      />

      <View style={styles.field}>
        {/* TODO: Talvez separar a lógica do scale button em um hook (idea) */}

        <CountdownActionButton
          progress={progress}
          onPress={handleRevealPassword}
          onPressIn={pause}
          onPressOut={resume}
          idleText="Reveal password"
          runningText="Viewing…"
        />

        <Text style={styles.passwordHint}>Visible for {seconds} seconds</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 48,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
    textTransform: "uppercase",
    // color: colors.mauve9,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    // color: colors.mauve12,
  },
  passwordContainer: {
    alignItems: "center",
    justifyContent: "center",

    height: 56,
    paddingHorizontal: 16,
    borderRadius: 12,

    // backgroundColor: colors.mauve2,
  },
  password: {
    fontSize: 24,
    lineHeight: 32,
    // color: colors.mauve11,
  },
  passwordHidden: {
    fontSize: 32,
    // color: colors.mauve11,
    justifyContent: "center",
  },
  passwordHint: {
    fontSize: 14,
    lineHeight: 24,
    // color: colors.mauve9,
    textAlign: "center",
  },
});
