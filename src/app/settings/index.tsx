import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { Header } from '@/components'
import { AppSection } from '@/components/settings'
import { AboutSection } from '@/components/settings/AboutSection'

import { stylesheet } from './styles'

export default function SettingsPage() {
  const { theme } = useTheme()
  const styles = stylesheet(theme)
  const { t } = useTranslation('settings')

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>{t('title')}</Header.Title>
      </Header.Root>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppSection />

        <AboutSection />
      </ScrollView>
    </View>
  )
}
