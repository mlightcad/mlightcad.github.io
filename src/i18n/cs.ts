import type { Dictionary } from './types'
import type { ParserCopy } from './parser'

const parserCs: ParserCopy = {
  metaTitle: 'Proprietární parser DWG — MLightCAD',
  metaDescription:
    'Komerční parser DWG pro produkty s uzavřeným kódem: věčná licence, bez distribuce GPL, přímá náhrada LibreDWG v cad-viewer.',
  metaKeywords:
    'parser DWG, proprietární DWG, alternativa LibreDWG, komerční převodník DWG, cad-viewer, CAD s uzavřeným kódem, věčná licence',
  eyebrow: 'Komerční produkt',
  title: 'Proprietární parser DWG',
  lead: 'Komerční alternativa k open source stacku LibreDWG — pro produkty s uzavřeným kódem, white-label nasazení a SaaS / on-premise prohlížeče, které nemohou zákazníkům distribuovat kód GPL-3.0.',
  contactCta: 'Požádat o zkušební licenci',
  docsCta: 'Úplný licenční dokument',
  docsHref: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.md',
  scopeTitle: 'Rozsah',
  scopeLead: 'Přímá náhrada výchozího open source převodníku DWG.',
  scopeRows: [
    { label: 'Formát', value: 'DWG' },
    { label: 'Balíček', value: '@mlight-cad/dwg-converter' },
    { label: 'Dodání', value: 'Předpřipravený npm balíček (bez zdrojového kódu)' },
  ],
  benefitsTitle: 'Proč si ho týmy vybírají',
  benefits: [
    'Nižší spotřeba paměti než WASM stack založený na LibreDWG',
    'Podpora větších souborů DWG — bez omezení heapu libredwg-web',
    'Přesnější parsování pro produkční výkresy',
    'Zbytek stacku cad-viewer zůstane pouze MIT po odstranění GPL závislostí',
  ],
  licenseTitle: 'Licencování',
  receiveTitle: 'Co obdržíte',
  receive: [
    'Předpřipravený npm balíček (zkompilovaný / svázaný). Zdrojový kód není součástí.',
    'Věčnou licenci k použití balíčku ve vašich produktech a nasazeních.',
  ],
  permittedTitle: 'Povolené použití',
  permitted: [
    'Vložení a redistribuce uvnitř aplikace s uzavřeným kódem (desktop, mobil nebo web)',
    'Nasazení v prostředích SaaS, on-premise a white-label',
    'Neomezený počet uživatelů, tenantů, projektů nebo souborů — bez poplatků za místo nebo soubor',
  ],
  restrictionsTitle: 'Omezení',
  restrictions: [
    'Parser nesmíte redistribuovat ani přeprodávat jako samostatnou knihovnu nebo SDK pro parsování DWG.',
  ],
  pricingTitle: 'Ceny',
  pricingRows: [
    { item: 'Věčná licence (jednorázový dar)', amount: '$3,000 USD' },
    { item: 'Upgrade balíčky — první rok', amount: 'Zahrnuto' },
    { item: 'Upgrade balíčky — po prvním roce', amount: '$1,500 / rok' },
  ],
  pricingNote:
    'Bez licenčních poplatků, bez poplatků za místo, bez limitů využití. Po prvním roce můžete dál používat verzi, kterou máte, bez platby; roční dar slouží pouze k získání nových upgrade balíčků.',
  trialTitle: 'Zkušební licence',
  trialLead: 'Firmy a organizace mohou před nákupem požádat o zkušební licenci. Osobní / individuální žádosti se v tuto chvíli nepřijímají.',
  trialCta: 'Požádat o zkušební licenci',
  trialSteps: [
    'Odešlete formulář žádosti o zkušební licenci s informacemi o firmě a plánovaném využití',
    'Uveďte uživatelské jméno GitHub — přístup se uděluje přes organizaci mlight-cad',
    'Po schválení přijměte pozvánku do organizace GitHub a nainstalujte @mlight-cad/dwg-converter',
  ],
  trialNote: 'Veřejné vyhodnocení je také k dispozici přes demo projekt realdwg-web-example na GitHubu.',
  trialForm: {
    title: 'Požádat o zkušební licenci',
    lead: 'Pouze pro firmy a organizace. Vaši žádost posoudíme a odpovíme e-mailem.',
    close: 'Zavřít',
    companySection: 'Informace o firmě',
    useSection: 'Plánované využití',
    companyName: 'Název firmy / organizace',
    companyNamePlaceholder: 'Název vaší firmy',
    website: 'Web',
    websitePlaceholder: 'https://example.com',
    websiteOptional: 'volitelné',
    country: 'Země / region',
    countryPlaceholder: 'Země nebo region',
    contactName: 'Jméno kontaktní osoby',
    contactNamePlaceholder: 'Vaše jméno',
    contactEmail: 'Kontaktní e-mail',
    contactEmailPlaceholder: 'Váš pracovní e-mail',
    githubUsername: 'Uživatelské jméno GitHub',
    githubUsernamePlaceholder: 'your-github-username',
    productName: 'Název produktu / projektu',
    productNamePlaceholder: 'Stručný název',
    deploymentModel: 'Model nasazení',
    deploymentModelPlaceholder: 'např. SaaS, on-premise, desktop, white-label',
    useCase: 'Stručný popis use case',
    useCasePlaceholder: '1–3 věty o tom, jak plánujete parser používat',
    submit: 'Odeslat žádost',
    submitting: 'Odesílání…',
    success: 'Žádost odeslána. Posoudíme ji a odpovíme e-mailem.',
    error: 'Žádost se nepodařilo odeslat. Zkuste to znovu nebo napište na mlight.lee@outlook.com.',
    requiredHint: 'Povinná pole jsou označena *',
  },
  integrationTitle: 'Integrace',
  integrationLead:
    'Zaregistrujte jako AcDbDatabaseConverter přes AcDbDatabaseConverterManager — stejná cesta jako u LibreDWG. Výstup odpovídá @mlightcad/data-model pod MIT; vykreslování a pluginy zůstávají beze změny.',
  supportTitle: 'Podpora',
  supportRows: [
    { area: 'Opravy chyb', detail: 'Řešeno co nejdříve' },
    { area: 'Upgrade balíčky', detail: 'První rok zahrnut; poté s ročním darem' },
    { area: 'Podpora integrace', detail: 'Rozumná e-mailová podpora' },
    { area: 'Doba odezvy', detail: 'Obvykle do jednoho pracovního dne u nahlášených chyb' },
  ],
  faqTitle: 'Časté dotazy',
  faqs: [
    {
      q: 'Můžeme to použít v white-label produktu?',
      a: 'Ano. Vložte do komerční aplikace s uzavřeným kódem a white-label pro zákazníky SaaS nebo on-premise.',
    },
    {
      q: 'Musíme open source naši aplikaci?',
      a: 'Ne. Licence proprietárního parseru umožňuje použití s uzavřeným kódem. Open source komponenty cad-viewer, které používáte, zůstávají pod svými licencemi (MIT pro jádro stacku).',
    },
    {
      q: 'Co když přestaneme platit roční dar?',
      a: 'Zachováte si věčná práva k verzím, které už máte. Nové upgrade balíčky nedostanete, dokud neobnovíte.',
    },
    {
      q: 'Podporuje 3D entity?',
      a: 'Částečně. 3DSOLID lze extrahovat s wireframe best-effort nebo fallbackem ohraničujícího boxu; plná B-rep teselace zatím není k dispozici.',
    },
  ],
  relatedTitle: 'Související',
  related: [
    {
      name: 'Úplná produktová dokumentace',
      desc: 'Kompletní komerční průvodce pokrývající rozsah, licenci, ceny, zkušební licenci a integraci.',
      href: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.md',
    },
    {
      name: 'realdwg-web-example',
      desc: 'Ukázková aplikace demonstrující proprietární parser DWG v prohlížeči.',
      href: 'https://github.com/mlightcad/realdwg-web-example',
    },
    {
      name: 'Dokumentace API',
      desc: 'Referenční API pro cad-viewer, data-model a integraci převodníku.',
      href: 'https://mlightcad.github.io/cad-viewer/docs/',
    },
  ],
  imageAlts: {
    scope: 'Soubor DWG proudící do proprietárního převodníku a data-model',
    license: 'Upečený komerční balíček se značkou věčné licence',
    trial: 'Cesta zkušební licence od firemního e-mailu k přístupu do organizace GitHub',
    integration: 'Registrace převodníku DWG na sdílené manager sběrnici',
    support: 'Štít pokrývající opravy chyb, upgrady a e-mailovou podporu',
    faq: 'Panely otázek a odpovědí k běžným licenčním tématům',
    related: 'Hub parseru propojený s licenční dokumentací, příkladem a API referencí',
  },
}

export const cs: Dictionary = {
  meta: {
    title: 'MLightCAD — první open source CAD editor v prohlížeči',
    description:
      'cad-viewer: první plně backend-free prohlížeč a editor DWG/DXF, který běží celý v prohlížeči — a první open source toolkit pro editaci DXF/DWG na webu.',
    keywords:
      'MLightCAD, cad-viewer, prohlížeč DWG, prohlížeč DXF, CAD v prohlížeči, WebGL CAD, open source CAD, editor DWG, editor DXF, zero backend',
  },
  nav: {
    product: 'Produkt',
    cadViewer: 'cad-viewer',
    dwgParser: 'Parser DWG',
    features: 'Funkce',
    plugins: 'Pluginy',
    docs: 'Dokumentace',
    github: 'GitHub',
    demo: 'Živé demo',
    language: 'Jazyk',
  },
  hero: {
    brand: 'MLightCAD',
    meta: 'OPEN SOURCE · WEBGL · ZERO BACKEND',
    headline: 'První open source CAD stack, který nikdy neopustí prohlížeč.',
    subline:
      'Parsování, vykreslování a editace DXF/DWG celé na zařízení — bez backendu, bez upload pipeline, bez kompromisů v soukromí.',
    ctaDemo: 'Vyzkoušet živé demo',
    ctaGithub: 'Zobrazit na GitHubu',
    firsts: [
      'První plně backend-free prohlížeč a editor DWG/DXF v prohlížeči',
      'První open source toolkit pro editaci DXF/DWG na webu',
    ],
  },
  flagship: {
    eyebrow: 'Vlajkový produkt',
    title: 'cad-viewer',
    lead: 'Production-grade WebGL CAD runtime: parsování DWG/DXF, geometrie, prohlížení a editace — vše uvnitř karty moderního prohlížeče.',
    firstsLabel: 'První v oboru',
    firsts: [
      'První prohlížeč a editor DWG/DXF, který běží kompletně v prohlížeči s nulovými backend službami.',
      'První open source toolkit pro skutečnou editaci DXF/DWG na webu — ne read-only náhled.',
    ],
    ctaDemo: 'Otevřít demo',
    ctaDocs: 'Dokumentace API',
  },
  features: {
    eyebrow: 'Funkce',
    title: 'Vytvořeno pro soukromí, přenositelnost a produktové týmy.',
    lead: 'Každá schopnost je navržena kolem jednoho principu: seriózní CAD práce by měla být možná bez stavění CAD serveru.',
    items: [
      {
        id: 'privacy',
        title: 'Soukromí architekturou',
        body: 'Výkresy se parsují a vykreslují celé na klientovi. Nic se nenahrává, nestaginguje ani nezrcadlí na vzdáleném hostu — důvěrnost je strukturální záruka, ne zaškrtávací políčko v politice.',
        image: '/assets/features/privacy.svg',
        imageAlt: 'Konceptuální zámek: výkresy zůstávají na lokálním zařízení',
      },
      {
        id: 'integration',
        title: 'Nulová infrastruktura, hluboká integrace',
        body: 'Integrujte CAD do produktu bez backendů nebo conversion farms. Modulární plugin architektura umožňuje skládat UI, export a AI agenty jako plnohodnotná rozšíření.',
        image: '/assets/features/integration.svg',
        imageAlt: 'Host aplikace propojená s CAD jádrem a pluginy',
      },
      {
        id: 'html-export',
        title: 'Offline HTML export v jednom souboru',
        body: 'Převeďte živý výkres na samostatný .html artefakt s vestavěným prohlížečem — pan, zoom, extents, vrstvy, měření vzdálenosti a UI EN/ZH. Příjemci otevřou v jakémkoli moderním prohlížeči: bez instalace, bez instance cad-viewer, bez serveru. V režimu prohlížení offline HTML spotřebuje přibližně o 83 % méně paměti než AutoCAD 2020 na stejném vzorovém výkresu, přičemž stále podporuje pan, zoom, vrstvy a měření.',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG se mění v přenositelný HTML soubor',
        actions: [
          {
            label: 'Otevřít demo HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            variant: 'primary',
          },
          {
            label: 'Stáhnout demo HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            download: 'canteen.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'workflows',
        title: 'Offline i online, stejný engine',
        body: 'Podpora air-gapped review a připojených produktových workflow jedním runtime. Editujte lokálně bez sítě; synchronizujte do platformy po návratu — bez přepisování CAD jádra.',
        image: '/assets/features/workflows.svg',
        imageAlt: 'Smyčka offline a online workflow',
      },
      {
        id: 'edit',
        title: 'Skutečný editor — ne pasivní prohlížeč',
        body: 'Za hranice pan a zoom. Vybírejte, upravujte a vytvářejte geometrii s command surface inspirovanou AutoCADem — aby webové produkty mohly nabídnout skutečnou práci s výkresy, ne jen read-only náhledy.',
        image: '/assets/features/edit.svg',
        imageAlt: 'Grip points a editační operace na výkresu',
      },
    ],
  },
  plugins: {
    eyebrow: 'Ekosystém',
    title: 'Oficiální pluginy',
    lead: 'Skládejte UI, export a AI kolem sdílené plugin sběrnice — načítejte jen to, co každý produkt potřebuje.',
    imageAlt: 'CAD jádro s plug-in moduly UI, agent, HTML, PDF a SVG',
    items: [
      { name: 'cad-simple-ui-plugin', role: 'Toolbar a správce vrstev (framework-agnostic DOM)' },
      { name: 'cad-agent-plugin', role: 'CAD agent v přirozeném jazyce s kreslicími nástroji' },
      { name: 'cad-html-plugin', role: 'Export samostatného offline HTML' },
      { name: 'cad-pdf-plugin', role: 'Vektorový PDF export a import PDF do CAD' },
      { name: 'cad-svg-plugin', role: 'Vektorový SVG export' },
    ],
  },
  resources: {
    eyebrow: 'Zdroje',
    title: 'Dokumentace, demo a komunita',
    lead: 'Začněte u živého prohlížeče, pak pokračujte referencí API a wiki projektu.',
    links: [
      {
        name: 'Živé demo',
        desc: 'Plně vybavený prohlížeč v prohlížeči',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'Dokumentace API',
        desc: 'Verzovaná dokumentace na Read the Docs',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: 'Nejnovější dokumentace',
        desc: 'GitHub Pages (dev / latest)',
        href: 'https://mlightcad.github.io/cad-viewer/docs/',
      },
      {
        name: 'Wiki',
        desc: 'Průvodce a poznámky k architektuře',
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
    tagline: 'Open source CAD infrastruktura pro web.',
    rights: '© 2026 MLightCAD',
  },
  parser: parserCs,
}
