import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { getStyles } from "./styles";

export function VaultSection() {
  const totalCount = useVaultStore((s) => s.credentialsMeta).length;
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("storage", {
    keyPrefix: "screen.sections.vault",
  });

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.passwords.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {t("fields.passwords.count", { count: totalCount })}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Card>
    </Section.Root>
  );
}
