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
  applyUiTheme,
  type AcApLocale,
  type AcApOpenDatabaseOptions,
  type AcEdUiTheme,
} from '@mlightcad/cad-simple-viewer'
import { registerPrivateDwgConverter } from './dwgConverter'
import { getSimpleUiPlugin, registerPlugins } from './register'

let initialized = false

export type ViewerOpenMode = 'read' | 'review' | 'write'

export interface EnsureViewerOptions {
  theme?: AcEdUiTheme
  lang?: AcApLocale
  toolbar?: boolean
  commandLine?: boolean
}

export interface OpenDrawingOptions {
  mode?: AcEdOpenMode
  openViewMode?: AcApOpenViewMode
}

const DEFAULT_OPEN: AcApOpenDatabaseOptions = {
  minimumChunkSize: 1000,
  mode: AcEdOpenMode.Write,
  drawNoPlotLayers: false,
  progressiveRendering: false,
}

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
    applyUiTheme(theme, host)
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

    applyUiTheme(theme, host)
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

function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = () => reject(reader.error)
    reader.readAsArrayBuffer(file)
  })
}

function openOptions(options: OpenDrawingOptions, fallbackMode: AcEdOpenMode): AcApOpenDatabaseOptions {
  return {
    ...DEFAULT_OPEN,
    mode: options.mode ?? fallbackMode,
    openViewMode: options.openViewMode,
  }
}

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname
    const base = path.split('/').filter(Boolean).pop()
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
): Promise<boolean> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch drawing (${response.status})`)
  }
  const fileContent = await response.arrayBuffer()
  const name = fileNameFromUrl(url)
  return AcApDocManager.instance.openDocument(
    name,
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
