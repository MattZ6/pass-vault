import { getLocales } from 'expo-localization'
import i18next from 'i18next'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { initReactI18next, useTranslation } from 'react-i18next'

import { Application } from '@/lib/application'
import { MMKVStorage } from '@/lib/mmkv'

import { locales as resources } from '../../locales'
import {
  LanguageContextTypes as ContextTypes,
  LanguageProviderTypes as ProviderTypes,
} from './types'

i18next.use(initReactI18next).init({
  fallbackLng: 'pt',
  compatibilityJSON: 'v3',
  resources,
})

const [deviceLocale] = getLocales()

const LanguageContext = createContext({} as ContextTypes.Context)

const LANGUAGE_OPTIONS: ContextTypes.Language[] = ['en', 'pt']

const LANGUAGE_KEY = 'theme'
let storage: MMKVStorage | null = null

if (!Application.isRunningInExpo) {
  storage = new MMKVStorage()
}

function LanguageProvider(props: ProviderTypes.Props) {
  const [initialized, setInitialized] = useState(false)
  const { i18n } = useTranslation(undefined, { i18n: i18next })

  const { language } = i18n

  // TODO: (Android) On app state changes, set locale

  const changeLanguage = useCallback((language: ContextTypes.Language) => {
    if (storage) {
      storage.store({ key: LANGUAGE_KEY, payload: String(language) })
    }

    i18next.changeLanguage(language)
  }, [])

  useEffect(() => {
    let languageToSelect = deviceLocale.languageCode as ContextTypes.Language

    if (storage) {
      const storedLanguage =
        storage.retrieve<ContextTypes.Language>(LANGUAGE_KEY)

      if (storedLanguage) {
        languageToSelect = storedLanguage
      }
    }

    i18next.changeLanguage(languageToSelect)

    setInitialized(true)
  }, [])

  const contextValues = useMemo<ContextTypes.Context>(
    () => ({
      changeLanguage,
      languages: LANGUAGE_OPTIONS,
      language: language as ContextTypes.Language,
    }),
    [changeLanguage, language],
  )

  if (!initialized) {
    return null
  }

  return <LanguageContext.Provider {...props} value={contextValues} />
}

export { LanguageContext, LanguageProvider }
