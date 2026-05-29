import { useTranslation } from "react-i18next";

import { Section } from "@/components/ui/section";

import { ReleasesList } from "./components/releases-list";

type Release = {
  tag: string;
  label?: string;
  title: string;
  excerpt: string;
};

type Props = {
  releases: Release[];
};

export function AlphaReleasesSection({ releases }: Props) {
  const { t } = useTranslation("changelog", {
    keyPrefix: "screen.sections.alpha",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <ReleasesList releases={releases} />
    </Section.Root>
  );
}
