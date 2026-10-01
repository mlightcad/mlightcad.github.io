/** Localized copy for the CAD SDK product page. */
export interface CadSdkCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  heroImageAlt: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
  embedTitle: string
  embedLead: string
  embedSnippet: string
  npmTitle: string
  npmSnippet: string
  capabilitiesTitle: string
  capabilities: string[]
  pathsTitle: string
  pathsLead: string
  paths: { title: string; body: string; href: string; cta: string }[]
  relatedTitle: string
  related: { name: string; desc: string; href: string }[]
}

const IFRAME_SNIPPET = `<iframe
  src="https://mlightcad.com/embed.html?url=YOUR_DWG_URL"
  style="width:100%;height:600px;border:0"
  allow="fullscreen"
></iframe>`

const NPM_SNIPPET = `npm install @mlightcad/cad-simple-viewer`

export const cadSdkEn: CadSdkCopy = {
  metaTitle: 'CAD SDK — Embed DWG/DXF in Your Web App | MLightCAD',
  metaDescription:
    'Add DWG/DXF viewing to your website or product. One iframe or npm package — no CAD backend, no upload farm, works offline, with measurement, layers, and custom UI.',
  metaKeywords:
    'CAD SDK, embed DWG viewer, iframe DWG, JavaScript DWG viewer, TypeScript CAD, MLightCAD',
  eyebrow: 'For developers',
  title: 'Embed DWG/DXF in Your Product',
  lead: 'Embed browser-native CAD into your SaaS, portal, or site — one line of embed code, or a TypeScript package you control.',
  heroImageAlt: 'DWG/DXF viewer embedded in a product interface',
  primaryCta: 'iframe Plugin Guide',
  primaryHref: '/iframe-plugin.html',
  secondaryCta: 'API Reference',
  secondaryHref: 'https://cad-viewer.readthedocs.io/en/latest/',
  embedTitle: 'One line of embed',
  embedLead: 'Point an iframe at embed.html with your drawing URL. Host the file yourself — the viewer stays in the browser.',
  embedSnippet: IFRAME_SNIPPET,
  npmTitle: 'Or install the package',
  npmSnippet: NPM_SNIPPET,
  capabilitiesTitle: 'What you get',
  capabilities: [
    'No CAD backend to run or scale',
    'No file upload to our servers',
    'Works offline in view / review workflows',
    'Mobile-friendly interaction',
    'Measurement, layers, and extents',
    'Custom UI via plugins or your own chrome',
  ],
  pathsTitle: 'Pick an integration path',
  pathsLead: 'Start with the lightest embed, then deepen into the full viewer or commercial DWG engine as your product needs grow.',
  paths: [
    {
      title: 'iframe Plugin',
      body: 'Fastest path: drop an iframe, control mode, locale, and chrome with query params.',
      href: '/iframe-plugin.html',
      cta: 'Open guide',
    },
    {
      title: 'CAD Viewer',
      body: 'Full browser CAD experience — view, review markup, and edit with the flagship app.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'Live demo',
    },
    {
      title: 'DWG Engine',
      body: 'Commercial parsing for closed-source redistribution, SaaS, and OEM.',
      href: '/dwg-engine.html',
      cta: 'Learn more',
    },
  ],
  relatedTitle: 'Related',
  related: [
    { name: 'Tutorials', desc: 'Videos and walkthroughs', href: '/tutorial.html' },
    { name: 'Use cases', desc: 'Where teams embed CAD', href: '/use-cases.html' },
    { name: 'Commercial licensing', desc: 'Open source vs commercial', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkZh: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — 把 DWG/DXF 嵌入你的 Web 应用 | MLightCAD',
  metaDescription:
    '为网站或产品加入 DWG/DXF 查看能力。一行 iframe 或一个 npm 包 — 无 CAD 后端、无上传农场，可离线，支持测量、图层与自定义 UI。',
  metaKeywords: 'CAD SDK, 嵌入 DWG, iframe DWG, JavaScript DWG, TypeScript CAD, MLightCAD',
  eyebrow: '面向开发者',
  title: '把 DWG/DXF 嵌入你的产品',
  lead: '把浏览器原生 CAD 嵌入 SaaS、门户或站点 — 一行嵌入代码，或你可控的 TypeScript 包。',
  heroImageAlt: '嵌入产品界面中的 DWG/DXF 查看器',
  primaryCta: 'iframe 插件指南',
  secondaryCta: 'API 参考',
  embedTitle: '一行嵌入',
  embedLead: '用 iframe 指向 embed.html 并带上图纸 URL。文件由你托管 — 查看器留在浏览器内。',
  npmTitle: '或安装 npm 包',
  capabilitiesTitle: '你将获得',
  capabilities: [
    '无需运行或扩容 CAD 后端',
    '文件不会上传到我们的服务器',
    '查看 / 审阅流程可离线工作',
    '移动端友好交互',
    '测量、图层与范围',
    '通过插件或自建界面自定义 UI',
  ],
  pathsTitle: '选择集成路径',
  pathsLead: '从最轻的嵌入开始，随着产品需求加深到完整 Viewer 或商用 DWG Engine。',
  paths: [
    {
      title: 'iframe 插件',
      body: '最快路径：放入 iframe，用查询参数控制模式、语言与界面。',
      href: '/iframe-plugin.html',
      cta: '打开指南',
    },
    {
      title: 'CAD Viewer',
      body: '完整浏览器 CAD 体验 — 查看、批注审阅与编辑。',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: '在线演示',
    },
    {
      title: 'DWG Engine',
      body: '面向闭源再分发、SaaS 与 OEM 的商用解析。',
      href: '/dwg-engine.html',
      cta: '了解更多',
    },
  ],
  relatedTitle: '相关',
  related: [
    { name: '教程', desc: '视频与操作指南', href: '/tutorial.html' },
    { name: '用例', desc: '团队如何嵌入 CAD', href: '/use-cases.html' },
    { name: '商业授权', desc: '开源与商业对照', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkJa: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — Web アプリに DWG/DXF を埋め込む | MLightCAD',
  metaDescription:
    'サイトや製品に DWG/DXF 表示を追加。iframe 1 行または npm パッケージ — CAD バックエンド不要、アップロード不要、オフライン対応。',
  eyebrow: '開発者向け',
  title: '製品に DWG/DXF を埋め込む',
  lead: 'ブラウザネイティブ CAD を SaaS・ポータル・サイトへ — 埋め込み 1 行、または制御可能な TypeScript パッケージ。',
  heroImageAlt: '製品 UI に埋め込まれた DWG/DXF ビューア',
  primaryCta: 'iframe プラグインガイド',
  secondaryCta: 'API リファレンス',
  embedTitle: '1 行で埋め込み',
  embedLead: 'iframe で embed.html に図面 URL を渡します。ファイルはあなたがホスト — ビューアはブラウザ内に留まります。',
  npmTitle: 'またはパッケージをインストール',
  capabilitiesTitle: '得られるもの',
  capabilities: [
    'CAD バックエンドの運用・スケール不要',
    '当社サーバーへのファイルアップロードなし',
    '表示 / レビューフローはオフライン可能',
    'モバイル向け操作',
    '計測・レイヤー・範囲表示',
    'プラグインや独自 UI でカスタム',
  ],
  pathsTitle: '統合パスを選ぶ',
  pathsLead: '最も軽い埋め込みから始め、必要に応じてフル Viewer や商用 DWG Engine へ深めます。',
  paths: [
    {
      title: 'iframe プラグイン',
      body: '最速: iframe を置き、クエリでモード・言語・UI を制御。',
      href: '/iframe-plugin.html',
      cta: 'ガイドを開く',
    },
    {
      title: 'CAD Viewer',
      body: 'フルブラウザ CAD — 表示、レビュー、編集。',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'ライブデモ',
    },
    {
      title: 'DWG Engine',
      body: 'クローズドソース再配布・SaaS・OEM 向け商用解析。',
      href: '/dwg-engine.html',
      cta: '詳しく',
    },
  ],
  relatedTitle: '関連',
  related: [
    { name: 'チュートリアル', desc: '動画と手順', href: '/tutorial.html' },
    { name: 'ユースケース', desc: 'チームが CAD を埋め込む場所', href: '/use-cases.html' },
    { name: '商用ライセンス', desc: 'OSS と商用の比較', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkKo: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — 웹 앱에 DWG/DXF 임베드 | MLightCAD',
  metaDescription:
    '웹사이트나 제품에 DWG/DXF 보기를 추가하세요. iframe 한 줄 또는 npm 패키지 — CAD 백엔드·업로드 없음, 오프라인·측정·레이어·커스텀 UI.',
  eyebrow: '개발자용',
  title: '제품에 DWG/DXF 임베드',
  lead: '브라우저 네이티브 CAD를 SaaS·포털·사이트에 임베드 — 임베드 코드 한 줄, 또는 제어 가능한 TypeScript 패키지.',
  heroImageAlt: '제품 인터페이스에 임베드된 DWG/DXF 뷰어',
  primaryCta: 'iframe 플러그인 가이드',
  secondaryCta: 'API 레퍼런스',
  embedTitle: '한 줄 임베드',
  embedLead: 'iframe으로 embed.html에 도면 URL을 전달하세요. 파일은 직접 호스팅 — 뷰어는 브라우저에 남습니다.',
  npmTitle: '또는 패키지 설치',
  capabilitiesTitle: '제공 내용',
  capabilities: [
    'CAD 백엔드 운영·스케일 불필요',
    '우리 서버로 파일 업로드 없음',
    '보기/리뷰 워크플로는 오프라인 가능',
    '모바일 친화 인터랙션',
    '측정·레이어·범위',
    '플러그인 또는 자체 UI로 커스터마이즈',
  ],
  pathsTitle: '통합 경로 선택',
  pathsLead: '가장 가벼운 임베드부터 시작하고, 필요에 따라 풀 Viewer나 상용 DWG Engine으로 깊이 들어가세요.',
  paths: [
    {
      title: 'iframe 플러그인',
      body: '가장 빠름: iframe을 넣고 쿼리로 모드·언어·UI를 제어.',
      href: '/iframe-plugin.html',
      cta: '가이드 열기',
    },
    {
      title: 'CAD Viewer',
      body: '풀 브라우저 CAD — 보기, 리뷰 마크업, 편집.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: '라이브 데모',
    },
    {
      title: 'DWG Engine',
      body: '클로즈드소스 재배포·SaaS·OEM용 상용 파싱.',
      href: '/dwg-engine.html',
      cta: '자세히',
    },
  ],
  relatedTitle: '관련',
  related: [
    { name: '튜토리얼', desc: '영상과 안내', href: '/tutorial.html' },
    { name: '사용 사례', desc: '팀이 CAD를 임베드하는 곳', href: '/use-cases.html' },
    { name: '상용 라이선스', desc: '오픈소스 vs 상용', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkEs: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — Incruste DWG/DXF en su app web | MLightCAD',
  metaDescription:
    'Añada visualización DWG/DXF a su sitio o producto. Un iframe o un paquete npm — sin backend CAD, sin granja de subidas, offline, medición, capas y UI propia.',
  eyebrow: 'Para desarrolladores',
  title: 'Incruste DWG/DXF en su producto',
  lead: 'Incruste CAD nativo del navegador en su SaaS, portal o sitio — una línea de embed o un paquete TypeScript bajo su control.',
  heroImageAlt: 'Visor DWG/DXF incrustado en la interfaz de un producto',
  primaryCta: 'Guía del plugin iframe',
  secondaryCta: 'Referencia API',
  embedTitle: 'Un embed de una línea',
  embedLead: 'Apunte un iframe a embed.html con la URL del dibujo. Usted aloja el archivo — el visor permanece en el navegador.',
  npmTitle: 'O instale el paquete',
  capabilitiesTitle: 'Qué obtiene',
  capabilities: [
    'Sin backend CAD que operar o escalar',
    'Sin subir archivos a nuestros servidores',
    'Flujos de vista / revisión pueden funcionar offline',
    'Interacción apta para móvil',
    'Medición, capas y extents',
    'UI personalizada vía plugins o su propio chrome',
  ],
  pathsTitle: 'Elija una vía de integración',
  pathsLead: 'Empiece por el embed más ligero y profundice en el viewer completo o el motor DWG comercial según crezca el producto.',
  paths: [
    {
      title: 'Plugin iframe',
      body: 'Vía más rápida: un iframe y query params para modo, idioma y chrome.',
      href: '/iframe-plugin.html',
      cta: 'Abrir guía',
    },
    {
      title: 'CAD Viewer',
      body: 'Experiencia CAD completa en el navegador — ver, revisar y editar.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'Demo en vivo',
    },
    {
      title: 'DWG Engine',
      body: 'Análisis comercial para redistribución closed-source, SaaS y OEM.',
      href: '/dwg-engine.html',
      cta: 'Saber más',
    },
  ],
  relatedTitle: 'Relacionado',
  related: [
    { name: 'Tutoriales', desc: 'Vídeos y guías', href: '/tutorial.html' },
    { name: 'Casos de uso', desc: 'Dónde los equipos incrustan CAD', href: '/use-cases.html' },
    { name: 'Licencias comerciales', desc: 'Open source vs comercial', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkPt: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — Incorpore DWG/DXF no seu app web | MLightCAD',
  metaDescription:
    'Adicione visualização DWG/DXF ao seu site ou produto. Um iframe ou pacote npm — sem backend CAD, sem upload farm, offline, medição, camadas e UI própria.',
  eyebrow: 'Para desenvolvedores',
  title: 'Incorpore DWG/DXF no seu produto',
  lead: 'Incorpore CAD nativo do navegador no seu SaaS, portal ou site — uma linha de embed ou um pacote TypeScript sob seu controle.',
  heroImageAlt: 'Visualizador DWG/DXF incorporado na interface de um produto',
  primaryCta: 'Guia do plugin iframe',
  secondaryCta: 'Referência da API',
  embedTitle: 'Embed em uma linha',
  embedLead: 'Aponte um iframe para embed.html com a URL do desenho. Você hospeda o arquivo — o viewer fica no navegador.',
  npmTitle: 'Ou instale o pacote',
  capabilitiesTitle: 'O que você recebe',
  capabilities: [
    'Sem backend CAD para operar ou escalar',
    'Sem upload de arquivos para nossos servidores',
    'Fluxos de view / review podem funcionar offline',
    'Interação amigável a mobile',
    'Medição, camadas e extents',
    'UI custom via plugins ou seu próprio chrome',
  ],
  pathsTitle: 'Escolha um caminho de integração',
  pathsLead: 'Comece pelo embed mais leve e aprofunde no viewer completo ou no motor DWG comercial conforme o produto cresce.',
  paths: [
    {
      title: 'Plugin iframe',
      body: 'Caminho mais rápido: um iframe e query params para modo, idioma e chrome.',
      href: '/iframe-plugin.html',
      cta: 'Abrir guia',
    },
    {
      title: 'CAD Viewer',
      body: 'Experiência CAD completa no navegador — ver, revisar e editar.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'Demo ao vivo',
    },
    {
      title: 'DWG Engine',
      body: 'Parsing comercial para redistribuição closed-source, SaaS e OEM.',
      href: '/dwg-engine.html',
      cta: 'Saiba mais',
    },
  ],
  relatedTitle: 'Relacionado',
  related: [
    { name: 'Tutoriais', desc: 'Vídeos e guias', href: '/tutorial.html' },
    { name: 'Casos de uso', desc: 'Onde times incorporam CAD', href: '/use-cases.html' },
    { name: 'Licenciamento comercial', desc: 'Open source vs comercial', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkRu: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — встройте DWG/DXF в веб-приложение | MLightCAD',
  metaDescription:
    'Добавьте просмотр DWG/DXF на сайт или в продукт. Один iframe или npm-пакет — без CAD-бэкенда, без upload-фермы, офлайн, измерение, слои и свой UI.',
  eyebrow: 'Для разработчиков',
  title: 'Встройте DWG/DXF в продукт',
  lead: 'Встройте браузерный CAD в SaaS, портал или сайт — одна строка embed или TypeScript-пакет под вашим контролем.',
  heroImageAlt: 'DWG/DXF-просмотрщик, встроенный в интерфейс продукта',
  primaryCta: 'Гайд по iframe-плагину',
  secondaryCta: 'API Reference',
  embedTitle: 'Одна строка embed',
  embedLead: 'Укажите iframe на embed.html с URL чертежа. Файл хостите вы — viewer остаётся в браузере.',
  npmTitle: 'Или установите пакет',
  capabilitiesTitle: 'Что вы получаете',
  capabilities: [
    'Без CAD-бэкенда для эксплуатации и масштабирования',
    'Без загрузки файлов на наши серверы',
    'Сценарии просмотра / review могут работать офлайн',
    'Удобное взаимодействие на мобильных',
    'Измерение, слои и extents',
    'Свой UI через плагины или собственный chrome',
  ],
  pathsTitle: 'Выберите путь интеграции',
  pathsLead: 'Начните с самого лёгкого embed и углубляйтесь в полный viewer или коммерческий DWG Engine по мере роста продукта.',
  paths: [
    {
      title: 'iframe Plugin',
      body: 'Самый быстрый путь: iframe и query-параметры для режима, локали и chrome.',
      href: '/iframe-plugin.html',
      cta: 'Открыть гайд',
    },
    {
      title: 'CAD Viewer',
      body: 'Полный браузерный CAD — просмотр, review и редактирование.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'Демо',
    },
    {
      title: 'DWG Engine',
      body: 'Коммерческий парсинг для закрытого распространения, SaaS и OEM.',
      href: '/dwg-engine.html',
      cta: 'Подробнее',
    },
  ],
  relatedTitle: 'Связанное',
  related: [
    { name: 'Туториалы', desc: 'Видео и гайды', href: '/tutorial.html' },
    { name: 'Сценарии', desc: 'Куда команды встраивают CAD', href: '/use-cases.html' },
    { name: 'Коммерческие лицензии', desc: 'Open source и коммерция', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}

export const cadSdkCs: CadSdkCopy = {
  ...cadSdkEn,
  metaTitle: 'CAD SDK — vložte DWG/DXF do webové aplikace | MLightCAD',
  metaDescription:
    'Přidejte prohlížení DWG/DXF na web nebo do produktu. Jeden iframe nebo npm balíček — bez CAD backendu, bez upload farmy, offline, měření, vrstvy a vlastní UI.',
  eyebrow: 'Pro vývojáře',
  title: 'Vložte DWG/DXF do produktu',
  lead: 'Vložte prohlížečový CAD do SaaS, portálu nebo webu — jeden řádek embedu, nebo TypeScript balíček pod vaší kontrolou.',
  heroImageAlt: 'Prohlížeč DWG/DXF vložený do rozhraní produktu',
  primaryCta: 'Průvodce iframe pluginem',
  secondaryCta: 'API Reference',
  embedTitle: 'Embed na jeden řádek',
  embedLead: 'Namiřte iframe na embed.html s URL výkresu. Soubor hostujete vy — viewer zůstává v prohlížeči.',
  npmTitle: 'Nebo nainstalujte balíček',
  capabilitiesTitle: 'Co získáte',
  capabilities: [
    'Bez CAD backendu k provozu a škálování',
    'Bez uploadu souborů na naše servery',
    'View / review workflows mohou fungovat offline',
    'Přátelská interakce na mobilu',
    'Měření, vrstvy a extents',
    'Vlastní UI přes pluginy nebo vlastní chrome',
  ],
  pathsTitle: 'Zvolte cestu integrace',
  pathsLead: 'Začněte nejlehčím embedem a prohlubujte do plného vieweru nebo komerčního DWG Engine podle růstu produktu.',
  paths: [
    {
      title: 'iframe Plugin',
      body: 'Nejrychlejší cesta: iframe a query parametry pro režim, jazyk a chrome.',
      href: '/iframe-plugin.html',
      cta: 'Otevřít průvodce',
    },
    {
      title: 'CAD Viewer',
      body: 'Plný prohlížečový CAD — prohlížení, review a editace.',
      href: 'https://mlightcad.github.io/cad-viewer/',
      cta: 'Živé demo',
    },
    {
      title: 'DWG Engine',
      body: 'Komerční parsing pro closed-source redistribuci, SaaS a OEM.',
      href: '/dwg-engine.html',
      cta: 'Zjistit více',
    },
  ],
  relatedTitle: 'Související',
  related: [
    { name: 'Tutoriály', desc: 'Videa a návody', href: '/tutorial.html' },
    { name: 'Případy použití', desc: 'Kam týmy vkládají CAD', href: '/use-cases.html' },
    { name: 'Komerční licence', desc: 'Open source vs komerční', href: '/commercial.html' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer', href: 'https://github.com/mlightcad/cad-viewer' },
  ],
}
