import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

export function ScreenHeader() {
  const router = useRouter();
  const { t } = useTranslation("settings", { keyPrefix: "meta" });
  const { performTapFeedback } = useHaptics();

  const handleBack = useCallback(() => {
    performTapFeedback();

    if (router.canGoBack()) {
      router.back();
    }
  }, [performTapFeedback, router.back, router.canGoBack]);

  return (
    <SheetHeader.Root>
      <SheetHeader.LeftActions>
        <SheetHeader.LeftActions.Button
          onPress={handleBack}
          iosIcon="xmark"
          androidIcon="close"
        />
      </SheetHeader.LeftActions>
      <SheetHeader.Title>{t("title")}</SheetHeader.Title>
    </SheetHeader.Root>
  );
}
