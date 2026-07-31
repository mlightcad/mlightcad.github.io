import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import {
  applyCommonI18n,
  locale,
  markActiveNav,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'
import { bindTrialTriggers, ensureTrialDialog } from './trial-license'

function listHtml(items: string[]): string {
  return `<ul class="doc-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
}

const INTEGRATION_SNIPPET = [
  "import { AcDbDatabaseConverterManager, AcDbFileType } from '@mlightcad/data-model'",
  "import { AcDbDwgConverter } from '@mlight-cad/dwg-converter'",
  '',
  'const converter = new AcDbDwgConverter({ /* options */ })',
  'AcDbDatabaseConverterManager.instance.register(AcDbFileType.DWG, converter)',
].join('\n')

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

function renderParserBody(): void {
  const root = document.querySelector('[data-parser-body]')
  if (!root) return
  const p = t(locale).parser

  const scopeRows = p.scopeRows
    .map((row) => `<tr><th>${row.label}</th><td>${row.value}</td></tr>`)
    .join('')
  const pricingRows = p.pricingRows
    .map((row) => `<tr><td>${row.item}</td><td>${row.amount}</td></tr>`)
    .join('')
  const supportRows = p.supportRows
    .map((row) => `<tr><th>${row.area}</th><td>${row.detail}</td></tr>`)
    .join('')
  const faqs = p.faqs
    .map((faq) => `<details class="faq"><summary>${faq.q}</summary><p>${faq.a}</p></details>`)
    .join('')
  const related = p.related
    .map(
      (link) =>
        `<li><a href="${link.href}" target="_blank" rel="noopener"><strong>${link.name}</strong><span>${link.desc}</span></a></li>`,
    )
    .join('')

  root.innerHTML = [
    sectionShell(
      'scope',
      '/assets/parser/scope.svg',
      p.imageAlts.scope,
      false,
      [
        `<h2>${p.scopeTitle}</h2>`,
        `<p>${p.scopeLead}</p>`,
        `<table class="doc-table">${scopeRows}</table>`,
        `<h3>${p.benefitsTitle}</h3>`,
        listHtml(p.benefits),
      ].join('\n'),
    ),
    sectionShell(
      'license',
      '/assets/parser/license.svg',
      p.imageAlts.license,
      true,
      [
        `<h2>${p.licenseTitle}</h2>`,
        `<h3>${p.receiveTitle}</h3>`,
        listHtml(p.receive),
        `<h3>${p.permittedTitle}</h3>`,
        listHtml(p.permitted),
        `<h3>${p.restrictionsTitle}</h3>`,
        listHtml(p.restrictions),
        `<h3>${p.pricingTitle}</h3>`,
        `<table class="doc-table doc-table--pricing">${pricingRows}</table>`,
        `<p class="doc-note">${p.pricingNote}</p>`,
      ].join('\n'),
    ),
    sectionShell(
      'trial',
      '/assets/parser/trial.svg',
      p.imageAlts.trial,
      false,
      [
        `<h2>${p.trialTitle}</h2>`,
        `<p>${p.trialLead}</p>`,
        listHtml(p.trialSteps),
        `<p class="doc-note">${p.trialNote}</p>`,
        `<p class="doc-cta"><button type="button" class="btn btn--primary btn--glow" data-trial-open>${p.trialCta}</button></p>`,
      ].join('\n'),
    ),
    sectionShell(
      'integration',
      '/assets/parser/integration.svg',
      p.imageAlts.integration,
      true,
      [
        `<h2>${p.integrationTitle}</h2>`,
        `<p>${p.integrationLead}</p>`,
        `<pre class="doc-code"><code>${INTEGRATION_SNIPPET}</code></pre>`,
      ].join('\n'),
    ),
    sectionShell(
      'support',
      '/assets/parser/support.svg',
      p.imageAlts.support,
      false,
      [`<h2>${p.supportTitle}</h2>`, `<table class="doc-table">${supportRows}</table>`].join('\n'),
    ),
    sectionShell(
      'faq',
      '/assets/parser/faq.svg',
      p.imageAlts.faq,
      true,
      [`<h2>${p.faqTitle}</h2>`, `<div class="faq-list">${faqs}</div>`].join('\n'),
    ),
    sectionShell(
      'related',
      '/assets/parser/related.svg',
      p.imageAlts.related,
      false,
      [`<h2>${p.relatedTitle}</h2>`, `<ul class="related-list">${related}</ul>`].join('\n'),
    ),
  ].join('\n')
}

function applyI18n(): void {
  const dict = t(locale)
  document.title = dict.parser.metaTitle
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', dict.parser.metaDescription)
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'

  applyCommonI18n(dict)
  renderParserBody()
  ensureTrialDialog(dict.parser.trialForm)
  bindTrialTriggers()

  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, dict.parser.eyebrow), 450)
  observeReveals()
}

applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
markActiveNav('parser')
setupPageFX()
void setupWebGL()
