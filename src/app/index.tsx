import { useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native'
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated'
import { useStyles } from 'react-native-unistyles'

import { useProviders } from '@/hooks/useProviders'

import { Header } from '@/components'

import { stylesheet } from './styles'

export default function HomePage() {
  const [providers, setProviders] = useProviders()
  const { styles, theme } = useStyles(stylesheet)

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
    <View style={styles.container}>
      <Header />

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
                onLongPress={() =>
                  ToastAndroid.show('Abrir bottom sheet', ToastAndroid.SHORT)
                }
                onPress={() =>
                  ToastAndroid.show('Abrir página', ToastAndroid.SHORT)
                }
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
