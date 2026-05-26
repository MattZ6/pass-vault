import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useInstallationDates } from "@/hooks/use-installation-dates";
import { useLanguage } from "@/hooks/use-language";

import { ApplicationService } from "@/services/device/application";

import { ItemDivider } from "../item-divider";

export function AppSection() {
  const { t } = useTranslation("about", {
    keyPrefix: "screen.sections.app",
  });
  const { language } = useLanguage();
  const { data } = useInstallationDates();

  const version = `v${ApplicationService.version} (${ApplicationService.build})`;

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.version.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text>{version}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <ItemDivider />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.installed_at.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text>
              {data?.installedAt ? formatDate(data.installedAt, language) : "-"}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        {data?.updatedAt && (
          <>
            <ItemDivider />

            <Section.Item.Root>
              <Section.Item.Content>
                <Section.Item.Content.Title>
                  {t("fields.updated_at.label")}
                </Section.Item.Content.Title>
              </Section.Item.Content>
              <Section.Item.Trailing>
                <Text>{formatDate(data.updatedAt, language)}</Text>
              </Section.Item.Trailing>
            </Section.Item.Root>
          </>
        )}
      </Card>
    </Section.Root>
  );
}

function formatDate(date: Date, language: string) {
  const now = new Date();
  const isSameYear = date.getFullYear() === now.getFullYear();

  return date.toLocaleString(language, {
    year: !isSameYear ? "numeric" : undefined,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });
}
