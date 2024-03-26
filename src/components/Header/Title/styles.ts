import { StyleSheet } from 'react-native'

import { Theme } from '@/styles/themes/types'

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    title: {
      fontFamily: theme.fonts.family.medium,
      fontSize: theme.fonts.size.heading.lg,
      color: theme.colors.mauve12,
    },
  })
}
