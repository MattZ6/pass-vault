import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { MenuItem } from "../menu-item";

export function StorageSection() {
  const { t } = useTranslation("settings", {
    keyPrefix: "screen.sections.storage",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <MenuItem
          title={t("fields.storage.label")}
          href="/settings/storage"
          leadingIcon={{ ios: "info", android: "home_storage" }}
        />
      </Card>
    </Section.Root>
  );
}
