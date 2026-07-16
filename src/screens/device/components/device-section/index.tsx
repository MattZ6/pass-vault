import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { DeviceService } from "@/services/device/device";

import { ItemDivider } from "../item-divider";

export function DeviceSection() {
  const { t } = useTranslation("device", {
    keyPrefix: "screen.sections.device",
  });

  return (
    <Section.Root>
      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.manufacturer.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text>{DeviceService.manufacturer}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <ItemDivider />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.model.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text>{DeviceService.modelName}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Card>
    </Section.Root>
  );
}
