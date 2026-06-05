import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { DeleteAction } from "./components/delete-action";

type Props = {
  credentialId: string;
};

export function DangerSection({ credentialId }: Props) {
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.danger",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <DeleteAction credentialId={credentialId} />
      </Card>
    </Section.Root>
  );
}
