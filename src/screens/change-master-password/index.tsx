import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { ChangeMasterPasswordForm } from "./components/form";
import { ScreenHeader } from "./components/screen-header";

import { useChangeMasterPasswordForm } from "./hooks/use-change-master-password-form";

import { getStyles } from "./styles";

export function ChangeMasterPasswordScreen() {
  const { markInteractive } = useObserve();
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const form = useChangeMasterPasswordForm();

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <FormProvider {...form}>
      <ScreenHeader />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={styles.fadingEdgeLength}
      >
        <ChangeMasterPasswordForm />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}
