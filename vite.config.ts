import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

/** Serve unhashed /site-chrome.js in `vite dev` for satellite apps. */
function siteChromeDevAlias(): Plugin {
  return {
    name: 'site-chrome-dev-alias',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? ''
        const queryAt = raw.indexOf('?')
        const path = queryAt === -1 ? raw : raw.slice(0, queryAt)
        if (path === '/site-chrome.js') {
          const search = queryAt === -1 ? '' : raw.slice(queryAt)
          req.url = `/src/site-chrome.ts${search}`
        }
        next()
      })
    },
  }
}

/**
 * Vite extracts CSS from the JS entry and does not load it unless an HTML
 * page links the file. Inline that CSS so satellite pages get styles from
 * the single `/site-chrome.js` module.
 */
function siteChromeCssInject(): Plugin {
  return {
    name: 'site-chrome-css-inject',
    apply: 'build',
    generateBundle(_options, bundle) {
      const jsName = 'site-chrome.js'
      const js = bundle[jsName]
      if (!js || js.type !== 'chunk') {
        this.error('site-chrome.js was not emitted')
      }

      const cssNames = [...(js.viteMetadata?.importedCss ?? [])].filter((name) => name.includes('site-chrome'))
      const names = cssNames.length > 0 ? cssNames : Object.keys(bundle).filter((name) => name.endsWith('site-chrome.css'))
      if (names.length === 0) {
        this.error('site-chrome CSS was not emitted')
      }

      const cssText = names
        .map((name) => {
          const asset = bundle[name]
          if (!asset || asset.type !== 'asset') {
            this.error(`Missing CSS asset ${name}`)
          }
          return typeof asset.source === 'string' ? asset.source : new TextDecoder().decode(asset.source)
        })
        .join('\n')

      const snippet =
        '(()=>{if(document.querySelector("style[data-site-chrome]"))return;' +
        'const s=document.createElement("style");s.dataset.siteChrome="";' +
        `s.textContent=${JSON.stringify(cssText)};document.head.appendChild(s)})();`
      js.code = insertAfterModuleImports(js.code, snippet)

      for (const name of names) {
        if (!isReferencedElsewhere(bundle, name, jsName)) delete bundle[name]
      }
    },
  }
}

/** True when another output file still points at this CSS asset. */
function isReferencedElsewhere(
  bundle: Record<string, { type: string; code?: string; source?: string | Uint8Array; viteMetadata?: { importedCss?: Set<string> } }>,
  cssName: string,
  jsName: string,
): boolean {
  for (const [fileName, item] of Object.entries(bundle)) {
    if (fileName === jsName || fileName === cssName) continue
    if (item.type === 'chunk' && item.viteMetadata?.importedCss?.has(cssName)) return true
    const text = item.type === 'chunk' ? item.code ?? '' : typeof item.source === 'string' ? item.source : ''
    if (text.includes(cssName)) return true
  }
  return false
}

/** Insert `snippet` after the leading import declarations of a built module. */
function insertAfterModuleImports(code: string, snippet: string): string {
  const importRe = /import[\s\S]*?from\s*["'][^"']+["']\s*;|import\s*["'][^"']+["']\s*;/g
  let cursor = 0
  let match: RegExpExecArray | null
  while ((match = importRe.exec(code))) {
    if (match.index !== cursor && !/^\s*$/.test(code.slice(cursor, match.index))) break
    cursor = match.index + match[0].length
  }
  return code.slice(0, cursor) + snippet + code.slice(cursor)
}

/**
 * Homepage entry must never eagerly load the CAD stack.
 * Lazy boundary: `import('./try-drawing/viewer')` in `src/try-drawing.ts`.
 * Do not use manualChunks for the viewer — it can pull the Vite preload
 * helper into the large chunk and make `main` statically import it.
 */
export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    // Do not inject modulepreload for lazy viewer / plugin chunks.
    modulePreload: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        parser: resolve(__dirname, 'dwg-parser.html'),
        embed: resolve(__dirname, 'embed.html'),
        iframePlugin: resolve(__dirname, 'iframe-plugin.html'),
        cadDiffViewer: resolve(__dirname, 'cad-diff-viewer.html'),
        tutorial: resolve(__dirname, 'tutorial.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        refunds: resolve(__dirname, 'refunds.html'),
        licensePortal: resolve(__dirname, 'license-portal.html'),
        dwgEngine: resolve(__dirname, 'dwg-engine.html'),
        commercial: resolve(__dirname, 'commercial.html'),
        cadSdk: resolve(__dirname, 'cad-sdk.html'),
        useCases: resolve(__dirname, 'use-cases.html'),
        benchmarks: resolve(__dirname, 'benchmarks.html'),
        siteChrome: resolve(__dirname, 'src/site-chrome.ts'),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'siteChrome' ? 'site-chrome.js' : 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (asset) => {
          const names = 'names' in asset && Array.isArray(asset.names) ? asset.names : []
          const fileName = names[0] ?? asset.name ?? ''
          if (fileName.includes('siteChrome') || fileName.includes('site-chrome')) {
            return 'site-chrome[extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  optimizeDeps: {
    // Prebundling rewrites import.meta.url into .vite/deps, so the companion
    // `import(new URL('./dwg-parser-main.js', import.meta.url))` resolves to a
    // missing file. Serve the package from node_modules instead (prod build OK).
    exclude: ['@mlightcad/dwg-converter'],
  },
  server: {
    cors: true,
  },
  preview: {
    cors: true,
  },
  plugins: [
    siteChromeDevAlias(),
    siteChromeCssInject(),
    viteStaticCopy({
      targets: [
        {
          // CJK codepage tables for main-thread DWG parsing.
          src: './node_modules/@mlightcad/dwg-converter/dist/dwg-codepage-*.bin',
          dest: 'assets',
        },
      ],
    }),
  ],
})
