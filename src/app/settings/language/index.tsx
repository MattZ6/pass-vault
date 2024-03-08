import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles'

import { useLanguage } from '@/hooks/useLanguage'

import { stylesheet } from './styles'

export default function LanguagePage() {
  const { styles, theme } = useStyles(stylesheet)
  const insets = useSafeAreaInsets()
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

        <Text style={styles.title}>{languageT('title')}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={languages}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  )
}
