import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { MenuItem } from "../menu-item";

export function PrivacySection() {
  const { t } = useTranslation("settings", {
    keyPrefix: "screen.sections.privacy",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <MenuItem
          title={t("fields.policy.label")}
          href="/settings/privacy-policy"
          leadingIcon={{ ios: "info", android: "security" }}
        />
      </Card>
    </Section.Root>
  );
}
