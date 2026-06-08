import { useObserve } from "expo-observe";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { ChangelogService } from "@/services/changelog/changelog";
import { ApplicationService } from "@/services/device/application";

import { DevNoteSection } from "./components/dev-note-section";
import { HighlightsSections } from "./components/highlights-sections";
import { ParagraphsSection } from "./components/paragraphs-section";
import { ScreenHeader } from "./components/screen-header";
import { VersionHeader } from "./components/version-header";

import { getStyles } from "./styles";

type Props = {
  version: string;
};

export function ChangelogVersionScreen({ version }: Props) {
  const edgeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, edgeInsets));
  const { markInteractive } = useObserve();

  useEffect(() => {
    if (version === ApplicationService.version) {
      ChangelogService.markCurrentVersionAsSeen();
    }
  }, [version]);

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <>
      <ScreenHeader version={version} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={{
          start: theme.size[2],
          end: theme.size[8],
        }}
      >
        <VersionHeader version={version} />
        <ParagraphsSection version={version} />
        <HighlightsSections version={version} />
        <DevNoteSection version={version} />
      </ScrollView>
    </>
  );
}
