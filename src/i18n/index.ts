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
export { CAD_VIEWER_DOCS_BASE, cadViewerDocsUrl } from './docsUrl'
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

/**
 * Apply document language (and optionally persist the preference).
 *
 * @param locale - Active locale.
 * @param options.persist - When `false`, update `document.documentElement.lang` only
 *   (used by English-only satellite pages so they do not overwrite the user's site preference).
 */
export function setLocale(locale: Locale, options: { persist?: boolean } = {}): void {
  if (options.persist !== false) {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
  }
  document.documentElement.lang = LOCALE_META[locale].htmlLang
}

export function t(locale: Locale): Dictionary {
  return dictionaries[locale]
}
