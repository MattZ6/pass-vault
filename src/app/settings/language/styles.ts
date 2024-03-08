import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet((theme) => ({
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
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.mauve4,
  },
  button: {
    flexDirection: 'row',
    gap: 16,

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
}))
