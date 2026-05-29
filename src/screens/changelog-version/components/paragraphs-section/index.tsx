import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { useStyles } from "@/hooks/use-styles";
import { getStyles } from "./styles";

type Props = {
  version: string;
};

export function ParagraphsSection({ version }: Props) {
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("versions", {
    keyPrefix: version,
  });

  const paragraphs = t("paragraphs", {
    returnObjects: true,
    defaultValue: [],
  }) as string[];

  return (
    <View style={styles.container}>
      {paragraphs.map((paragraph, index) => (
        <Text key={index.toString()} color="muted">
          {paragraph}
        </Text>
      ))}
    </View>
  );
}
