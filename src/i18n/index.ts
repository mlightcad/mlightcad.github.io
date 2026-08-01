import { cs } from './cs'
import { en } from './en'
import { es } from './es'
import { ja } from './ja'
import { ko } from './ko'
import { isLocale, LOCALE_META, matchLocale } from './locales'
import { pt } from './pt'
import { ru } from './ru'
import type { Dictionary, Locale } from './types'
import { zh } from './zh'

export type { Dictionary, Locale }
export { isLocale, LOCALES, LOCALE_META, matchLocale } from './locales'

const STORAGE_KEY = 'mlightcad-locale'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  zh,
  ja,
  ko,
  es,
  pt,
  ru,
  cs,
}

export function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    /* ignore */
  }

  const candidates = [...(navigator.languages ?? []), navigator.language]
  for (const tag of candidates) {
    if (!tag) continue
    const matched = matchLocale(tag)
    if (matched) return matched
  }
  return 'en'
}

export function setLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = LOCALE_META[locale].htmlLang
}

export function t(locale: Locale): Dictionary {
  return dictionaries[locale]
}
