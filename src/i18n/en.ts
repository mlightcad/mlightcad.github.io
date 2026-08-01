import { parserEn } from './parser'
import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: 'MLightCAD — The first open-source browser CAD editor',
    description:
      'cad-viewer: the first fully backend-free DWG/DXF viewer and editor that runs entirely in the browser — and the first open-source DXF/DWG web editing toolkit.',
  },
  nav: {
    product: 'Product',
    cadViewer: 'cad-viewer',
    dwgParser: 'DWG Parser',
    features: 'Features',
    plugins: 'Plugins',
    docs: 'Docs',
    github: 'GitHub',
    demo: 'Live Demo',
    langEn: 'EN',
    langZh: '中文',
  },
  hero: {
    brand: 'MLightCAD',
    meta: 'OPEN SOURCE · WEBGL · ZERO BACKEND',
    headline: 'The first open CAD stack that never leaves the browser.',
    subline:
      'Parse, render, and edit DXF/DWG entirely on-device — no backend, no upload pipeline, no compromise on privacy.',
    ctaDemo: 'Try Live Demo',
    ctaGithub: 'View on GitHub',
    firsts: [
      'First fully backend-free DWG/DXF viewer & editor in the browser',
      'First open-source DXF/DWG web editing toolkit',
    ],
  },
  flagship: {
    eyebrow: 'Flagship',
    title: 'cad-viewer',
    lead: 'A production-grade WebGL CAD runtime: DWG/DXF parsing, geometry, viewing, and editing — all inside a modern browser tab.',
    firstsLabel: 'Industry firsts',
    firsts: [
      'The first DWG/DXF viewer and editor that runs completely in the browser with zero backend services.',
      'The first open-source toolkit for real DXF/DWG editing on the web — not a read-only preview.',
    ],
    ctaDemo: 'Open Demo',
    ctaDocs: 'API Docs',
  },
  features: {
    eyebrow: 'Features',
    title: 'Built for privacy, portability, and product teams.',
    lead: 'Every capability is designed around a single principle: serious CAD work should be possible without standing up a CAD server.',
    items: [
      {
        id: 'privacy',
        title: 'Privacy by architecture',
        body: 'Drawings are parsed and rendered entirely on the client. Nothing is uploaded, staged, or mirrored on a remote host — confidentiality is a structural guarantee, not a policy checkbox.',
        image: '/assets/features/privacy.svg',
        imageAlt: 'Conceptual lock: drawings stay on the local device',
      },
      {
        id: 'integration',
        title: 'Zero infrastructure, deep integration',
        body: 'Ship CAD inside your product without provisioning backends or conversion farms. A modular plugin architecture lets you compose UI, export, and AI agents as first-class extensions.',
        image: '/assets/features/integration.svg',
        imageAlt: 'Host app connecting to CAD core and plugins',
      },
      {
        id: 'html-export',
        title: 'One-file offline HTML export',
        body: 'Turn a live drawing into a self-contained .html artifact with an embedded viewer — pan, zoom, extents, layers, distance measure, and EN/ZH UI. Recipients open it in any modern browser: no install, no cad-viewer instance, no server. In view mode the offline HTML uses about 83% less memory than AutoCAD 2020 on the same sample drawing, while still supporting pan, zoom, layers, and measure.',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG transforming into a portable HTML file',
        actions: [
          {
            label: 'Open demo HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            variant: 'primary',
          },
          {
            label: 'Down demo HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            download: 'canteen.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'workflows',
        title: 'Offline and online, same engine',
        body: 'Support air-gapped review and connected product workflows with one runtime. Edit locally when the network is gone; sync into your platform when it returns — without rewriting the CAD core.',
        image: '/assets/features/workflows.svg',
        imageAlt: 'Offline and online workflow loop',
      },
      {
        id: 'edit',
        title: 'A true editor — not a passive viewer',
        body: 'Go beyond pan-and-zoom. Select, modify, and author geometry with an AutoCAD-inspired command surface — so web products can deliver real drawing work, not just read-only previews.',
        image: '/assets/features/edit.svg',
        imageAlt: 'Grip points and edit operations on a drawing',
      },
    ],
  },
  plugins: {
    eyebrow: 'Ecosystem',
    title: 'Official plugins',
    lead: 'Compose UI, export, and AI around a shared plugin bus — load only what each product needs.',
    imageAlt: 'CAD core with pluggable UI, agent, HTML, PDF, and SVG modules',
    items: [
      { name: 'cad-simple-ui-plugin', role: 'Toolbar & layer manager (framework-agnostic DOM)' },
      { name: 'cad-agent-plugin', role: 'Natural-language CAD agent with drawing tools' },
      { name: 'cad-html-plugin', role: 'Export self-contained offline HTML' },
      { name: 'cad-pdf-plugin', role: 'Vector PDF export and PDF-to-CAD import' },
      { name: 'cad-svg-plugin', role: 'Vector SVG export' },
    ],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Docs, demo, and community',
    lead: 'Start from the live viewer, then dig into API reference and the project wiki.',
    links: [
      {
        name: 'Live Demo',
        desc: 'Full-featured viewer in the browser',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'API Docs',
        desc: 'Versioned docs on Read the Docs',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: 'Latest Docs',
        desc: 'GitHub Pages (dev / latest)',
        href: 'https://mlightcad.github.io/cad-viewer/docs/',
      },
      {
        name: 'Wiki',
        desc: 'Guides and architecture notes',
        href: 'https://github.com/mlightcad/cad-viewer/wiki',
      },
      {
        name: 'GitHub',
        desc: 'mlightcad/cad-viewer',
        href: 'https://github.com/mlightcad/cad-viewer',
      },
      {
        name: 'X',
        desc: '@mlightcad',
        href: 'https://x.com/mlightcad',
      },
      {
        name: 'YouTube',
        desc: '@mlightcad',
        href: 'https://www.youtube.com/@mlightcad',
      },
      {
        name: 'Medium',
        desc: '@mlightcad',
        href: 'https://medium.com/@mlightcad',
      },
    ],
  },
  footer: {
    tagline: 'Open-source CAD infrastructure for the web.',
    rights: '© 2026 MLightCAD',
  },
  parser: parserEn,
}
