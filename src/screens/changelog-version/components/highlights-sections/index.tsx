import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Section = {
  type: "highlight";
  title: string;
  highlights: string[];
};

type Props = {
  version: string;
};

export function HighlightsSections({ version }: Props) {
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("versions", {
    keyPrefix: version,
  });

  const sections = t("sections", {
    returnObjects: true,
    defaultValue: [],
  }) as Section[];

  return (
    <>
      {sections.map((section) => (
        <View key={section.type} style={styles.section}>
          <View style={styles.header}>
            {/* <SymbolView
              name={{ android: "arrow_warm_up" }}
              tintColor={theme.colors.content.element}
              size={16}
            /> */}
            <Text weight="medium">{section.title}</Text>
          </View>

          <View style={styles.highlights}>
            {section.highlights.map((highlight, index) => (
              <View key={index.toString()} style={styles.highlight}>
                <View style={styles.dot} />
                <View style={styles.highlightContent}>
                  <Text color="muted">{highlight}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </>
  );
}
