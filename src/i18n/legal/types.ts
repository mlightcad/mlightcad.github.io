/** Legal pages required for Paddle verification. */
export type LegalPage = 'terms' | 'privacy' | 'refund'

/** One titled block inside a legal document. */
export interface LegalSection {
  title: string
  paragraphs: string[]
  list?: string[]
}

/** Localized copy for a single legal page. */
export interface LegalPageCopy {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** Full legal-copy set for one locale. */
export type LegalBundle = Record<LegalPage, LegalPageCopy>
