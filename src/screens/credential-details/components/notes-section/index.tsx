import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = {
  notes?: string;
};

export function NotesSection({ notes }: Props) {
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.notes",
  });

  if (!notes?.trim().length) {
    return null;
  }

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element" style={styles.card}>
        <Text typography="bodySmall" color="muted">
          {notes}
        </Text>
      </Card>
    </Section.Root>
  );
}
