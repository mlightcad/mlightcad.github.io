import './styles/main.css'
import { scrambleMeta, setupPageFX } from './fx'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  getByPath,
  locale,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'
import {
  refreshDrawingGalleryI18n,
  setupDrawingGallery,
} from './drawing-gallery'
import { refreshTryDrawingI18n, setupTryDrawing } from './try-drawing'

/** Apply homepage copy, feature/plugin/resource lists, and try-drawing i18n. */
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

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') el.innerHTML = value
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-guarantees]').forEach((list) => {
    list.innerHTML = dict.hero.guarantees
      .map((item) => `<li><span class="firsts__mark">01</span><span>${item}</span></li>`)
      .join('')
    list.querySelectorAll('li').forEach((li, i) => {
      const mark = li.querySelector('.firsts__mark')
      if (mark) mark.textContent = String(i + 1).padStart(2, '0')
    })
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-highlights]').forEach((list) => {
    const items = dict.flagship.highlights
    list.innerHTML = items
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

  const pathsRoot = document.querySelector('[data-i18n-platform-paths]')
  if (pathsRoot) {
    pathsRoot.innerHTML = dict.platform.paths
      .map(
        (pathItem) =>
          `<article class="path-card"><p class="path-card__label">${pathItem.label}</p><h3>${pathItem.title}</h3><p>${pathItem.body}</p><a class="btn btn--ghost" href="${pathItem.href}">${pathItem.cta}</a></article>`,
      )
      .join('')
  }

  const featuresRoot = document.querySelector('[data-i18n-features]')
  if (featuresRoot) {
    featuresRoot.innerHTML = dict.features.items
      .map((item, index) => {
        const reverse = index % 2 === 1 ? ' feature--reverse' : ''
        const actions =
          item.actions
            ?.map((action) => {
              const variant = action.variant === 'ghost' ? 'btn--ghost' : 'btn--primary btn--glow'
              const download = action.download ? ` download="${action.download}"` : ''
              const isExternal = /^https?:\/\//i.test(action.href)
              const target = action.download || !isExternal ? '' : ' target="_blank" rel="noopener"'
              return `<a class="btn ${variant}" href="${action.href}"${target}${download}>${action.label}</a>`
            })
            .join('') ?? ''
        const actionsBlock = actions ? `<div class="feature__actions">${actions}</div>` : ''
        return `
          <article class="feature reveal${reverse}" id="feature-${item.id}">
            <figure class="feature__visual">
              <img src="${item.image}" alt="${item.imageAlt}" width="640" height="400" loading="lazy" />
            </figure>
            <div class="feature__copy">
              <p class="feature__index">${String(index + 1).padStart(2, '0')}</p>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
              ${actionsBlock}
            </div>
          </article>
        `
      })
      .join('')
  }

  const plugins = document.querySelector('[data-i18n-plugins]')
  if (plugins) {
    plugins.innerHTML = dict.plugins.items
      .map((p) => `<li><strong>${p.name}</strong><span>${p.role}</span></li>`)
      .join('')
  }

  const showcase = document.querySelector('[data-i18n-showcase]')
  if (showcase) {
    showcase.innerHTML = dict.showcase.items
      .map((link) => {
        const external = /^https?:\/\//i.test(link.href)
        const target = external ? ' target="_blank" rel="noopener"' : ''
        return `<a href="${link.href}"${target}><strong>${link.name}</strong><span>${link.desc}</span></a>`
      })
      .join('')
  }

  const resources = document.querySelector('[data-i18n-resources]')
  if (resources) {
    resources.innerHTML = dict.resources.links
      .map((link) => {
        const external = /^https?:\/\//i.test(link.href)
        const target = external ? ' target="_blank" rel="noopener"' : ''
        return `<a href="${link.href}"${target}><strong>${link.name}</strong><span>${link.desc}</span></a>`
      })
      .join('')
  }

  const brandEl = document.querySelector<HTMLElement>('[data-i18n="hero.brand"]')
  if (brandEl) brandEl.innerHTML = 'MLight<em>CAD</em>'

  refreshTryDrawingI18n()
  refreshDrawingGalleryI18n()
  window.setTimeout(() => scrambleMeta(dict.hero.meta), 450)
  observeReveals()
}

mountShell('home')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupTryDrawing()
setupDrawingGallery()
setupPageFX({ boot: true })
void setupWebGL()
