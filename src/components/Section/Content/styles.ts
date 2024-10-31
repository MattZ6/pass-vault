import { StyleSheet } from 'react-native'

import type { Theme } from '@/styles/themes/types'

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: theme.radii.lg,

      marginLeft: 16,
      marginRight: 16,

      backgroundColor: theme.colors.mauve2,

      overflow: 'hidden',

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.mauve4,
    },
  })
}
