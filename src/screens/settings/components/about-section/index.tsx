import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useChangelogStore } from "@/store/changelog/changelog.store";

import { MenuItem } from "../menu-item";

export function AboutSection() {
  const hasUnreadVersion = useChangelogStore((s) => s.hasUnreadVersion);
  const { t } = useTranslation("settings", {
    keyPrefix: "screen.sections.about",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <MenuItem
          title={t("fields.about.label")}
          href="/settings/about"
          leadingIcon={{ ios: "info", android: "info" }}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.changelog.label")}
          href="/settings/changelog"
          leadingIcon={{ android: "history_edu", ios: "doc.on.doc" }}
          hasNews={hasUnreadVersion}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.licenses.label")}
          href="/settings/licenses"
          leadingIcon={{ ios: "doc.text", android: "description" }}
        />
      </Card>
    </Section.Root>
  );
}
