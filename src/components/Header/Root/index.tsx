import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks/useTheme'

import { View } from '@/lib/View'

import { stylesheet } from './styles'

export type HeaderRootProps = {
  children: ReactNode
}

export function HeaderRoot(props: HeaderRootProps) {
  const insets = useSafeAreaInsets()
  const { resolvedOption, theme } = useTheme()
  const styles = stylesheet(theme)

  return (
    <>
      <StatusBar
        style={resolvedOption === 'dark' ? 'light' : 'dark'}
        animated
      />

      <View
        {...props}
        style={[
          styles.header,
          { paddingTop: styles.header.paddingVertical + insets.top },
        ]}
      />
    </>
  )
}
