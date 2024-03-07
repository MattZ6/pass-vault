import { Pressable, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { theme } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const insets = useSafeAreaInsets()
  const { language } = useLanguage()
  const { t: settingsT } = useTranslation('settings')
  const { t: languagesT } = useTranslation('languages')

  return (
    <View>
      <View style={[styles.header, { paddingTop: styles.header.padding + insets.top }]}>
        <Pressable>
          <MaterialIcon name="arrow-back" size={24} color={theme.colors.mauve11} />
        </Pressable>

        <Text style={styles.title}>{settingsT('title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{settingsT('app.title')}</Text>
          </View>

          <View style={styles.sectionContent}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
            >
              <View style={styles.button}>
                <MaterialIcon name="palette" size={24} color={theme.colors.mauve11} />

                <Text style={styles.buttonLabel}>{settingsT('app.theme')}</Text>

                <Text style={styles.buttonValue}>Escuro</Text>

                <MaterialIcon name="chevron-right" size={24} color={theme.colors.mauve11} />
              </View>
            </TouchableNativeFeedback>

            <View style={styles.divider} />

            <Link href="/settings/language" asChild>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
              >
                <View style={styles.button}>
                  <MaterialIcon name="translate" size={24} color={theme.colors.mauve11} />

                  <Text style={styles.buttonLabel}>{settingsT('app.language')}</Text>

                  <Text style={styles.buttonValue}>{languagesT(`${language}.title`)}</Text>

                  <MaterialIcon name="chevron-right" size={20} color={theme.colors.mauve11} />
                </View>
              </TouchableNativeFeedback>
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{settingsT('about.title')}</Text>
          </View>

          <View style={styles.sectionContent}>
            <View style={styles.button}>
              <MaterialIcon name="code" size={24} color={theme.colors.mauve11} />

              <Text style={styles.buttonLabel}>{settingsT('about.version')}</Text>

              <Text style={styles.buttonValue}>v0.1.0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.button}>
              <MaterialIcon name="system-update" size={24} color={theme.colors.mauve11} />

              <Text style={styles.buttonLabel}>{settingsT('about.last-update')}</Text>

              <Text style={styles.buttonValue}>20 de abril</Text>
            </View>

            <View style={styles.divider} />

            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
            >
              <View style={styles.button}>
                <MaterialIcon name="history-edu" size={24} color={theme.colors.mauve11} />

                <Text style={styles.buttonLabel}>{settingsT('about.changelog')}</Text>

                <MaterialIcon name="chevron-right" size={20} color={theme.colors.mauve11} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

    padding: 16,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mauve6,

    backgroundColor: theme.colors.mauve2
  },
  title: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.heading.lg,
    color: theme.colors.mauve12
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
    color: theme.colors.mauve11
  },
  sectionContent: {
    borderRadius: theme.radii.lg,

    marginLeft: 16,
    marginRight: 16,

    backgroundColor: theme.colors.mauve2,

    overflow: 'hidden'
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

    marginRight: 'auto'

  },
  buttonValue: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve11,

  },
})
