import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { DeviceService } from "@/services/device/device";
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
          leadingIcon={{ ios: "hand.raised", android: "security" }}
        />

        <Section.Divider />

        <MenuItem
          title={t("fields.performance.label")}
          href="/settings/performance"
          leadingIcon={{
            ios: DeviceService.isTablet()
              ? "ipad.badge.checkmark"
              : "iphone.badge.checkmark",
            android: "query_stats",
          }}
        />
      </Card>
    </Section.Root>
  );
}
