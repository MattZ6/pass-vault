import { createContext, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import i18next from "./i18n";

import type {
  LanguageContextTypes as ContextTypes,
  LanguageProviderTypes as ProviderTypes,
} from "./types";

const LanguageContext = createContext({} as ContextTypes.Context);

const LANGUAGE_OPTIONS: ContextTypes.Language[] = ["en", "pt", "es"];

function LanguageProvider(props: ProviderTypes.Props) {
  const { i18n } = useTranslation(undefined, { i18n: i18next });

  const { language } = i18n;

  const changeLanguage = useCallback(
    (language: ContextTypes.Language) => {
      i18n.changeLanguage(language);
    },
    [i18n.changeLanguage],
  );

  const contextValues = useMemo<ContextTypes.Context>(
    () => ({
      changeLanguage,
      languages: LANGUAGE_OPTIONS,
      language: language as ContextTypes.Language,
    }),
    [changeLanguage, language],
  );

  return <LanguageContext.Provider {...props} value={contextValues} />;
}

export { LanguageContext, LanguageProvider };
