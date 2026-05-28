import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { AlphaReleasesSection } from "./components/alpha-releases-section";
import { HistorySection } from "./components/history-section";
import { LatestReleaseSection } from "./components/latest-release-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

export function ChangelogScreen() {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={{
          start: theme.size[2],
          end: theme.size[8],
        }}
      >
        <LatestReleaseSection />
        <HistorySection />
        <AlphaReleasesSection />
      </ScrollView>
    </>
  );
}
