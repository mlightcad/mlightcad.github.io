import { benchmarksEn } from './benchmarks'
import { cadDiffViewerEn } from './cadDiffViewer'
import { cadSdkEn } from './cadSdk'
import { commercialEn } from './commercial'
import { iframePluginEn } from './iframePlugin'
import { parserEn } from './parser'
import { tutorialEn } from './tutorial'
import type { Dictionary } from './types'
import { useCasesEn } from './useCases'

export const en: Dictionary = {
  meta: {
    title: 'MLightCAD — Web CAD SDK for DWG & DXF',
    description:
      'Open, view and edit DWG/DXF drawings directly in the browser. Open-source Web CAD SDK with browser-native DWG parsing, rendering, measurement and editing.',
    keywords:
      'MLightCAD, Web CAD SDK, DWG viewer, DXF viewer, browser CAD, DWG Engine, cad-viewer, open source CAD, zero backend',
  },
  nav: {
    product: 'Products',
    cadViewer: 'CAD Viewer',
    cadSdk: 'CAD SDK',
    dwgEngine: 'DWG Engine',
    cadDiffViewer: 'CAD Diff Viewer',
    dwgToHtml: 'DWG to HTML',
    developers: 'Developers',
    iframePlugin: 'iframe Plugin',
    googleDrive: 'Google Drive Integration',
    solutions: 'Solutions',
    pricing: 'Pricing',
    resourcesNav: 'Resources',
    benchmarks: 'Benchmarks',
    commercial: 'Open Source & Commercial',
    tutorials: 'Tutorials',
    docs: 'Docs',
    userGuide: 'User Guide',
    wiki: 'Wiki',
    apiReference: 'API Reference',
    installationUsage: 'Installation & Usage',
    github: 'GitHub',
    language: 'Language',
  },
  hero: {
    brand: 'MLightCAD',
    meta: 'OPEN SOURCE · BROWSER-NATIVE · DATA SAFE',
    headline: 'Web CAD Infrastructure for DWG & DXF',
    subline: 'Build CAD products directly in the browser.',
    ctaDemo: 'Try CAD Viewer',
    ctaBuild: 'Try Live Demo',
    guarantees: ['No CAD server.', 'No file upload.', 'No installation.'],
  },
  platform: {
    eyebrow: 'Platform',
    title: 'Browser-native CAD, built to embed',
    lead: 'Use the complete Viewer, or build your own CAD experience with the SDK — on the same browser-native engine.',
    closing: 'Build on the same CAD engine used by MLightCAD Viewer.',
    layers: [
      {
        name: 'No CAD server',
        desc: 'DWG/DXF parse and render entirely in the browser tab — nothing to host or scale.',
      },
      {
        name: 'Drawings stay on-device',
        desc: 'No upload farm: confidential files never leave the user’s machine.',
      },
      {
        name: 'One shared CAD model',
        desc: 'Viewer, editor, plugins, and agents read and write the same entities.',
      },
      {
        name: 'More than a preview',
        desc: 'Measure, review markup, and edit geometry — not a read-only screenshot.',
      },
      {
        name: 'Ship inside your product',
        desc: 'Embed with iframe or npm, or license the commercial DWG Engine for SaaS and OEM.',
      },
    ],
    paths: [
      {
        label: 'Open Source',
        title: 'CAD Viewer',
        body: 'Free browser CAD for viewing, review, and editing — the flagship entry to the stack.',
        href: '/#product',
        cta: 'Explore Viewer',
      },
      {
        label: 'Commercial',
        title: 'DWG Engine',
        body: 'Production DWG for closed-source products, SaaS, and OEM — with clear redistribution rights.',
        href: '/dwg-engine.html',
        cta: 'View Engine',
      },
    ],
  },
  flagship: {
    eyebrow: 'Flagship',
    title: 'CAD Viewer',
    lead: 'A production-grade WebGL CAD runtime: DWG/DXF parsing, geometry, viewing, and editing — all inside a modern browser tab.',
    highlightsLabel: 'What it ships',
    highlights: [
      'View, review markup, and edit DWG/DXF entirely in the browser — no CAD server.',
      'Open-source toolkit for real web editing workflows — not a read-only preview.',
    ],
  },
  tryDrawing: {
    barIdle: 'try your drawing',
    barLoading: 'opening…',
    title: 'Open a drawing',
    body: 'Drop a DWG or DXF here. Parsed and rendered in this tab, never uploaded.',
    open: 'Open file',
    trust: 'Never uploaded · no server',
    privacyTitle: 'Your drawing never leaves this browser',
    privacyBody: 'Nothing is uploaded or stored on our servers. Parsing and rendering happen in this tab.',
    verifySummary: 'How to verify with DevTools that the file is not uploaded',
    verifyBody:
      'Open Developer Tools → Network while using this demo. The DWG file itself is not transmitted to an external server for processing.',
    dragHint: 'Release to open',
    caption: '.dwg · .dxf · parsed in-browser · no upload',
    captionOpen: 'local · {name} · {size}',
    statusLoading: 'Reading drawing…',
    statusLoadingViewer: 'Loading viewer…',
    statusInit: 'Starting viewer…',
    errorType: 'Please choose a DWG or DXF file.',
    errorInit: 'Could not start the viewer. Try again after a refresh.',
    errorOpen: 'Could not open {name}.',
    errorLicenseExpired:
      'Could not open {name}. The DWG converter evaluation period has expired.',
    errorLicenseInvalid:
      'Could not open {name}. The DWG converter license is missing or invalid.',
    retry: 'Try another file',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    close: 'Close drawing',
  },
  features: {
    eyebrow: 'Features',
    title: 'Built for privacy, portability, and product teams.',
    lead: 'Every capability is designed around a single principle: serious CAD work should be possible without standing up a CAD server.',
    items: [
      {
        id: 'privacy',
        title: 'Browser-native CAD',
        body: 'Your drawing stays on your device. No upload, no CAD server, no cloud conversion, no installation — verify it yourself with DevTools on the demo above.',
        image: '/assets/features/privacy.svg',
        imageAlt: 'Conceptual lock: drawings stay on the local device',
        actions: [
          {
            label: 'Architecture overview',
            href: 'https://github.com/mlightcad/cad-viewer/wiki/architecture-overview',
            variant: 'primary',
          },
        ],
      },
      {
        id: 'integration',
        title: 'Zero infrastructure, deep integration',
        body: 'Ship CAD inside your product without provisioning backends or conversion farms. A modular plugin architecture lets you compose UI, export, and AI agents as first-class extensions.',
        image: '/assets/features/integration.svg',
        imageAlt: 'Host app connecting to CAD core and plugins',
        actions: [
          {
            label: 'iframe Plugin guide',
            href: '/iframe-plugin.html',
            variant: 'primary',
          },
          {
            label: 'CAD SDK',
            href: '/cad-sdk.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'html-export',
        title: 'One-file offline HTML export',
        body: 'Turn a live drawing into a self-contained .html artifact with an embedded viewer — pan, zoom, extents, layers, distance measure, and UI in English, Chinese, Turkish, and Czech. Recipients open it in any modern browser: no install, no cad-viewer instance, no server. In view mode the offline HTML uses about 83% less memory than AutoCAD 2020 on the same sample drawing, while still supporting pan, zoom, layers, and measure.',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG transforming into a portable HTML file',
        actions: [
          {
            label: 'Convert to HTML',
            href: '/cad-viewer/cad-simple-viewer/html-converter.html',
            variant: 'primary',
          },
          {
            label: 'Open demo HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
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
  gallery: {
    eyebrow: 'Demo Drawings',
    title: 'Drawing Gallery',
    leadHtml:
      'Pre-rendered CAD drawings exported with <a href="https://github.com/mlightcad/cad-viewer" target="_blank" rel="noopener noreferrer">cad-viewer</a> / <a href="https://github.com/mlightcad/cad-viewer/tree/main/packages/cad-html-plugin" target="_blank" rel="noopener noreferrer">cad-html-plugin</a> — open a preview in the viewer, or download the original DWG. Source drawings from <a href="https://dwgmodels.com/" target="_blank" rel="noopener noreferrer">dwgmodels.com</a>.',
    download: 'Download',
    loading: 'Loading drawings…',
    empty: 'No drawings found.',
    error: 'Could not load drawings. Please try again later.',
    openAria: 'Open drawing: {title}',
    downloadAria: 'Download {file}',
  },
  plugins: {
    eyebrow: 'Platform modules',
    title: 'Compose on the same engine',
    lead: 'UI, export, and AI modules load only what each product needs — built on the CAD engine that powers MLightCAD Viewer.',
    imageAlt: 'CAD core with pluggable UI, agent, HTML, PDF, and SVG modules',
    items: [
      { name: 'cad-simple-ui-plugin', role: 'Toolbar & layer manager (framework-agnostic DOM)' },
      { name: 'cad-agent-plugin', role: 'Natural-language CAD agent with drawing tools' },
      { name: 'cad-html-plugin', role: 'Export self-contained offline HTML' },
      { name: 'cad-pdf-plugin', role: 'Vector PDF export and PDF-to-CAD import' },
      { name: 'cad-svg-plugin', role: 'Vector SVG export' },
    ],
  },
  showcase: {
    eyebrow: 'Built with MLightCAD',
    title: 'Projects on the stack',
    lead: 'Open demos and integrations already running on the same engine — from the full viewer to embed and offline HTML.',
    items: [
      {
        name: 'CAD Viewer',
        desc: 'Full browser CAD experience',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'CAD Simple Viewer',
        desc: 'Lightweight embeddable viewer',
        href: 'https://mlightcad.github.io/cad-viewer/cad-simple-viewer/',
      },
      {
        name: 'CAD Diff Viewer',
        desc: 'Compare drawing revisions in the browser',
        href: '/cad-diff-viewer.html',
      },
      {
        name: 'iframe Plugin',
        desc: 'One-line DWG/DXF embed',
        href: '/iframe-plugin.html',
      },
      {
        name: 'Google Drive Integration',
        desc: 'Open drawings from Drive',
        href: 'https://mlightcad.com/google-drive-cad-viewer/',
      },
      {
        name: 'Self-contained HTML',
        desc: 'Share CAD without a server',
        href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
      },
    ],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Docs, demo, and community',
    lead: 'Start from the live viewer, then dig into API reference, licensing, and benchmarks.',
    links: [
      {
        name: 'Live Demo',
        desc: 'Full-featured viewer in the browser',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'CAD SDK',
        desc: 'Embed DWG/DXF in your product',
        href: '/cad-sdk.html',
      },
      {
        name: 'DWG Engine',
        desc: 'Commercial production DWG',
        href: '/dwg-engine.html',
      },
      {
        name: 'Benchmarks',
        desc: 'Architecture and published evidence',
        href: '/benchmarks.html',
      },
      {
        name: 'API Reference',
        desc: 'Versioned docs on Read the Docs',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: 'User Guide',
        desc: 'How to use the viewer, interactions, and shortcuts',
        href: 'https://mlightcad.com/cad-viewer/docs/',
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
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refunds: 'Refund Policy',
    licenses: 'License Portal',
    rights: '© 2026 MLightCAD',
  },
  parser: parserEn,
  iframePlugin: iframePluginEn,
  cadDiffViewer: cadDiffViewerEn,
  tutorial: tutorialEn,
  commercial: commercialEn,
  cadSdk: cadSdkEn,
  useCases: useCasesEn,
  benchmarks: benchmarksEn,
}
