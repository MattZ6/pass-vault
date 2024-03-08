import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useStyles } from 'react-native-unistyles'

import { Provider } from '@/contexts/Provider'

SplashScreen.preventAutoHideAsync()

function AppStack() {
  const { theme } = useStyles()

  return (
    <Stack
      screenOptions={{
        freezeOnBlur: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.mauve1,
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
