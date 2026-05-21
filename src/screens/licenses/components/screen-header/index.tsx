import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

export function ScreenHeader() {
  const { t } = useTranslation("licenses", { keyPrefix: "meta" });

  return (
    <SheetHeader.Root>
      <SheetHeader.BackButton />
      <SheetHeader.Title>{t("title")}</SheetHeader.Title>
    </SheetHeader.Root>
  );
}
