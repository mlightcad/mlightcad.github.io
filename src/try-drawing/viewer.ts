/**
 * Heavy CAD stack — loaded only via dynamic import from `try-drawing.ts`
 * or the embed page. Do not statically import this module from the homepage entry.
 */
import {
  AcApDocManager,
  AcApI18n,
  AcApOpenViewMode,
  AcApSettingManager,
  AcEdOpenMode,
  acedApplyUiTheme,
  type AcApLocale,
  type AcApOpenDatabaseOptions,
  type AcEdUiTheme,
} from '@mlightcad/cad-simple-viewer'
import { registerPrivateDwgConverter } from './dwgConverter'
import { getSimpleUiPlugin, registerPlugins } from './register'

let initialized = false

/** Drawing open mode accepted by the embed query string. */
export type ViewerOpenMode = 'read' | 'review' | 'write'

/** Chrome and locale options when creating or reusing the CAD viewer. */
export interface EnsureViewerOptions {
  /** UI theme applied to the host element. */
  theme?: AcEdUiTheme
  /** Viewer UI locale (`en`, `zh`, `tr`, or `cs`). */
  lang?: AcApLocale
  /** Whether to show the toolbar. */
  toolbar?: boolean
  /** Whether to show the command line. */
  commandLine?: boolean
}

/** Options forwarded to `openDocument`. */
export interface OpenDrawingOptions {
  /** Access mode for the opened drawing. */
  mode?: AcEdOpenMode
  /** Initial view framing after open. */
  openViewMode?: AcApOpenViewMode
}

const DEFAULT_OPEN: AcApOpenDatabaseOptions = {
  minimumChunkSize: 1000,
  mode: AcEdOpenMode.Write,
  drawNoPlotLayers: false,
  progressiveRendering: false,
}

/**
 * Show or hide the command line and toolbar, keeping settings and the simple-UI plugin in sync.
 *
 * @param commandLine - Whether the command line is visible.
 * @param toolbar - Whether the toolbar is visible (and expanded when shown).
 */
function applyChromeVisibility(commandLine: boolean, toolbar: boolean): void {
  const settings = AcApSettingManager.instance
  settings.isShowCommandLine = commandLine
  settings.isShowToolbar = toolbar

  const ui = getSimpleUiPlugin()
  ui?.setToolbarVisible(toolbar)
  if (toolbar) {
    ui?.setToolbarCollapsed(false)
  }
}

export function parseOpenMode(raw: string | null | undefined): AcEdOpenMode {
  const value = (raw ?? 'review').trim().toLowerCase()
  if (value === 'write' || value === 'edit') return AcEdOpenMode.Write
  if (value === 'read' || value === 'readonly' || value === 'read-only') {
    return AcEdOpenMode.Read
  }
  return AcEdOpenMode.Review
}

/** Frame the drawing after open: extents (zoom to fit) or saved (file VPORT). */
export function parseOpenViewMode(raw: string | null | undefined): AcApOpenViewMode {
  const value = (raw ?? 'extents').trim().toLowerCase()
  if (
    value === 'saved' ||
    value === 'default' ||
    value === 'vport' ||
    value === 'viewport'
  ) {
    return AcApOpenViewMode.Saved
  }
  return AcApOpenViewMode.Extents
}

export function parseViewerLocale(raw: string | null | undefined): AcApLocale {
  const value = (raw ?? 'en').trim().toLowerCase()
  if (value === 'zh' || value.startsWith('zh-')) return 'zh'
  if (value === 'tr' || value.startsWith('tr-')) return 'tr'
  if (value === 'cs' || value.startsWith('cs-')) return 'cs'
  return 'en'
}

export function parseTheme(raw: string | null | undefined): AcEdUiTheme {
  const value = (raw ?? 'dark').trim().toLowerCase()
  return value === 'light' ? 'light' : 'dark'
}

export function parseBoolParam(raw: string | null | undefined, fallback = false): boolean {
  if (raw == null || raw === '') return fallback
  const value = raw.trim().toLowerCase()
  return value === '1' || value === 'true' || value === 'yes' || value === 'on'
}

export async function ensureViewer(
  host: HTMLElement,
  container: HTMLElement,
  options: EnsureViewerOptions = {},
): Promise<boolean> {
  if (initialized) {
    const theme = options.theme ?? 'dark'
    acedApplyUiTheme(theme, host)
    if (options.lang) AcApI18n.setCurrentLocale(options.lang)
    if (options.toolbar != null || options.commandLine != null) {
      applyChromeVisibility(options.commandLine ?? false, options.toolbar ?? false)
    }
    return true
  }

  try {
    const theme = options.theme ?? 'dark'
    const commandLine = options.commandLine ?? false
    const toolbar = options.toolbar ?? false

    acedApplyUiTheme(theme, host)
    if (options.lang) AcApI18n.setCurrentLocale(options.lang)

    AcApSettingManager.instance.isShowCommandLine = commandLine
    AcApSettingManager.instance.isShowToolbar = toolbar

    AcApDocManager.createInstance({
      container,
      busyIndicatorHost: host,
      autoResize: true,
      baseUrl: 'https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/',
      // DWG/DXF parse + MTEXT render all run on the main thread (no workers).
      checkWorkersOnInit: false,
      useMainThreadDraw: true,
    })

    // Override LibreDWG with the private RealDWG-Web converter (main thread).
    registerPrivateDwgConverter()

    await registerPlugins(host)
    applyChromeVisibility(commandLine, toolbar)
    initialized = true
    return true
  } catch (error) {
    console.error('Failed to initialize CAD viewer:', error)
    return false
  }
}

/**
 * Read a local file into an `ArrayBuffer`.
 *
 * @param file - File chosen by the user.
 * @returns File bytes.
 */
function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * Merge caller options onto the default open-document settings.
 *
 * @param options - Per-open overrides.
 * @param fallbackMode - Mode used when `options.mode` is omitted.
 * @returns Options passed to `openDocument`.
 */
function openOptions(options: OpenDrawingOptions, fallbackMode: AcEdOpenMode): AcApOpenDatabaseOptions {
  return {
    ...DEFAULT_OPEN,
    mode: options.mode ?? fallbackMode,
    openViewMode: options.openViewMode,
  }
}

/** Whether a file name looks like a DWG or DXF drawing. */
export function isCadFileName(name: string): boolean {
  const lower = name.trim().toLowerCase()
  return lower.endsWith('.dwg') || lower.endsWith('.dxf')
}

/**
 * Whether a remote URL (and optional file-name hint) refers to a DWG/DXF file.
 *
 * Checks the URL pathname, hash, nested `filename`/`name` query params, and
 * an explicit hint so hosts like Google Drive media URLs can still open.
 */
export function isCadDrawingRef(url: string, fileNameHint?: string): boolean {
  if (fileNameHint && isCadFileName(fileNameHint)) return true
  try {
    const parsed = new URL(url)
    if (isCadFileName(parsed.pathname)) return true
    const hashName = decodeURIComponent(parsed.hash.replace(/^#/, ''))
    if (hashName && isCadFileName(hashName)) return true
    const nested = parsed.searchParams.get('filename') ?? parsed.searchParams.get('name')
    if (nested && isCadFileName(nested)) return true
  } catch {
    return false
  }
  return false
}

/**
 * Derive a drawing file name from a remote URL.
 *
 * @param url - Absolute drawing URL.
 * @returns Best-effort `.dwg`/`.dxf` name, or `drawing.dwg`.
 */
function fileNameFromUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const nested = parsed.searchParams.get('filename') ?? parsed.searchParams.get('name')
    if (nested && isCadFileName(nested)) return nested
    const hashName = decodeURIComponent(parsed.hash.replace(/^#/, ''))
    if (hashName && isCadFileName(hashName)) return hashName
    const base = parsed.pathname.split('/').filter(Boolean).pop()
    if (base) return decodeURIComponent(base)
  } catch {
    /* ignore */
  }
  return 'drawing.dwg'
}

export async function openLocalDrawing(
  file: File,
  options: OpenDrawingOptions = {},
): Promise<boolean> {
  const docManager = AcApDocManager.instance
  const fileContent = await readFile(file)
  return docManager.openDocument(file.name, fileContent, openOptions(options, AcEdOpenMode.Write))
}

export async function openDrawingFromUrl(
  url: string,
  options: OpenDrawingOptions = {},
  fileName?: string,
): Promise<boolean> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch drawing (${response.status})`)
  }
  const fileContent = await response.arrayBuffer()
  const name = fileName && isCadFileName(fileName) ? fileName : fileNameFromUrl(url)
  return AcApDocManager.instance.openDocument(
    name,
    fileContent,
    openOptions(options, AcEdOpenMode.Review),
  )
}

/**
 * Open a drawing already fetched by the host page (for example Google Drive).
 *
 * @param fileName - Original file name; must end with `.dwg` or `.dxf`.
 * @param fileContent - Drawing bytes.
 * @param options - Open-document options.
 * @returns Whether `openDocument` succeeded.
 */
export async function openDrawingFromBuffer(
  fileName: string,
  fileContent: ArrayBuffer,
  options: OpenDrawingOptions = {},
): Promise<boolean> {
  return AcApDocManager.instance.openDocument(
    fileName,
    fileContent,
    openOptions(options, AcEdOpenMode.Review),
  )
}

/** Show or hide command line + toolbar (used when entering/leaving fullscreen). */
export function setViewerChromeVisible(visible: boolean): void {
  if (!initialized) return
  applyChromeVisibility(visible, visible)
}

export function isViewerInitialized(): boolean {
  return initialized
}
