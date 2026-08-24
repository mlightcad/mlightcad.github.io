import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import {
  fetchLocalizedPrices,
  isPaddleConfigured,
  openCheckout,
  type PaddleProduct,
} from './paddle'
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

const INTEGRATION_SNIPPET = [
  "import { AcDbDatabaseConverterManager, AcDbFileType } from '@mlightcad/data-model'",
  "import { AcDbDwgConverter } from '@mlight-cad/dwg-converter'",
  '',
  'const converter = new AcDbDwgConverter({ /* options */ })',
  'AcDbDatabaseConverterManager.instance.register(AcDbFileType.DWG, converter)',
].join('\n')

/**
 * Wrap copy in a media+text documentation section.
 *
 * @param id - Section element id (also used as the deep-link hash).
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

/**
 * Show a top-of-viewport toast when returning from Paddle checkout.
 * Auto-dismisses after ~8s and strips the success query from the URL.
 */
function showPurchaseToast(message: string, closeLabel: string): void {
  const params = new URLSearchParams(window.location.search)
  if (params.get('purchase') !== 'success') return

  params.delete('purchase')
  params.delete('product')
  const clean = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`
  window.history.replaceState({}, '', clean)

  document.querySelector('.purchase-toast')?.remove()

  const toast = document.createElement('div')
  toast.className = 'purchase-toast'
  toast.setAttribute('role', 'status')

  const text = document.createElement('p')
  text.className = 'purchase-toast__text'
  text.textContent = message

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.className = 'purchase-toast__close'
  closeBtn.setAttribute('aria-label', closeLabel)
  closeBtn.innerHTML = '<span aria-hidden="true">×</span>'

  toast.append(text, closeBtn)
  document.body.appendChild(toast)

  let hideTimer = 0
  let removeTimer = 0
  const dismiss = () => {
    window.clearTimeout(hideTimer)
    window.clearTimeout(removeTimer)
    toast.classList.remove('purchase-toast--visible')
    removeTimer = window.setTimeout(() => toast.remove(), 350)
  }

  closeBtn.addEventListener('click', dismiss)

  // Enter animation on next frame so the transition runs.
  requestAnimationFrame(() => {
    toast.classList.add('purchase-toast--visible')
  })

  hideTimer = window.setTimeout(dismiss, 8000)
}

/** Wire Buy buttons and refresh localized Paddle prices. */
function bindPricingActions(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-paddle-buy]').forEach((btn) => {
    if (btn.dataset.paddleBound === '1') return
    btn.dataset.paddleBound = '1'
    btn.addEventListener('click', () => {
      const product = btn.dataset.paddleBuy as PaddleProduct | undefined
      if (product !== 'perpetual' && product !== 'annual') return
      void openCheckout(product)
    })
  })

  if (!isPaddleConfigured()) return

  void fetchLocalizedPrices().then((prices) => {
    ;( ['perpetual', 'annual'] as const).forEach((key) => {
      const formatted = prices[key]
      if (!formatted) return
      document.querySelectorAll<HTMLElement>(`[data-price-key="${key}"]`).forEach((el) => {
        el.textContent = formatted
      })
    })
  })
}

/** Render parser-page sections from the active locale dictionary. */
function renderParserBody(): void {
  const root = document.querySelector('[data-parser-body]')
  if (!root) return
  const p = t(locale).parser

  const scopeRows = p.scopeRows
    .map((row) => `<tr><th>${row.label}</th><td>${row.value}</td></tr>`)
    .join('')
  const pricingRows = p.pricingRows
    .map((row) => {
      const amountAttrs = row.priceKey ? ` data-price-key="${row.priceKey}"` : ''
      return `<tr><td>${row.item}</td><td${amountAttrs}>${row.amount}</td></tr>`
    })
    .join('')
  const supportRows = p.supportRows
    .map((row) => `<tr><th>${row.area}</th><td>${row.detail}</td></tr>`)
    .join('')
  /**
   * Wrap table rows in the shared docs table chrome.
   *
   * @param className - Extra class for the `<table>` (for example pricing).
   * @param rows - Inner HTML for table rows.
   * @returns Wrapped table markup.
   */
  const table = (className: string, rows: string) =>
    `<div class="doc-table-wrap"><table class="doc-table${className ? ` ${className}` : ''}">${rows}</table></div>`
  const faqs = p.faqs
    .map((faq) => `<details class="faq"><summary>${faq.q}</summary><p>${faq.a}</p></details>`)
    .join('')
  const related = p.related
    .map(
      (link) =>
        `<li><a href="${link.href}" target="_blank" rel="noopener"><strong>${link.name}</strong><span>${link.desc}</span></a></li>`,
    )
    .join('')

  const buyDisabled = isPaddleConfigured() ? '' : ' disabled'
  const buyCtAs = [
    `<p class="doc-cta doc-cta--row">`,
    `  <button type="button" class="btn btn--primary btn--glow" data-paddle-buy="perpetual"${buyDisabled}>${p.buyPerpetualCta}</button>`,
    `  <button type="button" class="btn btn--ghost" data-paddle-buy="annual"${buyDisabled}>${p.buyAnnualCta}</button>`,
    `</p>`,
  ].join('\n')

  root.innerHTML = [
    sectionShell(
      'scope',
      '/assets/parser/scope.svg',
      p.imageAlts.scope,
      false,
      [
        `<h2>${p.scopeTitle}</h2>`,
        `<p>${p.scopeLead}</p>`,
        table('', scopeRows),
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
        table('doc-table--pricing', pricingRows),
        `<p class="doc-note">${p.pricingNote}</p>`,
        buyCtAs,
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
        // Mailto for now; restore ensureTrialDialog + bindTrialTriggers from ./trial-license later.
        `<p class="doc-cta"><a class="btn btn--primary btn--glow" href="${p.contactHref}">${p.trialCta}</a></p>`,
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
      [`<h2>${p.supportTitle}</h2>`, table('', supportRows)].join('\n'),
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

  bindPricingActions()
  showPurchaseToast(p.purchaseSuccess, p.trialForm.close)
}

/** Apply locale to meta tags, nav, and parser body. */
function applyI18n(): void {
  const dict = t(locale)
  applyPageMeta({
    title: dict.parser.metaTitle,
    description: dict.parser.metaDescription,
    keywords: dict.parser.metaKeywords,
    locale,
    path: '/dwg-parser.html',
    type: 'product',
  })

  applyCommonI18n(dict)
  renderParserBody()

  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, dict.parser.eyebrow), 450)
  observeReveals()
  scrollToHash()
}

/** Sections are injected after load; restore deep links like #scope. */
function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  requestAnimationFrame(() => {
    target.scrollIntoView()
  })
}

mountShell('parser')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupPageFX()
void setupWebGL()
