import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router';

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { theme } from '@/theme';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from '@/contexts/Provider';

SplashScreen.preventAutoHideAsync()

export default function MainLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider>
          <StatusBar style='light' />

          <Stack screenOptions={{
            freezeOnBlur: true,
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.colors.mauve1,
            }
          }}
          />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
