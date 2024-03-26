import { createContext, useCallback, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import { darkTheme, lightTheme } from '@/styles/themes'

import {
  ThemeContextTypes as ContextTypes,
  ThemeProviderTypes as ProviderTypes,
} from './types'

const ThemeContext = createContext({} as ContextTypes.Context)

function ThemeProvider(props: ProviderTypes.Props) {
  const colorScheme = useColorScheme()

  const [option, setOption] = useState<ContextTypes.ThemeOption>('system')

  const options = useMemo<ContextTypes.ThemeOption[]>(
    () => ['light', 'dark', 'system'],
    [],
  )

  const changeTheme = useCallback(
    (option: ContextTypes.ThemeOption) => setOption(option),
    [],
  )

  const theme = useMemo(() => {
    if (option === 'light') {
      return lightTheme
    }

    if (option === 'dark') {
      return darkTheme
    }

    if (option === 'system') {
      if (colorScheme === 'light') {
        return lightTheme
      }

      if (colorScheme === 'dark') {
        return darkTheme
      }

      throw new Error(`[ThemeProvider] Color scheme ${colorScheme} not found`)
    }

    throw new Error(`[ThemeProvider] Theme ${option} not found`)
  }, [option, colorScheme])

  const resolvedOption = useMemo<ContextTypes.ResolvedOption>(() => {
    if (option === 'light') {
      return 'light'
    }

    if (option === 'dark') {
      return 'dark'
    }

    if (option === 'system') {
      if (colorScheme === 'light') {
        return 'light'
      }

      if (colorScheme === 'dark') {
        return 'dark'
      }

      throw new Error(`[ThemeProvider] Color scheme ${colorScheme} not found`)
    }

    throw new Error(`[ThemeProvider] Theme ${option} not found`)
  }, [option, colorScheme])

  const contextValue = useMemo<ContextTypes.Context>(
    () => ({
      theme,
      resolvedOption,
      option,
      options,
      changeTheme,
    }),
    [option, changeTheme, options, theme, resolvedOption],
  )

  return <ThemeContext.Provider {...props} value={contextValue} />
}

export { ThemeContext, ThemeProvider }
