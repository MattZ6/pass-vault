import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { PreferencesSection } from "./components/preferences-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function SettingsScreen() {
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <PreferencesSection />
      </ScrollView>
    </>
  );
}
