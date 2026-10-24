import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  locale,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'
import { refreshTryDrawingI18n, setupTryDrawing } from './try-drawing'

/**
 * Render a simple unordered list.
 *
 * @param items - List item text.
 * @returns HTML for a `.doc-list`.
 */
function listHtml(items: string[]): string {
  return `<ul class="doc-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

/**
 * Wrap copy in a media+text product section.
 *
 * @param id - Section element id.
 * @param image - Illustration path.
 * @param alt - Image alt text.
 * @param reverse - When `true`, flip the media/copy columns.
 * @param body - Inner HTML for the copy column.
 * @returns Section markup.
 */
function sectionShell(
  id: string,
  image: string,
  alt: string,
  reverse: boolean,
  body: string,
): string {
  const rev = reverse ? ' doc-block--reverse' : ''
  return [
    `<section class="doc-block doc-block--media reveal${rev}" id="${id}">`,
    '  <figure class="doc-block__visual">',
    `    <img src="${image}" alt="${alt}" width="640" height="400" loading="lazy" />`,
    '  </figure>',
    '  <div class="doc-block__copy">',
    body,
    '  </div>',
    '</section>',
  ].join('\n')
}

/** Fill the product-section highlight list from cadEditor copy. */
function renderHighlights(): void {
  const list = document.querySelector('[data-cad-editor-highlights]')
  if (!list) return
  const items = t(locale).cadEditor.highlights
  list.innerHTML = items
    .map(
      (item, index) =>
        `<li><span class="firsts__mark">${String(index + 1).padStart(2, '0')}</span><span>${item}</span></li>`,
    )
    .join('')
}

/** Render CAD Editor product sections from the active locale dictionary. */
function renderBody(): void {
  const root = document.querySelector('[data-cad-editor-body]')
  if (!root) return
  const d = t(locale).cadEditor

  const featureSections = d.features
    .map((feature, index) =>
      sectionShell(
        feature.id,
        feature.image,
        feature.imageAlt,
        index % 2 === 1,
        [`<h2>${feature.title}</h2>`, `<p>${feature.body}</p>`].join('\n'),
      ),
    )
    .join('\n')

  root.innerHTML = [
    `<section class="doc-block reveal" id="highlights">`,
    `  <p class="eyebrow">${d.featuresEyebrow}</p>`,
    `  <h2>${d.featuresTitle}</h2>`,
    `  <p>${d.featuresLead}</p>`,
    `</section>`,
    featureSections,
    sectionShell(
      'use-cases',
      d.useCasesImage,
      d.useCasesImageAlt,
      d.features.length % 2 === 1,
      [`<h2>${d.useCasesTitle}</h2>`, `<p>${d.useCasesLead}</p>`, listHtml(d.useCases)].join('\n'),
    ),
    `<section class="doc-block reveal" id="cta">`,
    `  <h2>${d.ctaTitle}</h2>`,
    `  <p>${d.ctaLead}</p>`,
    `  <div class="doc-cta doc-cta--row">`,
    `    <a class="btn btn--primary btn--glow" href="${d.demoHref}" target="_blank" rel="noopener">${d.demoCta}</a>`,
    `    <a class="btn btn--ghost" href="${d.githubHref}" target="_blank" rel="noopener">${d.githubCta}</a>`,
    `  </div>`,
    `</section>`,
  ].join('\n')
}

/** Apply locale to meta tags, nav, try-drawing, and page body. */
function applyI18n(): void {
  const dict = t(locale)
  const d = dict.cadEditor
  applyPageMeta({
    locale,
    title: d.metaTitle,
    description: d.metaDescription,
    keywords: d.metaKeywords,
    path: '/cad-editor.html',
  })
  applyCommonI18n(dict)
  renderHighlights()
  renderBody()
  refreshTryDrawingI18n()
  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, d.eyebrow), 450)
  observeReveals()
  scrollToHash()
}

/** Sections are injected after load; restore deep links like #geometry-edit. */
function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  requestAnimationFrame(() => {
    target.scrollIntoView()
  })
}

mountShell('cad-editor')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupTryDrawing({
  engine: 'cad-viewer',
  mode: 'write',
  getCopy: () => {
    const base = t(locale).tryDrawing
    const o = t(locale).cadEditor.tryDrawing
    return {
      ...base,
      barIdle: o.barIdle,
      title: o.title,
      body: o.body,
      caption: o.caption,
    }
  },
})
setupPageFX({ boot: false })
void setupWebGL()
