import { KeyboardAvoidingView, ScrollView } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { CreateCredentialForm } from "./components/form";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function NewCredentialScreen() {
  const { styles } = useStyles(getStyles);

  return (
    <>
      <ScreenHeader />

      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.list}
          contentContainerStyle={styles.scrollContainer}
        >
          <CreateCredentialForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
