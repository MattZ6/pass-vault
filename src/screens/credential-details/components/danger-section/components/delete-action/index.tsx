import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

import { useConfirm } from "@/hooks/use-confirm";
import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

import { VaultService } from "@/services/vault/credentials";

type Props = {
  credentialId: string;
};

export function DeleteAction({ credentialId }: Props) {
  const router = useRouter();
  const { t } = useTranslation("credential-details", {
    keyPrefix: "screen.sections.danger.fields.delete",
  });
  const { performTapFeedback } = useHaptics();
  const { confirm } = useConfirm();
  const { theme } = useTheme();

  const handleDelete = useCallback(async () => {
    performTapFeedback();

    const confirmed = await confirm({
      title: t("actions.delete.title"),
      description: t("actions.delete.description"),
      cancelLabel: t("actions.delete.cancel-label"),
      confirmLabel: t("actions.delete.confirm-label"),
      destructive: true,
    });

    if (!confirmed) {
      return;
    }

    await VaultService.deleteCredential({ credentialId });

    router.back();
  }, [confirm, credentialId, router.back, performTapFeedback, t]);

  return (
    <Button onPress={handleDelete}>
      <Section.Item.Root>
        <Section.Item.Content>
          <Section.Item.Content.Title>{t("label")}</Section.Item.Content.Title>
          <Section.Item.Content.Description>
            {t("description")}
          </Section.Item.Content.Description>
        </Section.Item.Content>
        <Section.Item.Trailing>
          <Section.Item.Trailing.Icon
            name={{ android: "delete_outline", ios: "delete.right" }}
            tintColor={theme.colors.content.error}
          />
        </Section.Item.Trailing>
      </Section.Item.Root>
    </Button>
  );
}
