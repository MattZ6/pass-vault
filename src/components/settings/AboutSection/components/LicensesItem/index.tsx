import * as ExpoHaptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { SectionItem } from '@/components/Section/Item'

import { Icon } from '@/lib/icon'

type TouchableProps = TouchableNativeFeedbackProps | TouchableOpacityProps

function Touchable(props: TouchableProps) {
  if (Platform.OS === 'android') {
    return <TouchableNativeFeedback {...props} />
  }

  return <TouchableOpacity {...props} />
}

type Props = {
  label: string
}

export function LicensesItem({ label }: Props) {
  const { theme } = useTheme()

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light)
  }, [])

  return (
    <Link href="/settings/licenses" asChild>
      <Touchable
        background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
        onPress={handleClick}
      >
        <SectionItem.Root>
          <Icon name="description" size={24} color={theme.colors.mauve11} />

          <SectionItem.Label>{label}</SectionItem.Label>

          <Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
        </SectionItem.Root>
      </Touchable>
    </Link>
  )
}
