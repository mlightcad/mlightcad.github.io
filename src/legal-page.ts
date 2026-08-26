import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { detectLegalPage, legalCopy, LEGAL_PATHS, type LegalPage } from './i18n/legal'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  locale,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'

/**
 * Render legal section blocks into HTML.
 *
 * @param sections - Structured legal sections for the active page.
 * @returns Article body markup.
 */
function renderSections(sections: ReturnType<typeof legalCopy>['sections']): string {
  return sections
    .map((section) => {
      const paragraphs = section.paragraphs.map((p) => `<p>${p}</p>`).join('')
      const list = section.list
        ? `<ul class="doc-list">${section.list.map((item) => `<li>${item}</li>`).join('')}</ul>`
        : ''
      return [
        '<section class="legal-section doc-block">',
        `  <h2>${section.title}</h2>`,
        `  ${paragraphs}`,
        `  ${list}`,
        '</section>',
      ].join('\n')
    })
    .join('\n')
}

/**
 * Paint hero fields and article body for the active legal page.
 *
 * @param page - Which legal document to render.
 */
function renderLegalPage(page: LegalPage): void {
  const copy = legalCopy(page, locale)

  applyPageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale,
    path: LEGAL_PATHS[page],
  })

  const eyebrow = document.querySelector<HTMLElement>('[data-legal-eyebrow]')
  const title = document.querySelector<HTMLElement>('[data-legal-title]')
  const updated = document.querySelector<HTMLElement>('[data-legal-updated]')
  const body = document.querySelector<HTMLElement>('[data-legal-body]')

  if (eyebrow) eyebrow.textContent = copy.eyebrow
  if (title) title.textContent = copy.title
  if (updated) updated.textContent = copy.updated
  if (body) {
    body.innerHTML = [`<p class="legal-intro">${copy.intro}</p>`, renderSections(copy.sections)].join('\n')
  }

  document.querySelectorAll<HTMLAnchorElement>('.footer__legal a').forEach((link) => {
    const href = link.getAttribute('href') ?? ''
    const isTerms = page === 'terms' && href.includes('terms.html')
    const isPrivacy = page === 'privacy' && href.includes('privacy.html')
    const isRefund = page === 'refund' && href.includes('refunds.html')
    const current = isTerms || isPrivacy || isRefund
    link.classList.toggle('is-current', current)
    if (current) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })

  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
    scrambleText(el, el.textContent ?? '')
  })
}

/** Refresh localized copy without re-mounting the shared shell. */
function applyLegalI18n(page: LegalPage): void {
  applyCommonI18n(t(locale))
  renderLegalPage(page)
}

const page = detectLegalPage()
if (!page) {
  console.error('legal-page: missing or invalid data-legal on <body>')
} else {
  mountShell('legal')
  applyLegalI18n(page)
  setupLocaleToggle(() => applyLegalI18n(page))
  setupNav()
  setupPageFX()
  void setupWebGL()
}
