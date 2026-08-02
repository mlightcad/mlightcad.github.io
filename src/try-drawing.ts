import { t } from './i18n'
import { locale, setBackgroundWebGLPaused } from './shared'

type ViewerModule = typeof import('./try-drawing/viewer')

type UiState = 'idle' | 'loading' | 'viewing' | 'error'

interface TryDrawingElements {
  root: HTMLElement
  chrome: HTMLElement
  title: HTMLElement
  idle: HTMLElement
  dropzone: HTMLElement
  loading: HTMLElement
  status: HTMLElement
  error: HTMLElement
  errorMsg: HTMLElement
  viewer: HTMLElement
  canvasHost: HTMLElement
  input: HTMLInputElement
  openBtn: HTMLButtonElement
  retryBtn: HTMLButtonElement
  fullscreenBtn: HTMLButtonElement
  closeBtn: HTMLButtonElement
  caption: HTMLElement
}

function copy() {
  return t(locale).tryDrawing
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isCadFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return name.endsWith('.dxf') || name.endsWith('.dwg')
}

let refreshCopy: (() => void) | null = null

/** Re-apply try-drawing copy after locale changes without clobbering open-file state. */
export function refreshTryDrawingI18n(): void {
  refreshCopy?.()
}

export function setupTryDrawing(): void {
  const chrome = document.querySelector<HTMLElement>('[data-try-drawing]')
  if (!chrome) return

  const els: TryDrawingElements = {
    root: chrome.querySelector('[data-try-drawing-root]')!,
    chrome,
    title: chrome.querySelector('[data-try-drawing-title]')!,
    idle: chrome.querySelector('[data-try-drawing-idle]')!,
    dropzone: chrome.querySelector('[data-try-drawing-dropzone]')!,
    loading: chrome.querySelector('[data-try-drawing-loading]')!,
    status: chrome.querySelector('[data-try-drawing-status]')!,
    error: chrome.querySelector('[data-try-drawing-error]')!,
    errorMsg: chrome.querySelector('[data-try-drawing-error-msg]')!,
    viewer: chrome.querySelector('[data-try-drawing-viewer]')!,
    canvasHost: chrome.querySelector('[data-try-drawing-container]')!,
    input: chrome.querySelector('[data-try-drawing-input]')!,
    openBtn: chrome.querySelector('[data-try-drawing-open]')!,
    retryBtn: chrome.querySelector('[data-try-drawing-retry]')!,
    fullscreenBtn: chrome.querySelector('[data-try-drawing-fullscreen]')!,
    closeBtn: chrome.querySelector('[data-try-drawing-close]')!,
    caption: chrome.querySelector('[data-try-drawing-caption]')!,
  }

  if (!els.root || !els.dropzone || !els.input || !els.canvasHost) return

  let state: UiState = 'idle'
  let viewerMod: ViewerModule | null = null
  let currentFileName = ''
  let dragDepth = 0

  const setState = (next: UiState): void => {
    state = next
    const c = copy()
    els.idle.hidden = next !== 'idle'
    els.loading.hidden = next !== 'loading'
    els.error.hidden = next !== 'error'
    // Keep the viewer mounted (and measurable) while loading so WebGL can size itself.
    els.viewer.hidden = next !== 'viewing' && next !== 'loading'
    els.fullscreenBtn.hidden = next !== 'viewing'
    els.closeBtn.hidden = next !== 'viewing'
    els.root.dataset.state = next === 'loading' && !els.viewer.hidden ? 'viewing' : next
    els.chrome.classList.toggle('is-viewing', next === 'viewing' || next === 'loading')

    if (next === 'idle') {
      els.title.textContent = c.barIdle
      els.caption.textContent = c.caption
      currentFileName = ''
    } else if (next === 'loading') {
      els.title.textContent = c.barLoading
    } else if (next === 'viewing' && currentFileName) {
      els.title.textContent = currentFileName
    }
  }

  const setFullscreen = (on: boolean): void => {
    els.chrome.classList.toggle('is-fullscreen', on)
    document.documentElement.classList.toggle('try-drawing-fullscreen', on)
    document.body.classList.toggle('try-drawing-fullscreen', on)
    els.fullscreenBtn.setAttribute('aria-pressed', String(on))
    els.fullscreenBtn.setAttribute('aria-label', on ? copy().exitFullscreen : copy().fullscreen)
    viewerMod?.setViewerChromeVisible(on)
    // Stop the decorative background renderer while the CAD viewer owns the screen.
    setBackgroundWebGLPaused(on)
  }

  const openPicker = (): void => {
    if (state === 'loading') return
    els.input.click()
  }

  const loadFile = async (file: File): Promise<void> => {
    if (state === 'loading') return

    if (!isCadFile(file)) {
      els.errorMsg.textContent = copy().errorType
      setState('error')
      return
    }

    currentFileName = file.name
    els.status.textContent = copy().statusLoading
    setState('loading')

    try {
      if (!viewerMod) {
        els.status.textContent = copy().statusLoadingViewer
        viewerMod = await import('./try-drawing/viewer')
      }

      els.status.textContent = copy().statusInit
      const ready = await viewerMod.ensureViewer(els.viewer, els.canvasHost)
      if (!ready) {
        els.errorMsg.textContent = copy().errorInit
        setState('error')
        return
      }

      els.status.textContent = copy().statusParsing
      const success = await viewerMod.openLocalDrawing(file)
      if (!success) {
        els.errorMsg.textContent = copy().errorOpen.replace('{name}', file.name)
        setState('error')
        return
      }

      els.caption.textContent = copy().captionOpen
        .replace('{name}', file.name)
        .replace('{size}', formatSize(file.size))
      setState('viewing')
    } catch (error) {
      console.error('Failed to open drawing:', error)
      els.errorMsg.textContent = copy().errorOpen.replace('{name}', file.name)
      setState('error')
    }
  }

  els.openBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    openPicker()
  })

  els.retryBtn.addEventListener('click', () => {
    setState('idle')
    openPicker()
  })

  els.dropzone.addEventListener('click', () => {
    openPicker()
  })

  els.dropzone.addEventListener('dragenter', (e) => {
    e.preventDefault()
    dragDepth += 1
    els.dropzone.classList.add('is-dragover')
  })

  els.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault()
    els.dropzone.classList.add('is-dragover')
  })

  els.dropzone.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1)
    if (dragDepth === 0) els.dropzone.classList.remove('is-dragover')
  })

  els.dropzone.addEventListener('drop', (e) => {
    e.preventDefault()
    dragDepth = 0
    els.dropzone.classList.remove('is-dragover')
    const file = e.dataTransfer?.files?.[0]
    if (file) void loadFile(file)
  })

  els.input.addEventListener('change', () => {
    const file = els.input.files?.[0]
    els.input.value = ''
    if (file) void loadFile(file)
  })

  els.fullscreenBtn.addEventListener('click', () => {
    setFullscreen(!els.chrome.classList.contains('is-fullscreen'))
  })

  els.closeBtn.addEventListener('click', () => {
    setFullscreen(false)
    setState('idle')
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.chrome.classList.contains('is-fullscreen')) {
      setFullscreen(false)
    }
  })

  refreshCopy = () => {
    const c = copy()
    if (state === 'idle') {
      els.title.textContent = c.barIdle
      els.caption.textContent = c.caption
    } else if (state === 'loading') {
      els.title.textContent = c.barLoading
    } else if (state === 'viewing' && currentFileName) {
      els.title.textContent = currentFileName
    }
    if (els.chrome.classList.contains('is-fullscreen')) {
      els.fullscreenBtn.setAttribute('aria-label', c.exitFullscreen)
    } else {
      els.fullscreenBtn.setAttribute('aria-label', c.fullscreen)
    }
    els.closeBtn.setAttribute('aria-label', c.close)
  }

  setState('idle')
}
