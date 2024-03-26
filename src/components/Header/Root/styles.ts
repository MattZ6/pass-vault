import { StyleSheet } from 'react-native'

import { Theme } from '@/styles/themes/types'

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,

      padding: 16,

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.mauve4,

      backgroundColor: theme.colors.mauve2,
    },
  })
}
