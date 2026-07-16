import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { stores } from "@/config/stores";

import { useHaptics } from "@/hooks/use-haptics";

export function ExploreSection() {
  const { performTapFeedback } = useHaptics();
  const { t } = useTranslation("application", {
    keyPrefix: "screen.sections.explore",
  });

  const handleOpenPlayStore = useCallback(() => {
    performTapFeedback();
    Linking.openURL(stores.playStore.url);
  }, [performTapFeedback]);

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("title")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Button onPress={handleOpenPlayStore}>
          <Section.Item.Root>
            <Section.Item.Leading>
              <Section.Item.Leading.Icon name={{ android: "shop" }} />
            </Section.Item.Leading>
            <Section.Item.Content>
              <Section.Item.Content.Title>
                {t("fields.play-store.label")}
              </Section.Item.Content.Title>
              <Section.Item.Content.Description>
                {t("fields.play-store.description")}
              </Section.Item.Content.Description>
            </Section.Item.Content>
            <Section.Item.Trailing>
              <Section.Item.Trailing.Icon name={{ android: "arrow_outward" }} />
            </Section.Item.Trailing>
          </Section.Item.Root>
        </Button>
      </Card>
    </Section.Root>
  );
}
