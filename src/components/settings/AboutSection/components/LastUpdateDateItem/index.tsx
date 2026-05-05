import { SectionItem } from "@/components/Section/Item";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/useLanguage";

import { Icon } from "@/lib/Icon";

import { DateUtils } from "@/utils/Date";

type Props = {
  label: string;
  date: Date;
};

export function LastUpdateDateItem({ label, date }: Props) {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <SectionItem.Root>
      <Icon name="system-update" size={24} color={theme.colors.content.muted} />

      <SectionItem.Label>{label}</SectionItem.Label>

      <SectionItem.Value>
        {DateUtils.format(date, { locale: language })}
      </SectionItem.Value>
    </SectionItem.Root>
  );
}
