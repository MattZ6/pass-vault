import { StyleSheet } from 'react-native'

import { Theme } from '@/styles/themes/types'

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.mauve1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,

      padding: 16,

      borderBottomWidth: 1,
      borderBottomColor: theme.colors.mauve6,

      backgroundColor: theme.colors.mauve2,
    },
    title: {
      fontFamily: theme.fonts.family.medium,
      fontSize: theme.fonts.size.heading.lg,
      color: theme.colors.mauve12,
    },
    scrollContent: {
      paddingTop: 8,
      paddingBottom: 24,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.mauve4,
    },
    button: {
      flexDirection: 'row',
      gap: 16,

      minHeight: 56,
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    buttonContent: {
      flex: 1,
    },
    buttonLabel: {
      fontFamily: theme.fonts.family.medium,
      fontSize: theme.fonts.size.body.md,
      color: theme.colors.mauve12,
    },
    buttonValue: {
      fontFamily: theme.fonts.family.regular,
      fontSize: theme.fonts.size.body.md,
      color: theme.colors.mauve11,
    },
  })
}
