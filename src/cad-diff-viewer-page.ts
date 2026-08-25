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

/** Render CAD Diff Viewer product sections from the active locale dictionary. */
function renderBody(): void {
  const root = document.querySelector('[data-diff-viewer-body]')
  if (!root) return
  const d = t(locale).cadDiffViewer

  const highlights = d.highlights
    .map(
      (item, index) =>
        `<li><span class="firsts__mark">${String(index + 1).padStart(2, '0')}</span><span>${item}</span></li>`,
    )
    .join('')

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

  const related = d.related
    .map(
      (link) =>
        `<a href="${link.href}" target="_blank" rel="noopener"><strong>${link.name}</strong><span>${link.desc}</span></a>`,
    )
    .join('')

  root.innerHTML = [
    `<section class="doc-block reveal" id="highlights">`,
    `  <p class="eyebrow">${d.featuresEyebrow}</p>`,
    `  <h2>${d.featuresTitle}</h2>`,
    `  <p>${d.featuresLead}</p>`,
    `  <p class="eco__label">${d.highlightsLabel}</p>`,
    `  <ul class="firsts firsts--stack">${highlights}</ul>`,
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
    `<section class="doc-block reveal" id="related">`,
    `  <h2>${d.relatedTitle}</h2>`,
    `  <div class="resource-grid">${related}</div>`,
    `</section>`,
  ].join('\n')
}

/** Apply locale to meta tags, nav, and page body. */
function applyI18n(): void {
  const dict = t(locale)
  const d = dict.cadDiffViewer
  applyPageMeta({
    locale,
    title: d.metaTitle,
    description: d.metaDescription,
    keywords: d.metaKeywords,
    path: '/cad-diff-viewer.html',
  })
  applyCommonI18n(dict)
  renderBody()
  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, d.eyebrow), 450)
  observeReveals()
  scrollToHash()
}

/** Sections are injected after load; restore deep links like #visual-diff. */
function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  requestAnimationFrame(() => {
    target.scrollIntoView()
  })
}

mountShell('cad-diff-viewer')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupPageFX()
void setupWebGL()
