import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

import { useTheme } from '@/hooks/useTheme'

import { Header } from '@/components'

import { Icon } from '@/lib/icon'

import { stylesheet } from './styles'

export default function ThemePage() {
  const { option, options, changeTheme, theme } = useTheme()
  const styles = stylesheet(theme)

  function renderItem({ item }: ListRenderItemInfo<typeof option>) {
    const isSelected = item === option

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
        onPress={() => changeTheme(item)}
      >
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>{item}</Text>
          </View>

          {isSelected && (
            <Icon name="check" size={24} color={theme.colors.mauve12} />
          )}
        </View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>Theme</Header.Title>
      </Header.Root>

      <FlatList
        data={options}
        keyExtractor={(item) => String(item)}
        renderItem={renderItem}
      />
    </View>
  )
}
