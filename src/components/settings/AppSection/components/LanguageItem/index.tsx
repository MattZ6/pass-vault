import * as ExpoHaptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableNativeFeedback } from 'react-native'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'

import { Icon } from '@/lib/icon'

type Props = {
  label: string
}

export function LanguageItem({ label }: Props) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { t } = useTranslation('languages')

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light)
  }, [])

  return (
    <Link href="/settings/language" asChild>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
        onPress={handleClick}
      >
        <SectionItem.Root>
          <Icon name="translate" size={24} color={theme.colors.mauve11} />

          <SectionItem.Label>{label}</SectionItem.Label>

          <SectionItem.Value>{t(`${language}.title`)}</SectionItem.Value>

          <Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
        </SectionItem.Root>
      </TouchableNativeFeedback>
    </Link>
  )
}
