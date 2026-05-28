import { useTranslation } from "react-i18next";

import { Section } from "@/components/ui/section";

import { ReleasesList } from "./components/releases-list";

export function AlphaReleasesSection() {
  const { t } = useTranslation("changelog", {
    keyPrefix: "screen.sections.alpha",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <ReleasesList />
    </Section.Root>
  );
}
