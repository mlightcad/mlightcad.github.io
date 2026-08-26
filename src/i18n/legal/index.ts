import type { Locale } from '../types'
import { cs } from './cs'
import { en } from './en'
import { es } from './es'
import { ja } from './ja'
import { ko } from './ko'
import { pt } from './pt'
import { ru } from './ru'
import type { LegalBundle, LegalPage, LegalPageCopy } from './types'
import { zh } from './zh'

export type { LegalPage, LegalPageCopy, LegalSection } from './types'

const bundles: Record<Locale, LegalBundle> = {
  en,
  zh,
  ja,
  ko,
  es,
  pt,
  ru,
  cs,
}

/** Canonical path for each legal page. */
export const LEGAL_PATHS: Record<LegalPage, string> = {
  terms: '/terms.html',
  privacy: '/privacy.html',
  refund: '/refunds.html',
}

/**
 * Resolve localized legal copy for the active locale.
 *
 * @param page - Which legal document to load.
 * @param locale - Site locale selected by the visitor.
 * @returns Copy for that page in the requested locale.
 */
export function legalCopy(page: LegalPage, locale: Locale): LegalPageCopy {
  return (bundles[locale] ?? bundles.en)[page]
}

/** Detect which legal page is active from `document.body`. */
export function detectLegalPage(): LegalPage | null {
  const raw = document.body.dataset.legal
  if (raw === 'terms' || raw === 'privacy' || raw === 'refund') return raw
  return null
}
