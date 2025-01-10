import i18n, { Module, ModuleType } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import jp from "./locales/jp.json";
import ru from "./locales/ru.json";

const LANGUAGE_KEY = "user-selected-language";

// Custom Language Detector
const languageDetector: Module = {
  type: "languageDetector" as ModuleType,
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      const fallbackLanguage = "en"; // Default language
      callback(storedLanguage || fallbackLanguage);
    } catch (error) {
      console.error("Failed to fetch language from AsyncStorage:", error);
      callback("en");
    }
  },
  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
      console.error("Failed to save language to AsyncStorage:", error);
    }
  },
};

// Initialize i18n
i18n
  .use(languageDetector as Module)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      jp: { translation: jp },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
