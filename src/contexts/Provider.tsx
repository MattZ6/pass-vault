import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'

import { LanguageProvider } from './Language'
import { ThemeProvider } from './Theme'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function Provider({ children }: Props) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.fill}>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </LanguageProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})
