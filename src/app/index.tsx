import { View, Text, StyleSheet, ScrollView, Button, TouchableNativeFeedback, ToastAndroid } from "react-native";
import { theme } from "@/theme";
import { Header } from "@/components";
import { useState } from "react";
import Animated, { FadeInRight, FadeOutRight, LinearTransition } from "react-native-reanimated";

type Provider = {
  id: string
  name: string
  account: string
}

export default function HomePage() {
  const [providers, setProviders] = useState<Provider[]>([])

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {
          providers.map(provider => (
            <Animated.View key={provider.id} entering={FadeInRight} exiting={FadeOutRight} layout={LinearTransition}>
              <TouchableNativeFeedback
                onLongPress={() => ToastAndroid.show('Abrir bottom sheet', ToastAndroid.SHORT)}
                onPress={() => ToastAndroid.show('Abrir página', ToastAndroid.SHORT)}
                background={TouchableNativeFeedback.Ripple(theme.colors.mauve5, false)}
              >
                <View style={styles.provider} >
                  <View style={styles.providerIconContainer}></View>

                  <View style={styles.providerContent}>
                    <Text style={styles.label}>YoutTube</Text>
                    <Text style={styles.value}>john@doe.com</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </Animated.View>
          ))
        }
      </ScrollView>

      <Button title="Adicionar" onPress={() => setProviders(state => [{ id: Date.now().toString(), name: 'YouTube', account: 'john@doe.com' }, ...state])} />
      <Button color="red" title="Remove" onPress={() => setProviders(state => {
        const [_, ...rest] = state

        return rest
      })} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.mauve6,
    borderRadius: theme.radii.lg,

    backgroundColor: theme.colors.mauve2,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.mauve6,
  },
  provider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  providerIconContainer: {
    flexShrink: 0,

    width: 48,
    height: 48,
    borderRadius: theme.radii.md,

    backgroundColor: theme.colors.mauve3,
  },
  providerContent: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve11,
  },
  value: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.body.md,
    color: theme.colors.mauve12,
  },
})
