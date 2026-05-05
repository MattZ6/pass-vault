import { Stack, useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useHaptics } from "@/hooks/use-haptics";

export function ToolbarActions() {
  const router = useRouter();
  const { t } = useTranslation("home", { keyPrefix: "toolbar.actions" });
  const { performTapFeedback } = useHaptics();

  const handleNavigateToSettings = useCallback(() => {
    performTapFeedback();
    router.push("/settings");
  }, [router.push, performTapFeedback]);

  const handleNavigateToNewCredential = useCallback(() => {
    performTapFeedback();
    router.push("/credentials/new");
  }, [router.push, performTapFeedback]);

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button
          accessibilityLabel={t("settings.label")}
          onPress={handleNavigateToSettings}
        >
          <Stack.Toolbar.Icon sf="ellipsis" />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          accessibilityLabel={t("add_credential.label")}
          onPress={handleNavigateToNewCredential}
        >
          <Stack.Toolbar.Icon sf="plus" />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
    </>
  );
}
