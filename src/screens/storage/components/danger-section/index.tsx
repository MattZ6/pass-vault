import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import { useConfirm } from "@/hooks/use-confirm";
import { useHaptics } from "@/hooks/use-haptics";

import { VaultService } from "@/services/vault/credentials";

export function DangerSection() {
  const { confirm } = useConfirm();
  const { performTapFeedback } = useHaptics();
  const { t } = useTranslation("storage", {
    keyPrefix: "screen.sections.danger",
  });

  const handleDelete = useCallback(async () => {
    performTapFeedback();

    const confirmed = await confirm({
      title: t("fields.delete.actions.delete.title"),
      description: t("fields.delete.actions.delete.description"),
      cancelLabel: t("fields.delete.actions.delete.cancel_label"),
      confirmLabel: t("fields.delete.actions.delete.confirm_label"),
      destructive: true,
    });

    if (!confirmed) {
      return;
    }

    // TODO: request biometrics

    await VaultService.deleteAllCredentials();
  }, [confirm, performTapFeedback, t]);

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        <Button onPress={handleDelete}>
          <Section.Item.Root>
            <Section.Item.Content>
              <Section.Item.Content.Title>
                {t("fields.delete.label")}
              </Section.Item.Content.Title>
              <Section.Item.Content.Description>
                {t("fields.delete.description")}
              </Section.Item.Content.Description>
            </Section.Item.Content>

            <Section.Item.Trailing>
              <Section.Item.Trailing.Icon
                name={{ android: "delete" }}
                color="error"
              />
            </Section.Item.Trailing>
          </Section.Item.Root>
        </Button>
      </Card>
    </Section.Root>
  );
}
