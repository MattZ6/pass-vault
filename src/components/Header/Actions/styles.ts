import { StyleSheet } from 'react-native'

import { Theme } from '@/styles/themes/types'

export function stylesheet(_: Theme) {
  return StyleSheet.create({
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,

      marginLeft: 'auto',
      marginRight: -10,
    },
  })
}
