import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

import { useLanguage } from "@/hooks/use-language";
import { useStyles } from "@/hooks/use-styles";

import { DateUtils } from "@/utils/date";

import { getStyles } from "./styles";

type Props = {
  updatedAt?: Date;
};

export function FooterSection({ updatedAt }: Props) {
  const { styles } = useStyles(getStyles);
  const { language } = useLanguage();
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.credential",
  });

  if (!updatedAt) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text typography="bodySmall" color="muted" style={styles.text}>
        {t("fields.updated_at.label")}{" "}
        <Text typography="bodySmall" color="base">
          {DateUtils.formatDate(updatedAt, { language })}
        </Text>
      </Text>
    </View>
  );
}
