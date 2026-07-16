import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useInstallationDates } from "@/hooks/use-installation-dates";
import { useLanguage } from "@/hooks/use-language";

import { DateUtils } from "@/utils/date";

import { ItemDivider } from "../item-divider";

const currentYear = new Date().getFullYear();

export function InstallationSection() {
  const { language } = useLanguage();
  const { data } = useInstallationDates();
  const { t } = useTranslation("application", {
    keyPrefix: "screen.sections.installation",
  });

  let installedAt = "";
  let updatedAt = "";

  if (data?.installedAt) {
    installedAt = DateUtils.formatDateTime(data.installedAt, {
      language,
      hideYear: data.installedAt.getFullYear() === currentYear,
    });
  }
  if (data?.updatedAt) {
    updatedAt = DateUtils.formatDateTime(data.updatedAt, {
      language,
      hideYear: data.updatedAt.getFullYear() === currentYear,
    });
  }

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("title")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.installed-at.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted">{installedAt}</Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        {Platform.OS === "android" && (
          <>
            <ItemDivider />

            <Section.Item.Root>
              <Section.Item.Content>
                <Section.Item.Content.Title>
                  {t("fields.updated-at.label")}
                </Section.Item.Content.Title>
              </Section.Item.Content>
              <Section.Item.Trailing>
                <Text color="muted">{updatedAt}</Text>
              </Section.Item.Trailing>
            </Section.Item.Root>
          </>
        )}
      </Card>
    </Section.Root>
  );
}
