import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { CredentialSection } from "./components/credential-section";
import { DangerSection } from "./components/danger-section";
import { FooterSection } from "./components/footer-section";
import { NotesSection } from "./components/notes-section";
import { PasswordSection } from "./components/password-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

type Props = {
  id: string;
};

export function CredentialDetailsScreen({ id }: Props) {
  const safeInsets = useSafeAreaInsets();
  const credential = useVaultStore((s) =>
    s.credentialsMeta.find((credential) => credential.id === id),
  );
  const { styles } = useStyles((t) => getStyles(t, safeInsets));
  const { markInteractive } = useObserve();

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

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
        fadingEdgeLength={styles.fadingEdgeLength}
      >
        <CredentialSection
          credentialId={credential.id}
          provider={credential.provider}
          username={credential.username}
          website={credential.website}
        />
        <PasswordSection credentialId={id} />
        <NotesSection credentialId={credential.id} notes={credential.notes} />
        <DangerSection credentialId={id} />
        <FooterSection updatedAt={credential.updatedAt} />
      </ScrollView>
    </>
  );
}
