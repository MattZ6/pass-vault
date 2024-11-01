import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { InteractionManager } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { IconButton } from '@/components/IconButton'

import { Icon } from '@/lib/Icon'
import { View } from '@/lib/View'

import { stylesheet } from './styles'

export function HeaderBackButton() {
  const { theme } = useTheme()
  const styles = stylesheet()

  const handleBack = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      const canGoBack = router.canGoBack()

      if (!canGoBack) {
        return
      }

      router.back()
    })
  }, [])

  return (
    <View style={styles.wrapper}>
      <IconButton onPress={handleBack}>
        <Icon name="arrow-back" size={24} color={theme.colors.mauve11} />
      </IconButton>
    </View>
  )
}
