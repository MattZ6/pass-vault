import { useTranslation } from "react-i18next";

import { Section } from "@/components/ui/section";

import { LatestReleaseCard } from "./components/latest-release-card";

type LatestRelease = {
  tag: string;
  label?: string;
  title: string;
  excerpt: string;
  date: Date;
};

type Props = {
  release: LatestRelease;
};

export function LatestReleaseSection({ release }: Props) {
  const { t } = useTranslation("changelog", {
    keyPrefix: "screen.sections.latest",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <LatestReleaseCard release={release} />
    </Section.Root>
  );
}
