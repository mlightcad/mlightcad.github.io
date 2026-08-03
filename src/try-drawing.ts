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

  const FULLSCREEN_MS = 420

  let state: UiState = 'idle'
  let viewerMod: ViewerModule | null = null
  let currentFileName = ''
  let dragDepth = 0
  let loadGen = 0
  let fullscreenAnimGen = 0

  const setState = (next: UiState): void => {
    state = next
    const c = copy()
    els.idle.hidden = next !== 'idle'
    els.loading.hidden = next !== 'loading'
    els.error.hidden = next !== 'error'
    // Keep the viewer mounted (and measurable) while loading so WebGL can size itself.
    els.viewer.hidden = next !== 'viewing' && next !== 'loading'
    const showActions = next === 'viewing' || next === 'loading'
    els.fullscreenBtn.hidden = !showActions
    els.closeBtn.hidden = !showActions
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

  const prefersReducedMotion = (): boolean =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const clearFullscreenAnimStyles = (): void => {
    els.chrome.classList.remove('is-fullscreen-animating')
    els.chrome.style.transition = ''
    els.chrome.style.transform = ''
    els.chrome.style.transformOrigin = ''
    els.chrome.style.willChange = ''
  }

  const applyFullscreenState = (on: boolean): void => {
    els.chrome.classList.toggle('is-fullscreen', on)
    document.documentElement.classList.toggle('try-drawing-fullscreen', on)
    document.body.classList.toggle('try-drawing-fullscreen', on)
    els.fullscreenBtn.setAttribute('aria-pressed', String(on))
    els.fullscreenBtn.setAttribute('aria-label', on ? copy().exitFullscreen : copy().fullscreen)
    viewerMod?.setViewerChromeVisible(on)
    // Stop the decorative background renderer while the CAD viewer owns the screen.
    setBackgroundWebGLPaused(on)
  }

  const setFullscreen = (on: boolean): void => {
    const already = els.chrome.classList.contains('is-fullscreen')
    if (already === on) {
      // Sync chrome if the viewer finished init after fullscreen entered during load.
      viewerMod?.setViewerChromeVisible(on)
      setBackgroundWebGLPaused(on)
      return
    }

    const animGen = ++fullscreenAnimGen
    clearFullscreenAnimStyles()

    if (prefersReducedMotion()) {
      applyFullscreenState(on)
      return
    }

    const first = els.chrome.getBoundingClientRect()
    applyFullscreenState(on)
    const last = els.chrome.getBoundingClientRect()

    if (first.width < 1 || first.height < 1 || last.width < 1 || last.height < 1) return

    const dx = first.left - last.left
    const dy = first.top - last.top
    const sx = first.width / last.width
    const sy = first.height / last.height

    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) {
      return
    }

    els.chrome.classList.add('is-fullscreen-animating')
    els.chrome.style.transformOrigin = 'top left'
    els.chrome.style.willChange = 'transform'
    els.chrome.style.transition = 'none'
    els.chrome.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    void els.chrome.offsetWidth

    els.chrome.style.transition = `transform ${FULLSCREEN_MS}ms var(--ease)`
    els.chrome.style.transform = 'translate(0px, 0px) scale(1)'

    const finish = (): void => {
      if (animGen !== fullscreenAnimGen) return
      clearFullscreenAnimStyles()
    }

    els.chrome.addEventListener(
      'transitionend',
      (e) => {
        if (e.target === els.chrome && e.propertyName === 'transform') finish()
      },
      { once: true },
    )
    window.setTimeout(finish, FULLSCREEN_MS + 80)
  }

  const openPicker = (): void => {
    if (state === 'loading') return
    els.input.click()
  }

  const failOpen = (gen: number, message: string): void => {
    if (gen !== loadGen) return
    els.errorMsg.textContent = message
    setFullscreen(false)
    setState('error')
  }

  const loadFile = async (file: File): Promise<void> => {
    if (state === 'loading') return

    if (!isCadFile(file)) {
      els.errorMsg.textContent = copy().errorType
      setState('error')
      return
    }

    const gen = ++loadGen
    currentFileName = file.name
    els.status.textContent = copy().statusLoading
    setState('loading')
    // Expand while the file is still opening so the loading UI fills the screen.
    setFullscreen(true)

    try {
      if (!viewerMod) {
        els.status.textContent = copy().statusLoadingViewer
        viewerMod = await import('./try-drawing/viewer')
        if (gen !== loadGen) return
      }

      els.status.textContent = copy().statusInit
      const ready = await viewerMod.ensureViewer(els.viewer, els.canvasHost)
      if (gen !== loadGen) return
      if (!ready) {
        failOpen(gen, copy().errorInit)
        return
      }

      // cad-simple-viewer shows its own busy indicator while parsing.
      els.loading.hidden = true

      const success = await viewerMod.openLocalDrawing(file)
      if (gen !== loadGen) return
      if (!success) {
        failOpen(gen, copy().errorOpen.replace('{name}', file.name))
        return
      }

      els.caption.textContent = copy().captionOpen
        .replace('{name}', file.name)
        .replace('{size}', formatSize(file.size))
      setState('viewing')
      // Sync CAD chrome with current fullscreen (user may have exited during load).
      setFullscreen(els.chrome.classList.contains('is-fullscreen'))
    } catch (error) {
      console.error('Failed to open drawing:', error)
      failOpen(gen, copy().errorOpen.replace('{name}', file.name))
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
    loadGen += 1
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
