import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

import { useLanguage } from "@/hooks/use-language";
import { useStyles } from "@/hooks/use-styles";
import { DateUtils } from "@/utils/date";

import { getStyles } from "./styles";

type Props = {
  version: string;
};

export function VersionHeader({ version }: Props) {
  const { language } = useLanguage();
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("changelog", {
    keyPrefix: `changelog.meta.${version}`,
  });

  const formattedDate = DateUtils.formatDate(DateUtils.toDate(t("date")), {
    language,
  });

  return (
    <View style={styles.container}>
      <Text typography="title" weight="medium">
        {t("title")}
      </Text>
      <Text typography="bodySmall" color="muted">
        {formattedDate}
      </Text>
    </View>
  );
}
