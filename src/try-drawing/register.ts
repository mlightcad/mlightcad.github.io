import { registerSimpleUiPlugin } from '@mlightcad/cad-simple-ui-plugin/register'
import { AcApDocManager } from '@mlightcad/cad-simple-viewer'

const SIMPLE_UI_PLUGIN_NAME = 'SimpleUiPlugin'

/** Toolbar controls exposed by the simple-UI plugin. */
interface SimpleUiChrome {
  /**
   * Show or hide the toolbar.
   *
   * @param visible - Whether the toolbar should be shown.
   * @returns Whether the plugin applied the change.
   */
  setToolbarVisible(visible: boolean): boolean
  /**
   * Collapse or expand the toolbar.
   *
   * @param collapsed - Whether the toolbar should be collapsed.
   * @returns Whether the plugin applied the change.
   */
  setToolbarCollapsed(collapsed: boolean): boolean
}

let simpleUiRegistered = false

export async function registerSimpleUi(host: HTMLElement): Promise<void> {
  if (simpleUiRegistered) return

  await registerSimpleUiPlugin(AcApDocManager.instance.pluginManager, {
    host,
    dockPanel: {
      defaultOpen: false,
      defaultSide: 'left',
      defaultHeight: 240,
      defaultWidth: 280,
    },
    toolbar: {
      placement: 'right',
      items: 'default',
      collapsible: true,
      // Embedded preview starts chrome-free; fullscreen reveals tools.
      defaultCollapsed: true,
    },
  })
  simpleUiRegistered = true
}

export function getSimpleUiPlugin(): SimpleUiChrome | undefined {
  return AcApDocManager.instance.pluginManager.getPlugin(
    SIMPLE_UI_PLUGIN_NAME,
  ) as SimpleUiChrome | undefined
}

export async function registerPlugins(host: HTMLElement): Promise<void> {
  await registerSimpleUi(host)
}
