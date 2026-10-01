import type { CadDiffViewerCopy } from './cadDiffViewer'
import type { BenchmarksCopy } from './benchmarks'
import type { CadSdkCopy } from './cadSdk'
import type { CommercialCopy } from './commercial'
import type { IframePluginCopy } from './iframePlugin'
import type { ParserCopy } from './parser'
import type { TutorialCopy } from './tutorial'
import type { UseCasesCopy } from './useCases'

/** Supported marketing-site locales. */
export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'pt' | 'ru' | 'cs'

/** CTA or download control attached to a homepage feature block. */
export interface FeatureAction {
  /** Button label. */
  label: string
  /** Destination URL or download path. */
  href: string
  /** Suggested filename when triggering a download */
  download?: string
  /** Visual treatment for the control. */
  variant?: 'primary' | 'ghost'
}

/** One feature row on the homepage. */
export interface FeatureItem {
  /** Stable id used for the section anchor (`feature-{id}`). */
  id: string
  /** Feature heading. */
  title: string
  /** Supporting copy. */
  body: string
  /** Illustration path. */
  image: string
  /** Accessible description of the illustration. */
  imageAlt: string
  /** Optional CTAs rendered under the body. */
  actions?: FeatureAction[]
}

/** One layer in the homepage platform architecture stack. */
export interface PlatformLayer {
  name: string
  desc: string
}

/** Open-source vs commercial path card on the homepage. */
export interface PlatformPath {
  label: string
  title: string
  body: string
  href: string
  cta: string
}

/** Community / built-with project card. */
export interface ShowcaseItem {
  name: string
  desc: string
  href: string
}

/**
 * Localized copy tree for the marketing site.
 *
 * Nested string fields are translation values and are not documented here.
 */
export interface Dictionary {
  /** Homepage document metadata. */
  meta: {
    title: string
    description: string
    keywords: string
  }
  /** Primary navigation labels. */
  nav: {
    product: string
    cadViewer: string
    cadSdk: string
    dwgEngine: string
    cadDiffViewer: string
    dwgToHtml: string
    developers: string
    iframePlugin: string
    googleDrive: string
    solutions: string
    pricing: string
    resourcesNav: string
    benchmarks: string
    commercial: string
    tutorials: string
    docs: string
    userGuide: string
    wiki: string
    apiReference: string
    installationUsage: string
    github: string
    language: string
    /** @deprecated kept for iframe-plugin page anchors during transition */
    features?: string
    plugins?: string
    integration?: string
    dwgParser?: string
  }
  /** Homepage hero copy. */
  hero: {
    brand: string
    meta: string
    headline: string
    subline: string
    ctaDemo: string
    ctaBuild: string
    guarantees: string[]
  }
  /** Homepage platform architecture section. */
  platform: {
    eyebrow: string
    title: string
    lead: string
    closing: string
    layers: PlatformLayer[]
    paths: PlatformPath[]
  }
  /** Flagship product section copy. */
  flagship: {
    eyebrow: string
    title: string
    lead: string
    highlightsLabel: string
    highlights: string[]
  }
  /** In-browser “try your drawing” widget copy. */
  tryDrawing: {
    barIdle: string
    barLoading: string
    title: string
    body: string
    open: string
    trust: string
    privacyTitle: string
    privacyBody: string
    verifySummary: string
    verifyBody: string
    dragHint: string
    caption: string
    captionOpen: string
    statusLoading: string
    statusLoadingViewer: string
    statusInit: string
    errorType: string
    errorInit: string
    errorOpen: string
    /** Shown when the DWG converter evaluation period has ended. */
    errorLicenseExpired: string
    /** Shown when the DWG converter license key is missing or invalid. */
    errorLicenseInvalid: string
    retry: string
    fullscreen: string
    exitFullscreen: string
    close: string
  }
  /** Features section copy. */
  features: {
    eyebrow: string
    title: string
    lead: string
    items: FeatureItem[]
  }
  /** Drawing gallery section (remote demo-drawings assets). */
  gallery: {
    eyebrow: string
    title: string
    /** HTML lead with trusted internal links. */
    leadHtml: string
    download: string
    loading: string
    empty: string
    error: string
    openAria: string
    downloadAria: string
  }
  /** Plugins / platform modules section copy. */
  plugins: {
    eyebrow: string
    title: string
    lead: string
    imageAlt: string
    items: { name: string; role: string }[]
  }
  /** Built-with / community showcase section. */
  showcase: {
    eyebrow: string
    title: string
    lead: string
    items: ShowcaseItem[]
  }
  /** Resources / links section copy. */
  resources: {
    eyebrow: string
    title: string
    lead: string
    links: { name: string; desc: string; href: string }[]
  }
  /** Site footer copy. */
  footer: {
    tagline: string
    terms: string
    privacy: string
    refunds: string
    licenses: string
    rights: string
  }
  /** DWG Engine product / pricing page copy. */
  parser: ParserCopy
  /** iframe plugin docs page copy. */
  iframePlugin: IframePluginCopy
  /** CAD Diff Viewer product page copy. */
  cadDiffViewer: CadDiffViewerCopy
  /** Product tutorial / video gallery page copy. */
  tutorial: TutorialCopy
  /** Open Source vs Commercial page copy. */
  commercial: CommercialCopy
  /** CAD SDK product page copy. */
  cadSdk: CadSdkCopy
  /** Solutions / use-cases page copy. */
  useCases: UseCasesCopy
  /** Qualitative benchmarks page copy. */
  benchmarks: BenchmarksCopy
}
