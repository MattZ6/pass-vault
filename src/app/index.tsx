import * as ExpoHaptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableNativeFeedback,
  ToastAndroid,
  Pressable,
} from 'react-native'
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useProviders } from '@/hooks/useProviders'
import { useTheme } from '@/hooks/useTheme'

import { Header } from '@/components'

import { Icon } from '@/lib/icon'

import { stylesheet } from './styles'

export default function HomePage() {
  const insets = useSafeAreaInsets()
  const [providers, setProviders] = useProviders()
  const { theme } = useTheme()
  const styles = stylesheet(theme)

  const handleAddProvider = useCallback(() => {
    setProviders([
      {
        id: Date.now().toString(),
        name: 'YouTube',
        account: 'john@doe.com',
        password: 'fake-password',
      },
      ...providers,
    ])
  }, [providers, setProviders])

  const handleRemoveProvider = useCallback(() => {
    const [_, ...rest] = providers

    setProviders(rest)
  }, [providers, setProviders])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header.Root>
        <Text style={styles.headerTitle}>PassVault</Text>

        <Header.Actions>
          <Link href="/settings" asChild>
            <Pressable>
              <Icon name="settings" size={24} color={theme.colors.mauve11} />
            </Pressable>
          </Link>
        </Header.Actions>
      </Header.Root>

      {!!providers && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {providers.map((provider) => (
            <Animated.View
              key={provider.id}
              entering={FadeInRight}
              exiting={FadeOutRight}
              layout={LinearTransition}
            >
              <TouchableNativeFeedback
                onLongPress={() => {
                  ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Heavy)
                  ToastAndroid.show('Abrir bottom sheet', ToastAndroid.SHORT)
                }}
                onPress={() => {
                  ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light)
                  ToastAndroid.show('Abrir página', ToastAndroid.SHORT)
                }}
                background={TouchableNativeFeedback.Ripple(
                  theme.colors.mauve5,
                  false,
                )}
              >
                <View style={styles.provider}>
                  <View style={styles.providerIconContainer} />

                  <View style={styles.providerContent}>
                    <Text style={styles.label}>{provider.name}</Text>
                    <Text style={styles.value}>{provider.account}</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </Animated.View>
          ))}
        </ScrollView>
      )}

      <Button title="Adicionar" onPress={handleAddProvider} />
      <Button color="red" title="Remove" onPress={handleRemoveProvider} />
    </View>
  )
}
