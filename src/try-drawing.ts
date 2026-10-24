import { t } from './i18n'
import { locale, setBackgroundWebGLPaused } from './shared'

/** Lazily loaded CAD simple-viewer module. */
type ViewerModule = typeof import('./try-drawing/viewer')

/** Lazily loaded full `@mlightcad/cad-viewer` (ribbon) module. */
type CadViewerAppModule = typeof import('./try-drawing/cad-viewer-app')

/** Handle for a mounted full CAD Viewer app. */
type CadViewerAppHandle = Awaited<ReturnType<CadViewerAppModule['mountCadViewerApp']>>

/** Open result shape from the lazy viewer module (avoid static import). */
type OpenDrawingResult = Awaited<ReturnType<ViewerModule['openLocalDrawing']>>

/** Visual state of the homepage try-drawing widget. */
type UiState = 'idle' | 'loading' | 'viewing' | 'error'

/** DOM nodes owned by the try-drawing widget. */
interface TryDrawingElements {
  /** Outer widget root used for data-state. */
  root: HTMLElement
  /** Chrome frame that expands to fullscreen. */
  chrome: HTMLElement
  /** Title shown in the widget bar. */
  title: HTMLElement
  /** Idle drop-target panel. */
  idle: HTMLElement
  /** Drop zone that accepts DWG/DXF files. */
  dropzone: HTMLElement
  /** Loading status panel. */
  loading: HTMLElement
  /** Loading status text. */
  status: HTMLElement
  /** Error panel. */
  error: HTMLElement
  /** Error message body. */
  errorMsg: HTMLElement
  /** Viewer host shown while loading or viewing. */
  viewer: HTMLElement
  /** Canvas container passed to cad-simple-viewer. */
  canvasHost: HTMLElement
  /** Hidden file input. */
  input: HTMLInputElement
  /** Retry button shown after an error. */
  retryBtn: HTMLButtonElement
  /** Fullscreen toggle (optional — hidden for CAD try-drawing; tiny window is unusable). */
  fullscreenBtn: HTMLButtonElement | null
  /** Close / reset button. */
  closeBtn: HTMLButtonElement
  /** Caption under the widget. */
  caption: HTMLElement
}

/** Localized copy shape for the try-drawing widget. */
type TryDrawingCopy = ReturnType<typeof defaultTryDrawingCopy>

/** Default try-drawing strings from the active locale dictionary. */
function defaultTryDrawingCopy() {
  return t(locale).tryDrawing
}

let resolveCopy: () => TryDrawingCopy = defaultTryDrawingCopy

/** Localized copy for the try-drawing widget (supports page-level overrides). */
function copy() {
  return resolveCopy()
}

/**
 * Format a byte size for the open-file caption.
 *
 * @param bytes - File size in bytes.
 * @returns Human-readable size string.
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Whether the file name looks like a DWG or DXF drawing.
 *
 * @param file - Candidate file from the picker or drop target.
 * @returns `true` when the extension is `.dwg` or `.dxf`.
 */
function isCadFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return name.endsWith('.dxf') || name.endsWith('.dwg')
}

let refreshCopy: (() => void) | null = null

/** Re-apply try-drawing copy after locale changes without clobbering open-file state. */
export function refreshTryDrawingI18n(): void {
  refreshCopy?.()
}

/**
 * Localized message for a failed open, including DWG converter license failures.
 *
 * @param fileName - Drawing that failed to open.
 * @param result - Structured open result when available.
 * @returns User-facing error text.
 */
function openFailureMessage(fileName: string, result?: OpenDrawingResult): string {
  const c = copy()
  const code = result && !result.ok ? result.errorCode : undefined
  if (code === 'license_expired') {
    return c.errorLicenseExpired.replace('{name}', fileName)
  }
  if (code === 'license_invalid') {
    return c.errorLicenseInvalid.replace('{name}', fileName)
  }
  return c.errorOpen.replace('{name}', fileName)
}

/** Options for the in-page try-drawing widget. */
export interface TryDrawingOptions {
  /** Access mode when opening a local DWG/DXF. Defaults to write. */
  mode?: 'read' | 'review' | 'write'
  /**
   * CAD stack to mount.
   * - `simple` — `@mlightcad/cad-simple-viewer` + simple-ui toolbar (CAD Viewer page)
   * - `cad-viewer` — `@mlightcad/cad-viewer` Vue component with ribbon (CAD Editor page)
   */
  engine?: 'simple' | 'cad-viewer'
  /**
   * After first paint, warm the CAD chunks in the background so the first
   * open is faster. Defaults to `true`. Skipped when `Save-Data` is on.
   */
  prefetchEngine?: boolean
  /** Show the CAD toolbar after init (simple engine; also restored when leaving fullscreen). */
  toolbar?: boolean
  /** Show the command line after init (simple engine; also restored when leaving fullscreen). */
  commandLine?: boolean
  /**
   * Optional copy provider (e.g. CAD Editor merges write-mode strings onto the
   * shared `tryDrawing` dictionary).
   */
  getCopy?: () => TryDrawingCopy
}

/**
 * Whether the browser asked to reduce background data use.
 *
 * @returns `true` when prefetch should be skipped.
 */
function prefersSaveData(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return conn?.saveData === true
}

/**
 * After idle, download CAD engine chunks without blocking first paint.
 *
 * @param engine - Which dynamic-import graph to warm.
 */
function scheduleEnginePrefetch(engine: 'simple' | 'cad-viewer'): void {
  if (prefersSaveData()) return

  const warm = (): void => {
    if (engine === 'cad-viewer') {
      // UI stack (vue / element-plus / cad-viewer) — DWG converter is a nested import.
      void import('./try-drawing/cad-viewer-app')
      // Warm RealDWG in parallel so the first open does not wait on it serially.
      void import('./try-drawing/dwgConverter')
      return
    }
    void import('./try-drawing/viewer')
  }

  const ric = window.requestIdleCallback?.bind(window)
  if (ric) {
    ric(() => warm(), { timeout: 6000 })
  } else {
    window.setTimeout(warm, 2500)
  }
}

/**
 * Mount the local DWG/DXF try-drawing widget when `[data-try-drawing]` is present.
 *
 * @param options - Open mode, engine, and chrome preferences.
 */
export function setupTryDrawing(options: TryDrawingOptions = {}): void {
  const chrome = document.querySelector<HTMLElement>('[data-try-drawing]')
  if (!chrome) return

  resolveCopy = options.getCopy ?? defaultTryDrawingCopy
  const openMode = options.mode ?? 'write'
  const engine = options.engine ?? 'simple'
  const shouldPrefetch = options.prefetchEngine !== false
  const preferToolbar = options.toolbar ?? false
  const preferCommandLine = options.commandLine ?? false

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
    retryBtn: chrome.querySelector('[data-try-drawing-retry]')!,
    fullscreenBtn: chrome.querySelector('[data-try-drawing-fullscreen]'),
    closeBtn: chrome.querySelector('[data-try-drawing-close]')!,
    caption: chrome.querySelector('[data-try-drawing-caption]')!,
  }

  if (!els.root || !els.dropzone || !els.input || !els.canvasHost || !els.closeBtn) return

  // Shrink-to-card is unusable for the CAD stack — keep the drawing fullscreen until close.
  els.fullscreenBtn?.setAttribute('hidden', '')
  if (els.fullscreenBtn) els.fullscreenBtn.hidden = true

  const FULLSCREEN_MS = 420

  let state: UiState = 'idle'
  let viewerMod: ViewerModule | null = null
  let cadViewerApp: CadViewerAppHandle | null = null
  let currentFileName = ''
  let dragDepth = 0
  let loadGen = 0
  let fullscreenAnimGen = 0

  /** Tear down a mounted full CAD Viewer app (ribbon engine). */
  const destroyCadViewerApp = (): void => {
    cadViewerApp?.destroy()
    cadViewerApp = null
  }

  /**
   * Apply widget UI for the given state.
   *
   * @param next - Target visual state.
   */
  const setState = (next: UiState): void => {
    state = next
    const c = copy()
    els.idle.hidden = next !== 'idle'
    els.loading.hidden = next !== 'loading'
    els.error.hidden = next !== 'error'
    // Keep the viewer mounted (and measurable) while loading so WebGL can size itself.
    els.viewer.hidden = next !== 'viewing' && next !== 'loading'
    const showActions = next === 'viewing' || next === 'loading'
    // Never offer shrink-to-card; only the close control is shown while open.
    if (els.fullscreenBtn) els.fullscreenBtn.hidden = true
    els.closeBtn.hidden = !showActions
    els.root.dataset.state = next === 'loading' && !els.viewer.hidden ? 'viewing' : next
    els.chrome.classList.toggle('is-viewing', next === 'viewing' || next === 'loading')

    if (next === 'idle') {
      destroyCadViewerApp()
      els.title.textContent = c.barIdle
      els.caption.textContent = c.caption
      currentFileName = ''
    } else if (next === 'loading') {
      els.title.textContent = c.barLoading
    } else if (next === 'viewing' && currentFileName) {
      els.title.textContent = currentFileName
    }
  }

  /** Whether the user prefers reduced motion. */
  const prefersReducedMotion = (): boolean =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /** Clear inline FLIP animation styles on the chrome frame. */
  const clearFullscreenAnimStyles = (): void => {
    els.chrome.classList.remove('is-fullscreen-animating')
    els.chrome.style.transition = ''
    els.chrome.style.transform = ''
    els.chrome.style.transformOrigin = ''
    els.chrome.style.willChange = ''
  }

  /**
   * Toggle fullscreen class names, CAD chrome, and the background WebGL loop.
   *
   * @param on - Whether the widget should occupy the viewport.
   */
  const applyFullscreenState = (on: boolean): void => {
    els.chrome.classList.toggle('is-fullscreen', on)
    document.documentElement.classList.toggle('try-drawing-fullscreen', on)
    document.body.classList.toggle('try-drawing-fullscreen', on)
    els.fullscreenBtn?.setAttribute('aria-pressed', String(on))
    els.fullscreenBtn?.setAttribute(
      'aria-label',
      on ? copy().exitFullscreen : copy().fullscreen,
    )
    if (engine === 'cad-viewer') {
      // Editor always keeps the ribbon; fullscreen only expands the host frame.
      cadViewerApp?.setRibbonVisible(true)
    } else {
      viewerMod?.setViewerChromeVisible(on, {
        toolbar: preferToolbar,
        commandLine: preferCommandLine,
      })
    }
    // Stop the decorative background renderer while the CAD viewer owns the screen.
    setBackgroundWebGLPaused(on)
  }

  /**
   * Enter or leave fullscreen, optionally animating with FLIP.
   *
   * @param on - Target fullscreen state.
   */
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

    /**
     * Drop leftover FLIP styles after the transition ends or times out.
     */
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

  /** Open the hidden file picker unless a load is already in progress. */
  const openPicker = (): void => {
    if (state === 'loading') return
    els.input.click()
  }

  /**
   * Abort a stale load and show the error panel.
   *
   * @param gen - Load generation that produced the failure.
   * @param message - Localized error text.
   */
  const failOpen = (gen: number, message: string): void => {
    if (gen !== loadGen) return
    els.errorMsg.textContent = message
    setFullscreen(false)
    setState('error')
  }

  /**
   * Parse and display a local DWG/DXF file in the widget.
   *
   * @param file - Drawing chosen by the user.
   */
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
      if (engine === 'cad-viewer') {
        els.status.textContent = copy().statusLoadingViewer
        const appMod = await import('./try-drawing/cad-viewer-app')
        if (gen !== loadGen) return

        els.status.textContent = copy().statusInit
        // Remount so `localFile` is applied on create (prop watch is not guaranteed).
        destroyCadViewerApp()
        cadViewerApp = await appMod.mountCadViewerApp(els.canvasHost, {
          localFile: file,
          mode: openMode,
          locale: 'en',
          theme: 'dark',
        })
        if (gen !== loadGen) {
          destroyCadViewerApp()
          return
        }

        els.loading.hidden = true
        els.caption.textContent = copy().captionOpen
          .replace('{name}', file.name)
          .replace('{size}', formatSize(file.size))
        setState('viewing')
        setFullscreen(els.chrome.classList.contains('is-fullscreen'))
        return
      }

      if (!viewerMod) {
        els.status.textContent = copy().statusLoadingViewer
        viewerMod = await import('./try-drawing/viewer')
        if (gen !== loadGen) return
      }

      els.status.textContent = copy().statusInit
      const ready = await viewerMod.ensureViewer(els.viewer, els.canvasHost, {
        toolbar: preferToolbar,
        commandLine: preferCommandLine,
      })
      if (gen !== loadGen) return
      if (!ready) {
        failOpen(gen, copy().errorInit)
        return
      }

      // cad-simple-viewer shows its own busy indicator while parsing.
      els.loading.hidden = true

      const result = await viewerMod.openLocalDrawing(file, {
        mode: viewerMod.parseOpenMode(openMode),
      })
      if (gen !== loadGen) return
      if (!result.ok) {
        failOpen(gen, openFailureMessage(file.name, result))
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
      failOpen(gen, openFailureMessage(file.name))
    }
  }

  document.querySelectorAll<HTMLButtonElement>('[data-try-drawing-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      openPicker()
    })
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

  /** Close the drawing and restore the marketing page / idle dropzone. */
  const closeDrawing = (): void => {
    loadGen += 1
    setFullscreen(false)
    setState('idle')
  }

  els.closeBtn.addEventListener('click', () => {
    closeDrawing()
  })

  // Traffic-light red dot — same close action as the window chrome button.
  chrome.querySelectorAll<HTMLElement>('[data-try-drawing-close-dot]').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation()
      if (state === 'idle') return
      closeDrawing()
    })
    dot.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      if (state === 'idle') return
      closeDrawing()
    })
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    // Stay fullscreen while open — Esc closes and returns to the page.
    if (state === 'viewing' || state === 'loading' || state === 'error') {
      closeDrawing()
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
    els.closeBtn.setAttribute('aria-label', c.close)
  }

  setState('idle')

  if (shouldPrefetch) {
    scheduleEnginePrefetch(engine)
  }
}
