/**
 * Heavy CAD stack — loaded only via dynamic import from `try-drawing.ts`.
 * Do not statically import this module from the homepage entry.
 */
import {
  AcApDocManager,
  AcApSettingManager,
  AcEdOpenMode,
  applyUiTheme,
  type AcApOpenDatabaseOptions,
} from '@mlightcad/cad-simple-viewer'
import { registerPrivateDwgConverter } from './dwgConverter'
import { getSimpleUiPlugin, registerPlugins } from './register'

let initialized = false

function applyChromeVisibility(visible: boolean): void {
  const settings = AcApSettingManager.instance
  settings.isShowCommandLine = visible
  settings.isShowToolbar = visible

  const ui = getSimpleUiPlugin()
  ui?.setToolbarVisible(visible)
  if (visible) {
    ui?.setToolbarCollapsed(false)
  }
}

export async function ensureViewer(host: HTMLElement, container: HTMLElement): Promise<boolean> {
  if (initialized) return true

  try {
    applyUiTheme('dark', host)

    // Embedded mode: hide CLI / toolbar until the user goes fullscreen.
    AcApSettingManager.instance.isShowCommandLine = false
    AcApSettingManager.instance.isShowToolbar = false

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
    applyChromeVisibility(false)
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

export async function openLocalDrawing(file: File): Promise<boolean> {
  const docManager = AcApDocManager.instance
  const fileContent = await readFile(file)
  const options: AcApOpenDatabaseOptions = {
    minimumChunkSize: 1000,
    mode: AcEdOpenMode.Write,
    drawNoPlotLayers: false,
    progressiveRendering: false,
  }

  return docManager.openDocument(file.name, fileContent, options)
}

/** Show or hide command line + toolbar (used when entering/leaving fullscreen). */
export function setViewerChromeVisible(visible: boolean): void {
  if (!initialized) return
  applyChromeVisibility(visible)
}

export function isViewerInitialized(): boolean {
  return initialized
}
