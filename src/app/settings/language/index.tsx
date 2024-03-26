import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'

import { Header } from '@/components'

import { stylesheet } from './styles'

export default function LanguagePage() {
  const { theme } = useTheme()
  const styles = stylesheet(theme)
  const { language, languages, changeLanguage } = useLanguage()
  const { t: languageT } = useTranslation('language')
  const { t } = useTranslation('languages')

  function renderItem({ item }: ListRenderItemInfo<typeof language>) {
    const label = t(`${item}.label`)
    const isSelected = language === item

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
        onPress={() => changeLanguage(item)}
      >
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>{t(`${item}.title`)}</Text>
            {label && <Text style={styles.buttonValue}>{label}</Text>}
          </View>

          {isSelected && (
            <MaterialIcon name="check" size={24} color={theme.colors.mauve12} />
          )}
        </View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>{languageT('title')}</Header.Title>
      </Header.Root>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={languages}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  )
}
