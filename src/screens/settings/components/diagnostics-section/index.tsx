import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { MenuItem } from "../menu-item";

export function DiagnosticsSection() {
  const { t } = useTranslation("settings", {
    keyPrefix: "screen.sections.diagnostics",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <MenuItem
          title={t("fields.biometrics.label")}
          href="/settings/biometrics"
          leadingIcon={{ ios: "info", android: "fingerprint" }}
        />
      </Card>
    </Section.Root>
  );
}
