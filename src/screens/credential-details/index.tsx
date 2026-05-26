import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { CredentialSection } from "./components/credential-section";
import { DangerSection } from "./components/danger-section";
import { PasswordSection } from "./components/password-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

type Props = { id: string };

export function CredentialDetailsScreen({ id }: Props) {
  const safeInsets = useSafeAreaInsets();
  const credential = useVaultStore((s) => s.getCredentialMeta)({ id });
  const { styles } = useStyles((t) => getStyles(t, safeInsets));

  if (!credential) {
    return (
      <View style={styles.container}>
        <Text color="muted">Credencial não existe</Text>
      </View>
    );
  }

  return (
    <>
      <ScreenHeader title={credential.provider} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <CredentialSection username={credential.username} />
        <PasswordSection credentialId={id} />
        <DangerSection credentialId={id} />
      </ScrollView>
    </>
  );
}
