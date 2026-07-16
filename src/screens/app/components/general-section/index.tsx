import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { ApplicationService } from "@/services/application/application";

import { ItemDivider } from "../item-divider";

export function GeneralSection() {
  const { t } = useTranslation("application", {
    keyPrefix: "screen.sections.general",
  });

  return (
    <Section.Root>
      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.version.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted">{ApplicationService.version}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <ItemDivider />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.build.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted">{ApplicationService.build}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <ItemDivider />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.package.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted">{ApplicationService.package}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Card>
    </Section.Root>
  );
}
