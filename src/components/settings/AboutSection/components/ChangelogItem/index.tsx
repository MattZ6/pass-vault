import * as ExpoHaptics from 'expo-haptics'
import { useCallback } from 'react'
import { TouchableNativeFeedback } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'

import { Icon } from '@/lib/icon'

type Props = {
  label: string
}

export function ChangelogItem({ label }: Props) {
  const { theme } = useTheme()

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light)
  }, [])

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
      onPress={handleClick}
    >
      <SectionItem.Root>
        <Icon name="history-edu" size={24} color={theme.colors.mauve11} />

        <SectionItem.Label>{label}</SectionItem.Label>

        <Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
      </SectionItem.Root>
    </TouchableNativeFeedback>
  )
}
