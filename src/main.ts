import './styles/main.css'
import { scrambleMeta, setupPageFX } from './fx'
import { cadViewerDocsUrl, t } from './i18n'
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

/** Redirect legacy homepage deep links that moved to the CAD Viewer page. */
function redirectLegacyProductHash(): void {
  const hash = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!hash) return
  const legacy = new Set(['product', 'features', 'gallery', 'plugins'])
  if (!legacy.has(hash) && !hash.startsWith('feature-')) return
  const target = hash.startsWith('feature-') || hash === 'features' || hash === 'gallery' || hash === 'plugins'
    ? `/cad-viewer.html#${hash}`
    : '/cad-viewer.html#product'
  location.replace(target)
}

/** Apply homepage copy for platform, showcase, and resources. */
function applyI18n(): void {
  const dict = t(locale)
  applyPageMeta({
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    locale,
    path: '/',
  })

  applyCommonI18n(dict)

  document.querySelectorAll<HTMLElement>('[data-i18n-guarantees]').forEach((list) => {
    list.innerHTML = dict.hero.guarantees
      .map((item) => `<li><span class="firsts__mark">01</span><span>${item}</span></li>`)
      .join('')
    list.querySelectorAll('li').forEach((li, i) => {
      const mark = li.querySelector('.firsts__mark')
      if (mark) mark.textContent = String(i + 1).padStart(2, '0')
    })
  })

  const layersRoot = document.querySelector('[data-i18n-platform-layers]')
  if (layersRoot) {
    layersRoot.innerHTML = dict.platform.layers
      .map(
        (layer, index) =>
          `<li><span class="platform-stack__index">${String(index + 1).padStart(2, '0')}</span><div><strong>${layer.name}</strong><span>${layer.desc}</span></div></li>`,
      )
      .join('')
  }

  const showcase = document.querySelector('[data-i18n-showcase]')
  if (showcase) {
    showcase.innerHTML = dict.showcase.items
      .map((link) => {
        const external = /^https?:\/\//i.test(link.href)
        const target = external ? ' target="_blank" rel="noopener"' : ''
        const icon = `/assets/products/${link.id}.svg`
        return `<a class="product-card" href="${link.href}"${target}><img class="product-card__icon" src="${icon}" alt="" width="48" height="48" loading="lazy" decoding="async" /><div class="product-card__copy"><strong>${link.name}</strong><span>${link.desc}</span></div></a>`
      })
      .join('')
  }

  const resources = document.querySelector('[data-i18n-resources]')
  if (resources) {
    resources.innerHTML = dict.resources.links
      .map((link) => {
        const href =
          link.id === 'user-guide'
            ? cadViewerDocsUrl('', locale)
            : link.id === 'development-guide'
              ? cadViewerDocsUrl('development', locale)
              : link.href
        const external = /^https?:\/\//i.test(href)
        const target = external ? ' target="_blank" rel="noopener"' : ''
        const icon = `/assets/resources/${link.id}.svg`
        return `<a class="product-card" href="${href}"${target}><img class="product-card__icon" src="${icon}" alt="" width="48" height="48" loading="lazy" decoding="async" /><div class="product-card__copy"><strong>${link.name}</strong><span>${link.desc}</span></div></a>`
      })
      .join('')
  }

  const brandEl = document.querySelector<HTMLElement>('[data-i18n="hero.brand"]')
  if (brandEl) brandEl.innerHTML = 'MLight<em>CAD</em>'

  window.setTimeout(() => scrambleMeta(dict.hero.meta), 450)
  observeReveals()
}

redirectLegacyProductHash()
mountShell('home')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupPageFX({ boot: true })
void setupWebGL()
