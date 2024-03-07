import { FlatList, ListRenderItemInfo, Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { theme } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "@/hooks/useLanguage";
import { useTranslation } from "react-i18next";

export default function LanguagePage() {
  const insets = useSafeAreaInsets()
  const { language, languages, changeLanguage } = useLanguage()
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

          {isSelected && <MaterialIcon name="check" size={24} color={theme.colors.mauve12} />}
        </View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <View style={[styles.header, { paddingTop: styles.header.padding + insets.top }]}>
        <Pressable>
          <MaterialIcon name="arrow-back" size={24} color={theme.colors.mauve11} />
        </Pressable>

        <Text style={styles.title}>Idioma</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={languages}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
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
})
