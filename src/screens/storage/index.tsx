import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { DangerSection } from "./components/danger-section";
import { ScreenHeader } from "./components/screen-header";
import { StorageSection } from "./components/storage-section";
import { VaultSection } from "./components/vault-section";

import { getStyles } from "./styles";

export function StorageScreen() {
  const safeInsets = useSafeAreaInsets();
  const { markInteractive } = useObserve();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={styles.fadingEdgeLength}
      >
        <VaultSection />
        <StorageSection />
        <DangerSection />
      </ScrollView>
    </>
  );
}
