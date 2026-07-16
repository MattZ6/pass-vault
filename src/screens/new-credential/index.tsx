import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { useStyles } from "@/hooks/use-styles";

import { CreateCredentialForm } from "./components/form";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function NewCredentialScreen() {
  const { styles, theme } = useStyles(getStyles);
  const { markInteractive } = useObserve();

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <>
      <ScreenHeader />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        bottomOffset={theme.size["24"]}
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
      >
        <CreateCredentialForm />
      </KeyboardAwareScrollView>
    </>
  );
}
