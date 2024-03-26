import { StyleSheet } from 'react-native'

import type { Theme } from '@/styles/themes/types'

export function stylesheet(_: Theme) {
  return StyleSheet.create({
    container: {
      gap: 8,
    },
  })
}
