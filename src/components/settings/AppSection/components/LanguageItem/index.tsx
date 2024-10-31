import * as ExpoHaptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'
import { TouchableScale } from '@/components/TouchableScale'

import { Icon } from '@/lib/Icon'

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
      <TouchableScale onPress={handleClick}>
        <SectionItem.Root>
          <Icon name="translate" size={24} color={theme.colors.mauve11} />

          <SectionItem.Label>{label}</SectionItem.Label>

          <SectionItem.Value>{t(`${language}.title`)}</SectionItem.Value>

          <Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
        </SectionItem.Root>
      </TouchableScale>
    </Link>
  )
}
