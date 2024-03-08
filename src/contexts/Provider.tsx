import { ReactNode } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { LanguageProvider } from './Language'

type Props = {
  children: ReactNode
}

export function Provider({ children }: Props) {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LanguageProvider>{children}</LanguageProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
