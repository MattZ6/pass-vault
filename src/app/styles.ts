import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  scrollContainer: {},
  card: {
    borderWidth: 1,
    borderColor: theme.colors.mauve6,
    borderRadius: theme.radii.lg,

    backgroundColor: theme.colors.mauve2,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.mauve6,
  },
  provider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  providerIconContainer: {
    flexShrink: 0,

    width: 48,
    height: 48,
    borderRadius: theme.radii.md,

    backgroundColor: theme.colors.mauve3,
  },
  providerContent: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve11,
  },
  value: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve12,
  },
}))
