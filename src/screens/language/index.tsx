import { ScrollView } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { LanguageSection } from "./components/language-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function LanguageScreen() {
  const { styles } = useStyles(getStyles);

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
      >
        <LanguageSection />
      </ScrollView>
    </>
  );
}
