import { SectionItem } from "@/components/Section/Item";

import { useTheme } from "@/hooks/use-theme";

import { Icon } from "@/lib/Icon";

type Props = {
  label: string;
  name: string;
};

export function NameItem({ label, name }: Props) {
  const { theme } = useTheme();

  return (
    <SectionItem.Root>
      <Icon name="explore" size={24} color={theme.colors.content.muted} />

      <SectionItem.Label>{label}</SectionItem.Label>

      <SectionItem.Value>{name}</SectionItem.Value>
    </SectionItem.Root>
  );
}
