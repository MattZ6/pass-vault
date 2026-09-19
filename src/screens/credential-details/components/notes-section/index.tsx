import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = {
  credentialId: string;
  notes?: string;
};

export function NotesSection({ credentialId, notes }: Props) {
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.notes",
  });

  const hasNotes = Boolean(notes?.trim().length);

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>

        <Link asChild href={`/credentials/${credentialId}/edit/notes`}>
          <IconButton size={10} onPress={performTapFeedback}>
            <SymbolView
              name={{ android: "edit" }}
              tintColor={theme.colors.content.element}
            />
          </IconButton>
        </Link>
      </Section.Header>

      <Card color="element" style={styles.card}>
        <Text typography="bodySmall" color="muted">
          {hasNotes ? notes : t("empty")}
        </Text>
      </Card>
    </Section.Root>
  );
}
