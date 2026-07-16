import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { AboutSection } from "./components/about-section";
import { DiagnosticsSection } from "./components/diagnostics-section";
import { PreferencesSection } from "./components/preferences-section";
import { PrivacySection } from "./components/privacy-section";
import { ScreenHeader } from "./components/screen-header";
import { StorageSection } from "./components/storage-section";

import { getStyles } from "./styles";

export function SettingsScreen() {
  const { markInteractive } = useObserve();
  const safeInsets = useSafeAreaInsets();
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
        <PreferencesSection />
        <AboutSection />
        <PrivacySection />
        <StorageSection />
        <DiagnosticsSection />
      </ScrollView>
    </>
  );
}
