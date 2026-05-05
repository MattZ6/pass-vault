import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const lng = getLocales()[0].languageCode ?? "en";

import { locales } from "@/locales";

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
