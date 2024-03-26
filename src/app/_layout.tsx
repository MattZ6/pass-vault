import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import * as ExpoNavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as ExpoSystemUi from 'expo-system-ui'
import { useEffect } from 'react'

import { Provider } from '@/contexts/Provider'

import { useTheme } from '@/hooks/useTheme'

SplashScreen.preventAutoHideAsync()

function AppStack() {
  const { theme, resolvedOption } = useTheme()

  useEffect(() => {
    ExpoNavigationBar.setButtonStyleAsync(resolvedOption)
  }, [resolvedOption])

  useEffect(() => {
    ExpoNavigationBar.setPositionAsync('absolute')
    ExpoNavigationBar.setBackgroundColorAsync('#ffffff00')

    ExpoSystemUi.setBackgroundColorAsync(theme.colors.mauve1)
  }, [theme.colors.mauve1])

  return (
    <Stack
      screenOptions={{
        freezeOnBlur: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    />
  )
}

export default function MainLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync()

  return (
    <Provider>
      <StatusBar style="light" />

      <AppStack />
    </Provider>
  )
}
