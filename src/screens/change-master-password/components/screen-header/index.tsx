import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { SubmitButton } from "./components/submit-button";

export function ScreenHeader() {
  const { t } = useTranslation("change-master-password", {
    keyPrefix: "meta",
  });

  return (
    <SheetHeader.Root>
      <SheetHeader.BackButton />
      <SheetHeader.Title>{t("title")}</SheetHeader.Title>
      <SheetHeader.RightActions>
        <SubmitButton />
      </SheetHeader.RightActions>
    </SheetHeader.Root>
  );
}
