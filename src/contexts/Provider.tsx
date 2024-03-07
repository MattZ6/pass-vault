import { ReactNode } from 'react'

import { LanguageProvider } from './Language'

type Props = {
  children: ReactNode
}

export function Provider({ children }: Props) {
  return <LanguageProvider>{children}</LanguageProvider>
}
