import type { Locale } from './types'

/** Display and metadata details for one site locale. */
export interface LocaleMeta {
  /** BCP 47 / HTML lang */
  htmlLang: string
  /** Open Graph locale */
  ogLocale: string
  /** Native language name shown in the switcher */
  nativeLabel: string
}

export const LOCALES: readonly Locale[] = [
  'en',
  'zh',
  'ja',
  'ko',
  'es',
  'pt',
  'ru',
  'cs',
] as const

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { htmlLang: 'en', ogLocale: 'en_US', nativeLabel: 'English' },
  zh: { htmlLang: 'zh-CN', ogLocale: 'zh_CN', nativeLabel: '中文' },
  ja: { htmlLang: 'ja', ogLocale: 'ja_JP', nativeLabel: '日本語' },
  ko: { htmlLang: 'ko', ogLocale: 'ko_KR', nativeLabel: '한국어' },
  es: { htmlLang: 'es', ogLocale: 'es_ES', nativeLabel: 'Español' },
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', nativeLabel: 'Português' },
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU', nativeLabel: 'Русский' },
  cs: { htmlLang: 'cs', ogLocale: 'cs_CZ', nativeLabel: 'Čeština' },
}

/**
 * Type guard for {@link Locale}.
 *
 * @param value - Candidate string from storage, the DOM, or the URL.
 * @returns Whether `value` is a supported site locale.
 */
export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

/** Map a BCP 47 tag (or OS/browser locale) to a supported site locale. */
export function matchLocale(tag: string): Locale | null {
  const lower = tag.toLowerCase().replace(/_/g, '-')
  const primary = lower.split('-')[0] ?? ''
  if (primary === 'zh') return 'zh'
  if (isLocale(primary)) return primary
  return null
}
