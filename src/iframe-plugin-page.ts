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

const SAMPLE_DWG =
  'https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/data/canteen.dwg'

/** Query-parameter state for the iframe playground. */
interface PlaygroundState {
  /** Absolute URL of the DWG/DXF file to open. */
  url: string
  /** Open mode (`review`, `read`, or `write`). */
  mode: string
  /** Initial view (`extents` or `saved`). */
  view: string
  /** Viewer UI locale (`en`, `zh`, `tr`, or `cs`). */
  lang: string
  /** UI theme (`dark` or `light`). */
  theme: string
  /** Whether the toolbar is shown. */
  toolbar: boolean
  /** Whether the command line is shown. */
  commandline: boolean
}

/**
 * Map a site locale onto a viewer UI locale (`en`, `zh`, `tr`, or `cs`).
 *
 * @param siteLocale - Active marketing-site locale.
 * @returns Viewer locale used by the playground.
 */
function defaultPlaygroundLang(siteLocale: string): string {
  if (siteLocale === 'zh' || siteLocale === 'cs' || siteLocale === 'tr') return siteLocale
  return 'en'
}

const playground: PlaygroundState = {
  url: SAMPLE_DWG,
  mode: 'review',
  view: 'extents',
  lang: defaultPlaygroundLang(locale),
  theme: 'dark',
  toolbar: false,
  commandline: false,
}

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
 * Render `<option>` elements for a select.
 *
 * @param values - Option values and labels.
 * @param selected - Currently selected value.
 * @returns HTML for the options.
 */
function optionHtml(values: string[], selected: string): string {
  return values
    .map((value) => `<option value="${value}"${value === selected ? ' selected' : ''}>${value}</option>`)
    .join('')
}

/**
 * Build a same-origin `/embed.html?...` path from playground state.
 *
 * @param state - Current playground fields.
 * @returns Site-relative embed URL.
 */
function buildEmbedPath(state: PlaygroundState): string {
  const q = new URLSearchParams()
  q.set('url', state.url.trim())
  q.set('mode', state.mode)
  q.set('view', state.view)
  q.set('lang', state.lang)
  q.set('theme', state.theme)
  q.set('toolbar', state.toolbar ? '1' : '0')
  q.set('commandline', state.commandline ? '1' : '0')
  return `/embed.html?${q.toString()}`
}

/**
 * Resolve the embed path against the current origin.
 *
 * @param state - Current playground fields.
 * @returns Absolute embed URL for the iframe snippet.
 */
function buildEmbedAbsoluteUrl(state: PlaygroundState): string {
  return new URL(buildEmbedPath(state), window.location.origin).toString()
}

/**
 * Generate a copy-paste iframe snippet for the current playground state.
 *
 * @param state - Current playground fields.
 * @returns HTML snippet.
 */
function buildSnippet(state: PlaygroundState): string {
  const src = buildEmbedAbsoluteUrl(state)
  return [
    '<iframe',
    `  src="${src}"`,
    '  style="width:100%;height:600px;border:0"',
    '  allowfullscreen',
    '  loading="lazy"',
    '></iframe>',
  ].join('\n')
}

/** Copy playground field values from the form into {@link playground}. */
function readPlaygroundFromDom(): void {
  const url = document.querySelector<HTMLInputElement>('[data-play-url]')
  const mode = document.querySelector<HTMLSelectElement>('[data-play-mode]')
  const view = document.querySelector<HTMLSelectElement>('[data-play-view]')
  const lang = document.querySelector<HTMLSelectElement>('[data-play-lang]')
  const theme = document.querySelector<HTMLSelectElement>('[data-play-theme]')
  const toolbar = document.querySelector<HTMLInputElement>('[data-play-toolbar]')
  const commandline = document.querySelector<HTMLInputElement>('[data-play-commandline]')
  if (!url || !mode || !view || !lang || !theme || !toolbar || !commandline) return

  playground.url = url.value
  playground.mode = mode.value
  playground.view = view.value
  playground.lang = lang.value
  playground.theme = theme.value
  playground.toolbar = toolbar.checked
  playground.commandline = commandline.checked
}

/**
 * Refresh the generated snippet, and optionally reload the preview iframe.
 *
 * @param loadPreview - When `true`, set the preview iframe `src`.
 */
function syncSnippetAndPreview(loadPreview: boolean): void {
  const snippet = document.querySelector<HTMLElement>('[data-play-snippet]')
  const frame = document.querySelector<HTMLIFrameElement>('[data-play-frame]')
  if (snippet) snippet.textContent = buildSnippet(playground)
  if (frame && loadPreview && playground.url.trim()) {
    frame.src = buildEmbedPath(playground)
  }
}

/** Bind playground form events once after the body is rendered. */
function bindPlayground(): void {
  const form = document.querySelector<HTMLFormElement>('[data-play-form]')
  if (!form || form.dataset.bound === '1') return
  form.dataset.bound = '1'

  /** Keep snippet text in sync as the user edits fields. */
  const onChange = (): void => {
    readPlaygroundFromDom()
    syncSnippetAndPreview(false)
  }

  form.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', onChange)
    el.addEventListener('change', onChange)
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    readPlaygroundFromDom()
    const p = t(locale).iframePlugin
    if (!playground.url.trim()) {
      window.alert(p.playgroundUrlRequired)
      return
    }
    window.open(buildEmbedPath(playground), '_blank', 'noopener,noreferrer')
  })

  document.querySelector('[data-play-preview]')?.addEventListener('click', () => {
    readPlaygroundFromDom()
    const p = t(locale).iframePlugin
    if (!playground.url.trim()) {
      window.alert(p.playgroundUrlRequired)
      return
    }
    syncSnippetAndPreview(true)
  })
}

/** Render the iframe plugin docs body, including the live playground. */
function renderBody(): void {
  const root = document.querySelector('[data-iframe-plugin-body]')
  if (!root) return
  const p = t(locale).iframePlugin

  const paramRows = p.params
    .map(
      (row) =>
        `<tr><th><code>${row.name}</code></th><td><code>${row.defaultValue}</code></td><td>${row.desc}</td></tr>`,
    )
    .join('')
  const modeRows = p.modes
    .map((row) => `<tr><th><code>${row.name}</code></th><td>${row.desc}</td></tr>`)
    .join('')
  const related = p.related
    .map(
      (link) =>
        `<li><a href="${link.href}" target="_blank" rel="noopener"><strong>${link.name}</strong><span>${link.desc}</span></a></li>`,
    )
    .join('')

  const snippet = buildSnippet(playground)

  root.innerHTML = [
    `<section class="doc-block reveal" id="example">`,
    `  <h2>${p.exampleTitle}</h2>`,
    `  <p>${p.exampleLead}</p>`,
    `  <form class="embed-play" data-play-form>`,
    `    <h3 class="embed-play__title">${p.playgroundTitle}</h3>`,
    `    <label class="embed-play__field embed-play__field--full">`,
    `      <span class="embed-play__label">${p.playgroundUrl}</span>`,
    `      <input type="url" name="url" data-play-url required placeholder="${p.playgroundUrlPlaceholder}" value="${playground.url.replace(/"/g, '&quot;')}" />`,
    `    </label>`,
    `    <div class="embed-play__grid">`,
    `      <label class="embed-play__field">`,
    `        <span class="embed-play__label">${p.playgroundMode}</span>`,
    `        <select data-play-mode>${optionHtml(['review', 'read', 'write'], playground.mode)}</select>`,
    `      </label>`,
    `      <label class="embed-play__field">`,
    `        <span class="embed-play__label">${p.playgroundView}</span>`,
    `        <select data-play-view>${optionHtml(['extents', 'saved'], playground.view)}</select>`,
    `      </label>`,
    `      <label class="embed-play__field">`,
    `        <span class="embed-play__label">${p.playgroundLang}</span>`,
    `        <select data-play-lang>${optionHtml(['en', 'zh', 'tr', 'cs'], playground.lang)}</select>`,
    `      </label>`,
    `      <label class="embed-play__field">`,
    `        <span class="embed-play__label">${p.playgroundTheme}</span>`,
    `        <select data-play-theme>${optionHtml(['dark', 'light'], playground.theme)}</select>`,
    `      </label>`,
    `    </div>`,
    `    <div class="embed-play__checks">`,
    `      <label class="embed-play__check"><input type="checkbox" data-play-toolbar${playground.toolbar ? ' checked' : ''} /> ${p.playgroundToolbar}</label>`,
    `      <label class="embed-play__check"><input type="checkbox" data-play-commandline${playground.commandline ? ' checked' : ''} /> ${p.playgroundCommandLine}</label>`,
    `    </div>`,
    `    <div class="embed-play__actions">`,
    `      <button type="submit" class="btn btn--primary btn--glow">${p.playgroundOpen}</button>`,
    `      <button type="button" class="btn btn--ghost" data-play-preview>${p.playgroundPreview}</button>`,
    `    </div>`,
    `  </form>`,
    `  <h3 class="embed-play__snippet-label">${p.playgroundSnippet}</h3>`,
    `  <pre class="doc-code"><code data-play-snippet>${snippet.replace(/</g, '&lt;')}</code></pre>`,
    `  <h3 class="embed-play__snippet-label">${p.playgroundPreviewLabel}</h3>`,
    `  <div class="embed-play__preview">`,
    `    <iframe data-play-frame title="Embed preview" src="${buildEmbedPath(playground)}" allowfullscreen loading="lazy"></iframe>`,
    `  </div>`,
    `</section>`,
    `<section class="doc-block reveal" id="params">`,
    `  <h2>${p.paramsTitle}</h2>`,
    `  <p>${p.paramsLead}</p>`,
    `  <div class="doc-table-wrap"><table class="doc-table"><thead><tr><th>Param</th><th>Default</th><th>Description</th></tr></thead><tbody>${paramRows}</tbody></table></div>`,
    `</section>`,
    `<section class="doc-block reveal" id="modes">`,
    `  <h2>${p.modesTitle}</h2>`,
    `  <p>${p.modesLead}</p>`,
    `  <div class="doc-table-wrap"><table class="doc-table"><tbody>${modeRows}</tbody></table></div>`,
    `</section>`,
    `<section class="doc-block reveal" id="notes">`,
    `  <h2>${p.notesTitle}</h2>`,
    listHtml(p.notes),
    `</section>`,
    `<section class="doc-block reveal" id="compare">`,
    `  <h2>${p.compareTitle}</h2>`,
    `  <p>${p.compareLead}</p>`,
    `  <div class="doc-cta">`,
    `    <a class="btn btn--primary btn--glow" href="${p.compareDemoHref}" target="_blank" rel="noopener">${p.compareDemoCta}</a>`,
    `  </div>`,
    `</section>`,
    `<section class="doc-block reveal" id="related">`,
    `  <h2>${p.relatedTitle}</h2>`,
    `  <ul class="related-list">${related}</ul>`,
    `</section>`,
  ].join('\n')

  bindPlayground()
}

/** Apply locale to meta tags, nav, and the docs body. */
function applyI18n(): void {
  readPlaygroundFromDom()
  playground.lang = defaultPlaygroundLang(locale)
  const dict = t(locale)
  const p = dict.iframePlugin
  applyPageMeta({
    locale,
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.metaKeywords,
    path: '/iframe-plugin.html',
  })
  applyCommonI18n(dict)
  renderBody()
  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, p.eyebrow), 450)
  observeReveals()
  scrollToHash()
}

/** Sections are injected after load; restore deep links like #example. */
function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  requestAnimationFrame(() => {
    target.scrollIntoView()
  })
}

mountShell('iframe-plugin')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupPageFX()
void setupWebGL()
