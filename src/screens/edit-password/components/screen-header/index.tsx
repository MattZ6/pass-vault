import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

import { SubmitButton } from "./components/submit-button";

type Props = {
  credentialId: string;
};

export function ScreenHeader({ credentialId }: Props) {
  const { t } = useTranslation("edit-password", { keyPrefix: "meta" });

  return (
    <SheetHeader.Root>
      <SheetHeader.BackButton />
      <SheetHeader.Title>{t("title")}</SheetHeader.Title>
      <SheetHeader.RightActions>
        <SubmitButton credentialId={credentialId} />
      </SheetHeader.RightActions>
    </SheetHeader.Root>
  );
}
