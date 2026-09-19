import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { EditCredentialWebsiteForm } from "./components/form";
import { ScreenHeader } from "./components/screen-header";

import { useEditCredentialWebsiteForm } from "./hooks/use-edit-credential-website-form";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
};

export function EditWebsiteScreen({ credentialId }: Props) {
  const { markInteractive } = useObserve();
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const form = useEditCredentialWebsiteForm();

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
        <EditCredentialWebsiteForm
          credentialId={credentialId}
          website={metadata.website}
        />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}
