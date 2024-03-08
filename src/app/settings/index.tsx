import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'
import {
  Pressable,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles'

import { useLanguage } from '@/hooks/useLanguage'

import { stylesheet } from './styles'

export default function SettingsPage() {
  const { styles, theme } = useStyles(stylesheet)
  const insets = useSafeAreaInsets()
  const { language } = useLanguage()
  const { t: settingsT } = useTranslation('settings')
  const { t: languagesT } = useTranslation('languages')

  return (
    <View>
      <View
        style={[
          styles.header,
          { paddingTop: styles.header.padding + insets.top },
        ]}
      >
        <Pressable>
          <MaterialIcon
            name="arrow-back"
            size={24}
            color={theme.colors.mauve11}
          />
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
              background={TouchableNativeFeedback.Ripple(
                theme.colors.mauve5,
                false,
              )}
            >
              <View style={styles.button}>
                <MaterialIcon
                  name="palette"
                  size={24}
                  color={theme.colors.mauve11}
                />

                <Text style={styles.buttonLabel}>{settingsT('app.theme')}</Text>

                <Text style={styles.buttonValue}>Escuro</Text>

                <MaterialIcon
                  name="chevron-right"
                  size={24}
                  color={theme.colors.mauve11}
                />
              </View>
            </TouchableNativeFeedback>

            <View style={styles.divider} />

            <Link href="/settings/language" asChild>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  theme.colors.mauve5,
                  false,
                )}
              >
                <View style={styles.button}>
                  <MaterialIcon
                    name="translate"
                    size={24}
                    color={theme.colors.mauve11}
                  />

                  <Text style={styles.buttonLabel}>
                    {settingsT('app.language')}
                  </Text>

                  <Text style={styles.buttonValue}>
                    {languagesT(`${language}.title`)}
                  </Text>

                  <MaterialIcon
                    name="chevron-right"
                    size={20}
                    color={theme.colors.mauve11}
                  />
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
              <MaterialIcon
                name="code"
                size={24}
                color={theme.colors.mauve11}
              />

              <Text style={styles.buttonLabel}>
                {settingsT('about.version')}
              </Text>

              <Text style={styles.buttonValue}>v0.1.0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.button}>
              <MaterialIcon
                name="system-update"
                size={24}
                color={theme.colors.mauve11}
              />

              <Text style={styles.buttonLabel}>
                {settingsT('about.last-update')}
              </Text>

              <Text style={styles.buttonValue}>20 de abril</Text>
            </View>

            <View style={styles.divider} />

            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                theme.colors.mauve5,
                false,
              )}
            >
              <View style={styles.button}>
                <MaterialIcon
                  name="history-edu"
                  size={24}
                  color={theme.colors.mauve11}
                />

                <Text style={styles.buttonLabel}>
                  {settingsT('about.changelog')}
                </Text>

                <MaterialIcon
                  name="chevron-right"
                  size={20}
                  color={theme.colors.mauve11}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
