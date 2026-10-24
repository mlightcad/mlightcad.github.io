/**
 * Full `@mlightcad/cad-viewer` (Vue + ribbon) mount for the CAD Editor demo.
 * Loaded only via dynamic import — keep out of the marketing homepage / Viewer path.
 * CSS is pulled in by `@mlightcad/cad-viewer` itself (`element-plus` + `cad-viewer.css`).
 *
 * Heavy DWG converter stays behind a nested dynamic import so idle prefetch of this
 * module can warm the UI stack without immediately fetching RealDWG (~2MB).
 */
import { AcApSettingManager, AcEdOpenMode } from '@mlightcad/cad-simple-viewer'
import { i18n, MlCadViewer } from '@mlightcad/cad-viewer'
import ElementPlus from 'element-plus'
import { createApp, h, ref, type App, type Ref } from 'vue'

/** Open mode accepted by the Editor try-drawing widget. */
export type CadViewerAppOpenMode = 'read' | 'review' | 'write'

/** Options when mounting the full CAD Viewer app. */
export interface MountCadViewerAppOptions {
  /** Local DWG/DXF to open immediately. */
  localFile: File
  /** Access mode (Editor uses write). */
  mode?: CadViewerAppOpenMode
  /** UI locale for the ribbon / dialogs. */
  locale?: 'en' | 'zh' | 'default'
  /** Initial theme. */
  theme?: 'light' | 'dark'
}

/** Handle returned by {@link mountCadViewerApp}. */
export interface CadViewerAppHandle {
  /** Replace the open drawing with another local file. */
  openLocalFile(file: File): void
  /** Show or hide the command ribbon (session-only). */
  setRibbonVisible(visible: boolean): void
  /** Tear down the Vue app and clear the host. */
  destroy(): void
}

let settingsConfigured = false

/**
 * Map try-drawing mode strings onto `AcEdOpenMode`.
 *
 * @param mode - Widget open-mode string.
 * @returns Viewer open mode enum.
 */
function toOpenMode(mode: CadViewerAppOpenMode | undefined): AcEdOpenMode {
  if (mode === 'read') return AcEdOpenMode.Read
  if (mode === 'review') return AcEdOpenMode.Review
  return AcEdOpenMode.Write
}

/**
 * Ensure Editor prefs use a dedicated storage key and show the ribbon.
 */
function configureEditorSettings(): void {
  if (!settingsConfigured) {
    AcApSettingManager.configure({
      storageKey: 'mlightcad.settings.cad-editor',
    })
    settingsConfigured = true
  }

  // Host layout for the marketing embed — do not persist into other products.
  AcApSettingManager.instance.apply(
    {
      isShowRibbon: true,
      isShowToolbar: true,
      isShowCommandLine: true,
      isShowCoordinate: true,
    },
    { persist: false },
  )
}

/**
 * Load and register the private RealDWG converter (separate chunk from the UI stack).
 */
async function ensurePrivateDwgConverter(): Promise<void> {
  const { registerPrivateDwgConverter } = await import('./dwgConverter')
  registerPrivateDwgConverter()
}

/**
 * Mount `MlCadViewer` (with ribbon) into `host` and open `localFile` in write mode.
 *
 * @param host - DOM node that becomes the Vue mount root.
 * @param options - File, mode, and chrome options.
 * @returns Handle to open another file or destroy the app.
 */
export async function mountCadViewerApp(
  host: HTMLElement,
  options: MountCadViewerAppOptions,
): Promise<CadViewerAppHandle> {
  configureEditorSettings()
  // Register DWG before the viewer mounts (same order as the official example).
  await ensurePrivateDwgConverter()

  host.replaceChildren()
  host.style.width = '100%'
  host.style.height = '100%'
  host.style.minHeight = '0'
  host.style.position = 'relative'

  const localFile: Ref<File | undefined> = ref(options.localFile)
  const mode = toOpenMode(options.mode)
  const locale = options.locale ?? 'en'
  const theme = options.theme ?? 'dark'

  const app: App = createApp({
    setup() {
      return () =>
        h(MlCadViewer, {
          localFile: localFile.value,
          mode,
          locale,
          theme,
          useMainThreadDraw: true,
          baseUrl: 'https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/',
          onCreate: () => {
            // DocManager exists; keep the private converter as the DWG path.
            void ensurePrivateDwgConverter()
            configureEditorSettings()
          },
        })
    },
  })

  app.use(ElementPlus)
  app.use(i18n)
  app.mount(host)

  return {
    openLocalFile(file: File) {
      localFile.value = file
    },
    setRibbonVisible(visible: boolean) {
      AcApSettingManager.instance.apply({ isShowRibbon: visible }, { persist: false })
    },
    destroy() {
      app.unmount()
      host.replaceChildren()
    },
  }
}
