import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { DeviceService } from "@/services/device/device";
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
          title={t("fields.application.label")}
          href="/settings/application"
          leadingIcon={{ ios: "info.circle", android: "hexagon" }}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.device.label")}
          href="/settings/device"
          leadingIcon={{
            ios: DeviceService.isTablet() ? "ipad" : "iphone",
            android: "phone_android",
          }}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.biometrics.label")}
          href="/settings/biometrics"
          leadingIcon={{ ios: "touchid", android: "fingerprint" }}
        />
      </Card>
    </Section.Root>
  );
}
