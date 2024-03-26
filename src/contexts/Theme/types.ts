import { ReactNode } from 'react'

import { Theme } from '@/styles/themes/types'

export namespace ThemeContextTypes {
  export type ThemeOption = 'light' | 'dark' | 'system'
  export type ResolvedOption = 'light' | 'dark'

  export type Context = {
    resolvedOption: ResolvedOption
    option: ThemeOption
    options: ThemeOption[]
    theme: Theme
    changeTheme: (option: ThemeOption) => void
  }
}

export namespace ThemeProviderTypes {
  export type Props = {
    children: ReactNode
  }
}
