import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'

import { Icon } from '@/lib/icon'

type Props = {
  label: string
  version: string
  buildNumber: string
}

export function VersionItem({ label, version, buildNumber }: Props) {
  const { theme } = useTheme()

  const versionText = `v${version} (${buildNumber})`

  return (
    <SectionItem.Root>
      <Icon name="code" size={24} color={theme.colors.mauve11} />

      <SectionItem.Label>{label}</SectionItem.Label>

      <SectionItem.Value>{versionText}</SectionItem.Value>
    </SectionItem.Root>
  )
}
