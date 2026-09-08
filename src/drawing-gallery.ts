import { t } from './i18n'
import { locale, observeReveals } from './shared'

/** Hosted demo-drawings site — assets stay remote, never bundled here. */
export const DEMO_DRAWINGS_BASE = 'https://mlightcad.com/demo-drawings'

interface CatalogDrawing {
  folder: string
  title?: string
  preview?: string
  manifest?: string
  dwg?: string
  dwgFile?: string
  dwgSize?: number
}

interface CatalogPayload {
  drawings: CatalogDrawing[]
}

type GalleryLoadState = 'idle' | 'loading' | 'ready' | 'error'

let loadState: GalleryLoadState = 'idle'

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const cleaned = path.replace(/^\.\//, '').replace(/^\//, '')
  return `${DEMO_DRAWINGS_BASE}/${cleaned}`
}

function folderTitle(folder: string): string {
  return folder.replace(/_/g, ' ')
}

function formatBytes(bytes: number | undefined): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes < 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  const digits = value >= 100 || unit === 0 ? 0 : value >= 10 ? 1 : 2
  return `${value.toFixed(digits)} ${units[unit]}`
}

function viewerUrl(item: CatalogDrawing): string {
  const manifest = absoluteUrl(item.manifest || `drawings/${item.folder}/drawing.acex.json`)
  return `${DEMO_DRAWINGS_BASE}/drawings/viewer.html?manifest=${encodeURIComponent(manifest)}`
}

function downloadIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('aria-hidden', 'true')
  svg.innerHTML =
    '<path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 13.59V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/>'
  return svg
}

function setStatus(el: HTMLElement | null, message: string, isError = false): void {
  if (!el) return
  el.textContent = message
  el.classList.toggle('drawing-gallery__status--error', isError)
  el.hidden = !message
}

function renderCards(drawings: CatalogDrawing[]): void {
  const grid = document.querySelector<HTMLElement>('[data-drawing-gallery-grid]')
  const status = document.querySelector<HTMLElement>('[data-drawing-gallery-status]')
  if (!grid) return

  const dict = t(locale).gallery
  grid.innerHTML = ''

  const items = drawings.filter((item) => typeof item.folder === 'string' && item.folder.length > 0)

  if (!items.length) {
    setStatus(status, dict.empty)
    return
  }

  for (const item of items) {
    const folder = item.folder
    const title = item.title || folderTitle(folder)
    const dwgPath = absoluteUrl(item.dwg || `drawings/${folder}/drawing.dwg`)
    const dwgName = item.dwgFile || dwgPath.split('/').pop() || 'drawing.dwg'
    const sizeLabel = formatBytes(item.dwgSize)

    const card = document.createElement('article')
    card.className = 'drawing-gallery__card reveal'

    const meta = document.createElement('div')
    meta.className = 'drawing-gallery__meta'

    const heading = document.createElement('h3')
    heading.className = 'drawing-gallery__title'
    heading.textContent = title

    const size = document.createElement('span')
    size.className = 'drawing-gallery__size'
    size.textContent = sizeLabel ? `DWG ${sizeLabel}` : ''

    meta.append(heading, size)

    const thumb = document.createElement('div')
    thumb.className = 'drawing-gallery__thumb'

    const link = document.createElement('a')
    link.className = 'drawing-gallery__thumb-link'
    link.href = viewerUrl(item)
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', dict.openAria.replace('{title}', title))

    const img = document.createElement('img')
    img.src = absoluteUrl(item.preview || `drawings/${folder}/preview.jpg`)
    img.alt = `${title} preview`
    img.loading = 'lazy'
    img.width = 640
    img.height = 480
    link.appendChild(img)

    const download = document.createElement('a')
    download.className = 'drawing-gallery__download'
    download.href = dwgPath
    download.download = dwgName
    download.dataset.dwgFile = dwgName
    download.target = '_blank'
    download.rel = 'noopener noreferrer'
    download.setAttribute('aria-label', dict.downloadAria.replace('{file}', dwgName))
    download.append(downloadIcon(), document.createTextNode(dict.download))

    thumb.append(link, download)
    card.append(meta, thumb)
    grid.appendChild(card)
  }

  setStatus(status, '')
  observeReveals(grid)
}

async function loadCatalog(): Promise<CatalogDrawing[]> {
  const res = await fetch(`${DEMO_DRAWINGS_BASE}/drawings/catalog.json`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load catalog (${res.status})`)
  const data = (await res.json()) as CatalogPayload
  if (!data || !Array.isArray(data.drawings)) {
    throw new Error('Invalid catalog.json format')
  }
  return data.drawings
}

/** Refresh gallery chrome strings after locale change (cards keep titles from catalog). */
export function refreshDrawingGalleryI18n(): void {
  const dict = t(locale).gallery
  document.querySelectorAll<HTMLAnchorElement>('.drawing-gallery__download').forEach((el) => {
    const file = el.dataset.dwgFile || el.download || 'drawing.dwg'
    el.setAttribute('aria-label', dict.downloadAria.replace('{file}', file))
    const text = el.childNodes[el.childNodes.length - 1]
    if (text?.nodeType === Node.TEXT_NODE) text.textContent = dict.download
  })

  document.querySelectorAll<HTMLAnchorElement>('.drawing-gallery__thumb-link').forEach((el) => {
    const title =
      el.closest('.drawing-gallery__card')?.querySelector('.drawing-gallery__title')?.textContent ||
      ''
    el.setAttribute('aria-label', dict.openAria.replace('{title}', title))
  })

  const status = document.querySelector<HTMLElement>('[data-drawing-gallery-status]')
  if (!status) return

  if (loadState === 'loading') {
    setStatus(status, dict.loading)
    return
  }

  if (loadState === 'error') {
    setStatus(status, dict.error, true)
    return
  }

  if (loadState === 'ready') {
    const grid = document.querySelector('[data-drawing-gallery-grid]')
    const n = grid?.querySelectorAll('.drawing-gallery__card').length ?? 0
    setStatus(status, n > 0 ? '' : dict.empty)
  }
}

/** Mount the homepage drawing gallery (remote catalog from demo-drawings). */
export function setupDrawingGallery(): void {
  const grid = document.querySelector('[data-drawing-gallery-grid]')
  const status = document.querySelector<HTMLElement>('[data-drawing-gallery-status]')
  if (!grid || loadState !== 'idle') return
  loadState = 'loading'

  setStatus(status, t(locale).gallery.loading)

  void loadCatalog()
    .then((drawings) => {
      loadState = 'ready'
      renderCards(drawings)
    })
    .catch(() => {
      loadState = 'error'
      setStatus(status, t(locale).gallery.error, true)
    })
}
