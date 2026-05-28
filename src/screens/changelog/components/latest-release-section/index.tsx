import { useTranslation } from "react-i18next";

import { Section } from "@/components/ui/section";

import { LatestReleaseCard } from "./components/latest-release-card";

export function LatestReleaseSection() {
  const { t } = useTranslation("changelog", {
    keyPrefix: "screen.sections.latest",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <LatestReleaseCard />
    </Section.Root>
  );
}
