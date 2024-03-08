import Icon from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStyles } from 'react-native-unistyles'

import { stylesheet } from './styles'

export function Header() {
  const insets = useSafeAreaInsets()
  const { styles, theme } = useStyles(stylesheet)

  return (
    <View
      style={[
        styles.header,
        { paddingTop: styles.header.padding + insets.top },
      ]}
    >
      <Text style={styles.text}>PassVault</Text>

      <Link href="/settings" asChild>
        <Pressable>
          <Icon name="setting" size={24} color={theme.colors.mauve11} />
        </Pressable>
      </Link>
    </View>
  )
}
