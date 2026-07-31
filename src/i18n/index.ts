import { en } from './en'
import { zh } from './zh'
import type { Dictionary, Locale } from './types'

export type { Dictionary, Locale }

const STORAGE_KEY = 'mlightcad-locale'

const dictionaries: Record<Locale, Dictionary> = { en, zh }

export function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
  } catch {
    /* ignore */
  }
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('zh') ? 'zh' : 'en'
}

export function setLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
}

export function t(locale: Locale): Dictionary {
  return dictionaries[locale]
}
