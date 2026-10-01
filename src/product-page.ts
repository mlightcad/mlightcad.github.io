import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell, type SitePage } from './shell'
import {
  applyCommonI18n,
  locale,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'

/** Marketing product pages that share the homepage nav shell. */
export type ProductPageId = 'commercial' | 'cad-sdk' | 'use-cases' | 'benchmarks'

function listHtml(items: string[]): string {
  return `<ul class="doc-list doc-list--split">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

function relatedHtml(items: { name: string; desc: string; href: string }[]): string {
  return `<div class="resource-grid">${items
    .map((link) => {
      const external = /^https?:\/\//i.test(link.href)
      const target = external ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${link.href}"${target}><strong>${link.name}</strong><span>${link.desc}</span></a>`
    })
    .join('')}</div>`
}

function renderCommercial(): string {
  const p = t(locale).commercial
  const rows = p.rows
    .map(
      (row) =>
        `<tr><th scope="row">${row.capability}</th><td>${row.open}</td><td>${row.commercial}</td></tr>`,
    )
    .join('')
  return [
    `<section class="section" id="compare"><div class="shell">`,
    `<p class="eyebrow reveal">${p.tableTitle}</p>`,
    `<h2 class="section__title reveal">${p.tableTitle}</h2>`,
    `<p class="section__lead reveal">${p.tableLead}</p>`,
    `<div class="doc-table-wrap reveal"><table class="doc-table">`,
    `<thead><tr><th>${p.colCapability}</th><th>${p.colOpen}</th><th>${p.colCommercial}</th></tr></thead>`,
    `<tbody>${rows}</tbody></table></div>`,
    `<p class="doc-note reveal">${p.note}</p>`,
    `</div></section>`,
    `<section class="section" id="cta"><div class="shell">`,
    `<h2 class="section__title reveal">${p.ctaTitle}</h2>`,
    `<p class="section__lead reveal">${p.ctaLead}</p>`,
    `<div class="hero__ctas reveal">`,
    `<a class="btn btn--primary btn--glow" href="${p.pricingHref}">${p.pricingCta}</a>`,
    `<a class="btn btn--ghost" href="${p.engineHref}">${p.engineCta}</a>`,
    `</div></div></section>`,
  ].join('\n')
}

function renderCadSdk(): string {
  const p = t(locale).cadSdk
  const paths = p.paths
    .map(
      (pathItem) =>
        `<article class="path-card"><h3>${pathItem.title}</h3><p>${pathItem.body}</p><p><a class="btn btn--ghost" href="${pathItem.href}">${pathItem.cta}</a></p></article>`,
    )
    .join('')
  return [
    `<section class="section" id="embed"><div class="shell">`,
    `<p class="eyebrow reveal">${p.embedTitle}</p>`,
    `<h2 class="section__title reveal">${p.embedTitle}</h2>`,
    `<p class="section__lead reveal">${p.embedLead}</p>`,
    `<pre class="code-block reveal"><code>${p.embedSnippet.replace(/</g, '&lt;')}</code></pre>`,
    `<h3 class="reveal">${p.npmTitle}</h3>`,
    `<pre class="code-block reveal"><code>${p.npmSnippet}</code></pre>`,
    `</div></section>`,
    `<section class="section" id="capabilities"><div class="shell">`,
    `<h2 class="section__title reveal">${p.capabilitiesTitle}</h2>`,
    `<div class="reveal">${listHtml(p.capabilities)}</div>`,
    `</div></section>`,
    `<section class="section" id="paths"><div class="shell">`,
    `<h2 class="section__title reveal">${p.pathsTitle}</h2>`,
    `<p class="section__lead reveal">${p.pathsLead}</p>`,
    `<div class="path-grid reveal">${paths}</div>`,
    `<h3 class="reveal" style="margin-top:2rem">${p.relatedTitle}</h3>`,
    `<div class="reveal">${relatedHtml(p.related)}</div>`,
    `</div></section>`,
  ].join('\n')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderUseCases(): string {
  const p = t(locale).useCases
  const cards = p.cases
    .map(
      (c) =>
        `<article class="path-card" id="${escapeHtml(c.id)}"><h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.body)}</p></article>`,
    )
    .join('')
  const modes = p.modes
    .map((mode) => {
      const points = mode.points.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
      return [
        `<article id="${escapeHtml(mode.id)}">`,
        `<p class="path-card__label">${escapeHtml(mode.label)}</p>`,
        `<h3>${escapeHtml(mode.title)}</h3>`,
        `<p>${escapeHtml(mode.body)}</p>`,
        `<ul class="render-points">${points}</ul>`,
        `</article>`,
      ].join('')
    })
    .join('')
  const fits = p.fitItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
  return [
    `<section class="section" id="cases"><div class="shell">`,
    `<h2 class="section__title reveal">${escapeHtml(p.industryTitle)}</h2>`,
    `<p class="section__lead reveal">${escapeHtml(p.industryLead)}</p>`,
    `<div class="path-grid reveal">${cards}</div>`,
    `</div></section>`,
    `<section class="section" id="rendering"><div class="shell">`,
    `<h2 class="section__title reveal">${escapeHtml(p.renderTitle)}</h2>`,
    `<p class="section__lead reveal">${escapeHtml(p.renderLead)}</p>`,
    `<div class="render-split reveal">${modes}</div>`,
    `<div class="render-fit reveal">`,
    `<h3>${escapeHtml(p.fitTitle)}</h3>`,
    `<p>${escapeHtml(p.fitLead)}</p>`,
    `<ul class="doc-list doc-list--split">${fits}</ul>`,
    `<p class="render-note">${escapeHtml(p.renderNote)}</p>`,
    `<div class="hero__ctas render-actions">`,
    `<a class="btn btn--ghost" href="${escapeHtml(p.articleHref)}" target="_blank" rel="noopener">${escapeHtml(p.articleLabel)}</a>`,
    `<a class="btn btn--primary btn--glow" href="${escapeHtml(p.sampleHref)}" target="_blank" rel="noopener">${escapeHtml(p.sampleLabel)}</a>`,
    `</div>`,
    `</div>`,
    `</div></section>`,
  ].join('\n')
}

function renderBenchmarks(): string {
  const p = t(locale).benchmarks
  const pillars = p.pillars
    .map(
      (item) =>
        `<article class="path-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`,
    )
    .join('')
  const evidence = p.evidenceItems
    .map((item) => {
      const copy = [
        `<div class="evidence-split__copy">`,
        `<h3>${escapeHtml(item.title)}</h3>`,
        `<p>${escapeHtml(item.body)}</p>`,
      ]
      if (item.tableSummary) {
        copy.push(`<p class="memory-note">${escapeHtml(item.tableSummary)}</p>`)
      }
      if (item.note) {
        copy.push(`<p class="doc-note">${escapeHtml(item.note)}</p>`)
      }
      copy.push(`</div>`)

      const side: string[] = [`<div class="evidence-split__side">`]
      if (item.tableHeaders && item.tableRows?.length) {
        const head = item.tableHeaders
          .map((label) => `<th scope="col">${escapeHtml(label)}</th>`)
          .join('')
        const rows = item.tableRows
          .map(
            (row) =>
              `<tr><td>${escapeHtml(row.viewer)}</td><td>${escapeHtml(row.memory)}</td></tr>`,
          )
          .join('')
        side.push(`<div class="feature__memory">`)
        if (item.tableCaption) {
          side.push(`<h4>${escapeHtml(item.tableCaption)}</h4>`)
        }
        side.push(
          `<table class="memory"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`,
        )
        side.push(`</div>`)
      }
      side.push(`</div>`)

      return [
        `<article class="evidence-split">`,
        copy.join(''),
        side.join(''),
        `</article>`,
      ].join('')
    })
    .join('')
  return [
    `<section class="section" id="architecture"><div class="shell">`,
    `<p class="eyebrow reveal">${escapeHtml(p.architectureTitle)}</p>`,
    `<h2 class="section__title reveal">${escapeHtml(p.architectureTitle)}</h2>`,
    `<p class="section__lead reveal">${escapeHtml(p.architectureLead)}</p>`,
    `<div class="path-grid reveal">${pillars}</div>`,
    `</div></section>`,
    `<section class="section" id="evidence"><div class="shell">`,
    `<h2 class="section__title reveal">${escapeHtml(p.evidenceTitle)}</h2>`,
    `<p class="section__lead reveal">${escapeHtml(p.evidenceLead)}</p>`,
    `<div class="evidence-grid reveal">${evidence}</div>`,
    `<p class="doc-note reveal">${escapeHtml(p.caveat)}</p>`,
    `</div></section>`,
    `<section class="section" id="cta"><div class="shell">`,
    `<h2 class="section__title reveal">${escapeHtml(p.ctaTitle)}</h2>`,
    `<p class="section__lead reveal">${escapeHtml(p.ctaLead)}</p>`,
    `<div class="hero__ctas reveal">`,
    `<a class="btn btn--primary btn--glow" href="${escapeHtml(p.primaryHref)}" target="_blank" rel="noopener">${escapeHtml(p.primaryCta)}</a>`,
    `<a class="btn btn--ghost" href="${escapeHtml(p.secondaryHref)}">${escapeHtml(p.secondaryCta)}</a>`,
    `</div></div></section>`,
  ].join('\n')
}

const renderers: Record<ProductPageId, () => string> = {
  commercial: renderCommercial,
  'cad-sdk': renderCadSdk,
  'use-cases': renderUseCases,
  benchmarks: renderBenchmarks,
}

const metaKeys: Record<ProductPageId, 'commercial' | 'cadSdk' | 'useCases' | 'benchmarks'> = {
  commercial: 'commercial',
  'cad-sdk': 'cadSdk',
  'use-cases': 'useCases',
  benchmarks: 'benchmarks',
}

const paths: Record<ProductPageId, string> = {
  commercial: '/commercial.html',
  'cad-sdk': '/cad-sdk.html',
  'use-cases': '/use-cases.html',
  benchmarks: '/benchmarks.html',
}

/** Boot a shared marketing product page. */
export function mountProductPage(page: ProductPageId): void {
  const applyI18n = (): void => {
    const dict = t(locale)
    const copy = dict[metaKeys[page]]
    applyPageMeta({
      title: copy.metaTitle,
      description: copy.metaDescription,
      keywords: copy.metaKeywords,
      locale,
      path: paths[page],
    })
    applyCommonI18n(dict)

    const body = document.querySelector('[data-page-body]')
    if (body) body.innerHTML = renderers[page]()

    const scramble = document.querySelector<HTMLElement>('[data-scramble]')
    if (scramble && 'eyebrow' in copy && typeof copy.eyebrow === 'string') {
      window.setTimeout(() => scrambleText(scramble, copy.eyebrow), 450)
    }
    observeReveals()
  }

  mountShell(page as SitePage)
  applyI18n()
  setupLocaleToggle(() => applyI18n())
  setupNav()
  setupPageFX({ boot: false })
  void setupWebGL()
}
