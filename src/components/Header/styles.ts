import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet((theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    padding: 16,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mauve6,
  },
  text: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.heading.lg,
    color: theme.colors.mauve12,
  },
}))
