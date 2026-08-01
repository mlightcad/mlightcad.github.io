import { AcDbDwgConverter } from '@mlight-cad/dwg-converter'
import { AcDbDatabaseConverterManager, AcDbFileType } from '@mlightcad/data-model'

let registered = false

/**
 * Replace the default LibreDWG converter (registered by cad-simple-viewer)
 * with the private RealDWG-Web converter on the main thread.
 * DXF already uses the built-in main-thread converter in `@mlightcad/data-model`.
 */
export function registerPrivateDwgConverter(): void {
  if (registered) return

  const licenseKey = import.meta.env.VITE_DWG_LICENSE_KEY as string | undefined
  const dwgConverter = new AcDbDwgConverter({
    convertByEntityType: false,
    useWorker: false,
    ...(licenseKey ? { licenseKey } : {}),
  })

  AcDbDatabaseConverterManager.instance.register(AcDbFileType.DWG, dwgConverter)
  registered = true
}
