import type { ParserCopy } from './parser'

export type Locale = 'en' | 'zh'

export interface FeatureAction {
  label: string
  href: string
  /** Suggested filename when triggering a download */
  download?: string
  variant?: 'primary' | 'ghost'
}

export interface FeatureItem {
  id: string
  title: string
  body: string
  image: string
  imageAlt: string
  actions?: FeatureAction[]
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  nav: {
    product: string
    cadViewer: string
    dwgParser: string
    features: string
    plugins: string
    docs: string
    github: string
    demo: string
    langEn: string
    langZh: string
  }
  hero: {
    brand: string
    meta: string
    headline: string
    subline: string
    ctaDemo: string
    ctaGithub: string
    firsts: string[]
  }
  flagship: {
    eyebrow: string
    title: string
    lead: string
    firstsLabel: string
    firsts: string[]
    ctaDemo: string
    ctaDocs: string
  }
  features: {
    eyebrow: string
    title: string
    lead: string
    items: FeatureItem[]
  }
  plugins: {
    eyebrow: string
    title: string
    lead: string
    imageAlt: string
    items: { name: string; role: string }[]
  }
  resources: {
    eyebrow: string
    title: string
    lead: string
    links: { name: string; desc: string; href: string }[]
  }
  footer: {
    tagline: string
    license: string
    parser: string
    parserHref: string
    contact: string
    rights: string
  }
  parser: ParserCopy
}
