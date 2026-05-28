import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { ApplicationService } from "@/services/device/application";

import { getStyles } from "./styles";

const currentVersion = `v${ApplicationService.version}`;

export function LatestReleaseCard() {
  const { t } = useTranslation("changelog", {
    keyPrefix: `changelog.meta.current.${currentVersion}`,
  });
  const { styles, theme } = useStyles(getStyles);

  return (
    <Card color="base">
      <Button>
        <View style={styles.content}>
          <View style={styles.header}>
            <SymbolView
              tintColor={theme.colors.content.base}
              name={{ android: "auto_awesome" }}
              size={20}
            />
            <Text typography="bodySmall" color="muted">
              {currentVersion}
            </Text>
          </View>

          <Text typography="subtitle">{t("title")}</Text>

          <Text color="muted">{t("excerpt")}</Text>
        </View>
      </Button>
    </Card>
  );
}
