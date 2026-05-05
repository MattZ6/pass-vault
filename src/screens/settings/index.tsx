import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function SettingsScreen() {
  const { t } = useTranslation("settings", { keyPrefix: "meta" });
  const { styles } = useStyles(getStyles);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.toolbar}>
        <Text weight="semiBold" typography="subtitle" style={styles.title}>
          {t("title")}
        </Text>
      </View>
      <Text color="muted">Here goes the setting screen content.</Text>
    </ScrollView>
  );
}
