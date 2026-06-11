import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { OptInSection } from "./components/opt-in-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function PerformanceMonitoringScreen() {
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
      >
        {/* Just an idea */}
        {/* <Card color="element">
          <Text color="muted">
            Control whether anonymous performance information can be shared to
            help improve the app.
          </Text>
        </Card> */}

        <OptInSection />
      </ScrollView>
    </>
  );
}
