import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'

import { Icon } from '@/lib/Icon'

type Props = {
  label: string
  name: string
}

export function NameItem({ label, name }: Props) {
  const { theme } = useTheme()

  return (
    <SectionItem.Root>
      <Icon name="explore" size={24} color={theme.colors.mauve11} />

      <SectionItem.Label>{label}</SectionItem.Label>

      <SectionItem.Value>{name}</SectionItem.Value>
    </SectionItem.Root>
  )
}
