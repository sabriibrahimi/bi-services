import { createContext, useContext } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../config/routes.js'

const LanguageContext = createContext(DEFAULT_LANGUAGE)

export const LanguageProvider = LanguageContext.Provider

/** Current language ('fr' | 'en'), provided by the layout of each language. */
export function useLanguage() {
  return useContext(LanguageContext)
}

/** The other language. */
export function otherLanguage(lang) {
  return lang === 'fr' ? 'en' : 'fr'
}

export function isLanguage(value) {
  return LANGUAGES.includes(value)
}

/**
 * Resolve a bilingual entry: t({ fr: 'Oui', en: 'Yes' }, 'en') -> 'Yes'.
 * Plain strings pass through, which keeps data files flexible.
 */
export function t(entry, lang = DEFAULT_LANGUAGE) {
  if (entry == null) return ''
  if (typeof entry === 'string') return entry
  return entry[lang] ?? entry[DEFAULT_LANGUAGE] ?? ''
}

/** Replace {placeholders} in a resolved string. */
export function fill(text, values = {}) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.split(`{${key}}`).join(String(value)),
    text
  )
}

/** t() and fill() in one call. */
export function tf(entry, lang, values) {
  return fill(t(entry, lang), values)
}

/** Locale tag for <html lang> and formatting. */
export function localeTag(lang) {
  return lang === 'fr' ? 'fr-CH' : 'en-CH'
}
