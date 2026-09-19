import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { CurrentPasswordSection } from "./components/current-password-section";
import { EditCredentialPasswordForm } from "./components/form";
import { ScreenHeader } from "./components/screen-header";

import { useEditCredentialPasswordForm } from "./hooks/use-edit-credential-password-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function EditPasswordScreen({ credentialId }: Props) {
  const { markInteractive } = useObserve();
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const form = useEditCredentialPasswordForm();

  const metadata = useVaultStore((s) => s.getCredentialMeta)({
    id: credentialId,
  });

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  if (!metadata) {
    // TODO: o que fazer?
    return null;
  }

  return (
    <FormProvider {...form}>
      <ScreenHeader credentialId={credentialId} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={styles.fadingEdgeLength}
      >
        <CurrentPasswordSection credentialId={credentialId} />
        <EditCredentialPasswordForm credentialId={credentialId} />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}
