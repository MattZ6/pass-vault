import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { PerformanceMonitoringService } from "@/services/analytics/performance-monitoring";

import { Switch } from "./components/switch";

import { getStyles } from "./styles";

export function OptInSection() {
  const [isChecked, setIsChecked] = useState(
    PerformanceMonitoringService.isEnabled(),
  );
  const { styles } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const { t } = useTranslation("performance", {
    keyPrefix: "screen.sections.diagnostics",
  });

  const handleToggle = useCallback(() => {
    performTapFeedback();
    setIsChecked((prevState) => !prevState);
    PerformanceMonitoringService.toggle();
  }, [performTapFeedback]);

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Button onPress={handleToggle}>
          <Section.Item.Root>
            <Section.Item.Content>
              <Section.Item.Content.Title numberOfLines={undefined}>
                {t("fields.share.label")}
              </Section.Item.Content.Title>
              <Section.Item.Content.Description numberOfLines={undefined}>
                {t("fields.share.description")}
              </Section.Item.Content.Description>
            </Section.Item.Content>

            <Section.Item.Trailing style={{ alignSelf: "flex-start" }}>
              <Switch value={isChecked} />
            </Section.Item.Trailing>
          </Section.Item.Root>
        </Button>
      </Card>

      <Text color="muted" typography="bodySmall" style={styles.hint}>
        {t("hint")}
      </Text>
    </Section.Root>
  );
}
