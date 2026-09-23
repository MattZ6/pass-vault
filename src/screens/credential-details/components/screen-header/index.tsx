import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { useHaptics } from "@/hooks/use-haptics";

type Props = {
  title: string;
};

export function ScreenHeader({ title }: Props) {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common", { keyPrefix: "actions" });
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
          accessibilityLabel={tCommon("close")}
        />
      </SheetHeader.LeftActions>
      <SheetHeader.Title>{title}</SheetHeader.Title>
    </SheetHeader.Root>
  );
}
