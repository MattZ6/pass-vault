import { useTranslation } from "react-i18next";

import { SheetHeader } from "@/components/ui/sheet-header";

type Props = {
  version: string;
};

export function ScreenHeader({ version }: Props) {
  const { t } = useTranslation("changelog", {
    keyPrefix: `changelog.meta.${version}`,
  });

  return (
    <SheetHeader.Root>
      <SheetHeader.BackButton />
      <SheetHeader.Title>
        {t("label", { defaultValue: version })}
      </SheetHeader.Title>
    </SheetHeader.Root>
  );
}
