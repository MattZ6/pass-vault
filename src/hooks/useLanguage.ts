import { useContext } from 'react'

import { LanguageContext } from '@/contexts/Language'

export function useLanguage() {
  return useContext(LanguageContext)
}
