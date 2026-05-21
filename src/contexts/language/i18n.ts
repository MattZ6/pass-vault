import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { locales } from "@/locales";

import { PreferencesRepository } from "@/repositories/preferences.repository";

export const lng =
  PreferencesRepository.getLanguage() ?? getLocales()[0].languageCode ?? "en";

i18n.use(initReactI18next).init({
  resources: locales,
  lng,
  fallbackLng: "en",
  supportedLngs: ["en", "pt", "es"],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
