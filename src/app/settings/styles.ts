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
      paddingVertical: 24,
      gap: 24,
    },
    section: {
      gap: 8,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.mauve4,
    },
    sectionHeader: {
      paddingHorizontal: 16,
    },
    sectionLabel: {
      fontFamily: theme.fonts.family.medium,
      fontSize: theme.fonts.size.heading.xs,
      color: theme.colors.mauve11,
    },
    sectionContent: {
      borderRadius: theme.radii.lg,

      marginLeft: 16,
      marginRight: 16,

      backgroundColor: theme.colors.mauve2,

      overflow: 'hidden',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,

      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    buttonContent: {
      flex: 1,
      flexDirection: 'column',
    },
    buttonLabel: {
      fontFamily: theme.fonts.family.medium,
      fontSize: theme.fonts.size.body.md,
      color: theme.colors.mauve12,

      marginRight: 'auto',
    },
    buttonValue: {
      fontFamily: theme.fonts.family.regular,
      fontSize: theme.fonts.size.body.md,
      color: theme.colors.mauve11,
    },
  })
}
