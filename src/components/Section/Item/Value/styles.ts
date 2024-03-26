import { StyleSheet } from 'react-native'

import type { Theme } from '@/styles/themes/types'

export const SectionItemValueStyles = {
  stylesheet(theme: Theme) {
    return StyleSheet.create({
      value: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.size.body.md,
        color: theme.colors.mauve11,
      },
    })
  },
}
