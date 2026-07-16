import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useLanguage } from "@/hooks/use-language";
import { useStyles } from "@/hooks/use-styles";

import { useVaultStore } from "@/store/credentials/vault.store";

import { BinaryUtils } from "@/utils/binary";
import { DateUtils } from "@/utils/date";

import { getStyles } from "./styles";

const today = new Date();

export function StorageSection() {
  const { language } = useLanguage();
  const sizeInBytes = useVaultStore((s) => s.sizeInBytes);
  const updatedAt = useVaultStore((s) => s.updatedAt);
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("storage", {
    keyPrefix: "screen.sections.storage",
  });

  let lastUpdateDate = t("fields.updated_at.value.empty");

  if (updatedAt) {
    lastUpdateDate = DateUtils.formatDateTime(updatedAt, {
      language,
      hideYear: updatedAt.getFullYear() === today.getFullYear(),
    });
  }

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.size.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {BinaryUtils.formatBytes(sizeInBytes)}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>

        <Section.Divider style={styles.divider} />

        <Section.Item.Root>
          <Section.Item.Content>
            <Section.Item.Content.Title>
              {t("fields.updated_at.label")}
            </Section.Item.Content.Title>
          </Section.Item.Content>
          <Section.Item.Trailing>
            <Text color="muted" style={styles.value}>
              {lastUpdateDate}
            </Text>
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Card>
    </Section.Root>
  );
}
