import { StyleSheet } from 'react-native'

import { Theme } from '@/styles/themes/types'

export function stylesheet(theme: Theme) {
  const SIZE = 44

  return StyleSheet.create({
    wrapper: {
      width: SIZE,
      height: SIZE,
      borderRadius: theme.radii.full,

      overflow: 'hidden',

      marginLeft: -10,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',

      width: SIZE,
      height: SIZE,
      borderRadius: theme.radii.full,
    },
  })
}
