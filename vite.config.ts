import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        parser: resolve(__dirname, 'dwg-parser.html'),
      },
    },
  },
})
