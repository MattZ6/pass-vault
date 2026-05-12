import { ScrollView } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { ScreenHeader } from "./components/screen-header";
import { ThemeSection } from "./components/theme-section";

import { getStyles } from "./styles";

export function AppearanceScreen() {
  const { styles } = useStyles(getStyles);

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
      >
        <ThemeSection />
      </ScrollView>
    </>
  );
}
