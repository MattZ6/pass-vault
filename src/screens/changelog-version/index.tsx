import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

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
