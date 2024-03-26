import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { InteractionManager, TouchableNativeFeedback } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { Icon } from '@/lib/icon'
import { View } from '@/lib/View'

import { stylesheet } from './styles'

export function HeaderBackButton() {
  const { theme } = useTheme()
  const styles = stylesheet(theme)

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
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, true)}
        onPress={handleBack}
      >
        <View style={styles.content}>
          <Icon name="arrow-back" size={24} color={theme.colors.mauve11} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}
