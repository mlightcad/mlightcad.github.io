import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
      },
    },
  },
  optimizeDeps: {
    // Prebundling rewrites import.meta.url into .vite/deps, so the companion
    // `import(new URL('./dwg-parser-main.js', import.meta.url))` resolves to a
    // missing file. Serve the package from node_modules instead (prod build OK).
    exclude: ['@mlight-cad/dwg-converter'],
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          // CJK codepage tables for main-thread DWG parsing.
          src: './node_modules/@mlight-cad/dwg-converter/dist/dwg-codepage-*.bin',
          dest: 'assets',
        },
      ],
    }),
  ],
})
