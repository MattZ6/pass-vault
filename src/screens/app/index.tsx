import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { ExploreSection } from "./components/explore-section";
import { GeneralSection } from "./components/general-section";
import { InstallationSection } from "./components/installation-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function AppScreen() {
  const safeInsets = useSafeAreaInsets();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));
  const { markInteractive } = useObserve();

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
        <GeneralSection />
        <InstallationSection />
        <ExploreSection />
      </ScrollView>
    </>
  );
}
