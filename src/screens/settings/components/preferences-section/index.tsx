import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { MenuItem } from "../menu-item";

export function PreferencesSection() {
  const { t } = useTranslation("settings", {
    keyPrefix: "screen.sections.preferences",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <MenuItem
          title={t("fields.appearance.label")}
          href="/settings/appearance"
          leadingIcon={{ ios: "paintpalette.fill", android: "palette" }}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.language.label")}
          href="/settings/language"
          leadingIcon={{ ios: "translate", android: "translate" }}
        />
      </Card>
    </Section.Root>
  );
}
