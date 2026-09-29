/** Localized copy for the Open Source vs Commercial page. */
export interface CommercialCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  openCta: string
  openHref: string
  commercialCta: string
  commercialHref: string
  tableTitle: string
  tableLead: string
  colCapability: string
  colOpen: string
  colCommercial: string
  rows: { capability: string; open: string; commercial: string }[]
  note: string
  ctaTitle: string
  ctaLead: string
  pricingCta: string
  pricingHref: string
  engineCta: string
  engineHref: string
}

const YES = '✓'
const NO = '—'

export const commercialEn: CommercialCopy = {
  metaTitle: 'Open Source & Commercial — MLightCAD',
  metaDescription:
    'Compare MLightCAD open source and commercial offerings: DXF, basic DWG, rendering, editing, and plugins stay open; production DWG engine, redistribution, OEM, and priority support are commercial.',
  metaKeywords: 'MLightCAD licensing, open source CAD, commercial DWG, OEM CAD, CAD SDK license',
  eyebrow: 'Licensing',
  title: 'Open Source & Commercial',
  lead: 'The infrastructure stays open. The production DWG engine and redistribution rights are commercial — so the community grows while product teams can ship closed-source software.',
  openCta: 'Try CAD Viewer',
  openHref: 'https://mlightcad.github.io/cad-viewer/',
  commercialCta: 'DWG Engine',
  commercialHref: '/dwg-engine.html',
  tableTitle: 'What is free vs licensed',
  tableLead: 'Use the open stack to build and learn. License the DWG Engine when you need production DWG support or commercial redistribution.',
  colCapability: 'Capability',
  colOpen: 'Open Source',
  colCommercial: 'Commercial',
  rows: [
    { capability: 'DXF parsing & viewing', open: YES, commercial: YES },
    { capability: 'Basic DWG (open converter)', open: YES, commercial: YES },
    { capability: 'WebGL rendering', open: YES, commercial: YES },
    { capability: 'CAD editing & review tools', open: YES, commercial: YES },
    { capability: 'Plugin API', open: YES, commercial: YES },
    { capability: 'Production DWG engine', open: NO, commercial: YES },
    { capability: 'Larger / harder production drawings', open: NO, commercial: YES },
    { capability: 'Closed-source redistribution', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / white-label', open: NO, commercial: YES },
    { capability: 'Support', open: 'Community', commercial: 'Priority' },
  ],
  note: 'Pricing for the commercial DWG Engine starts at a perpetual license with optional annual upgrade packages. Details live on the pricing page.',
  ctaTitle: 'Choose your path',
  ctaLead: 'Start open source, or evaluate the commercial engine when you are ready to ship.',
  pricingCta: 'View Pricing',
  pricingHref: '/dwg-engine.html#pricing',
  engineCta: 'Learn about DWG Engine',
  engineHref: '/dwg-engine.html',
}

export const commercialZh: CommercialCopy = {
  ...commercialEn,
  metaTitle: '开源与商业 — MLightCAD',
  metaDescription:
    '对比 MLightCAD 开源与商业能力：DXF、基础 DWG、渲染、编辑与插件保持开源；生产级 DWG Engine、再分发、OEM 与优先支持为商业授权。',
  metaKeywords: 'MLightCAD 授权, 开源 CAD, 商用 DWG, OEM CAD, CAD SDK 许可',
  eyebrow: '授权',
  title: '开源与商业',
  lead: '基础设施保持开源。生产级 DWG Engine 与再分发权利属于商业授权 — 社区继续增长，产品团队也能交付闭源软件。',
  openCta: '试用 CAD Viewer',
  commercialCta: 'DWG Engine',
  tableTitle: '免费与授权对照',
  tableLead: '用开源栈构建与学习。当你需要生产级 DWG 支持或商业再分发时，再授权 DWG Engine。',
  colCapability: '能力',
  colOpen: '开源',
  colCommercial: '商业',
  rows: [
    { capability: 'DXF 解析与查看', open: YES, commercial: YES },
    { capability: '基础 DWG（开源转换器）', open: YES, commercial: YES },
    { capability: 'WebGL 渲染', open: YES, commercial: YES },
    { capability: 'CAD 编辑与审阅工具', open: YES, commercial: YES },
    { capability: '插件 API', open: YES, commercial: YES },
    { capability: '生产级 DWG Engine', open: NO, commercial: YES },
    { capability: '更大 / 更复杂的生产图纸', open: NO, commercial: YES },
    { capability: '闭源再分发', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / 白标', open: NO, commercial: YES },
    { capability: '支持', open: '社区', commercial: '优先' },
  ],
  note: '商用 DWG Engine 从永久授权起步，可选年度升级包。详情见价格页。',
  ctaTitle: '选择你的路径',
  ctaLead: '从开源开始，准备交付时再评估商用引擎。',
  pricingCta: '查看价格',
  engineCta: '了解 DWG Engine',
}

export const commercialJa: CommercialCopy = {
  ...commercialEn,
  metaTitle: 'オープンソースと商用 — MLightCAD',
  metaDescription:
    'MLightCAD の OSS と商用の比較。DXF・基礎 DWG・描画・編集・プラグインはオープン。本番 DWG Engine・再配布・OEM・優先サポートは商用。',
  eyebrow: 'ライセンス',
  title: 'オープンソースと商用',
  lead: 'インフラはオープンのまま。本番 DWG Engine と再配布権は商用 — コミュニティを伸ばしつつ、製品チームはクローズドソースを出荷できます。',
  openCta: 'CAD Viewer を試す',
  commercialCta: 'DWG Engine',
  tableTitle: '無料とライセンスの範囲',
  tableLead: 'オープンスタックで構築・学習。本番 DWG や商用再配布が必要になったら DWG Engine をライセンス。',
  colCapability: '機能',
  colOpen: 'オープンソース',
  colCommercial: '商用',
  rows: [
    { capability: 'DXF 解析と表示', open: YES, commercial: YES },
    { capability: '基礎 DWG（オープン変換器）', open: YES, commercial: YES },
    { capability: 'WebGL レンダリング', open: YES, commercial: YES },
    { capability: 'CAD 編集とレビュー', open: YES, commercial: YES },
    { capability: 'プラグイン API', open: YES, commercial: YES },
    { capability: '本番 DWG Engine', open: NO, commercial: YES },
    { capability: 'より大きい / 難しい本番図面', open: NO, commercial: YES },
    { capability: 'クローズドソース再配布', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / ホワイトラベル', open: NO, commercial: YES },
    { capability: 'サポート', open: 'コミュニティ', commercial: '優先' },
  ],
  note: '商用 DWG Engine は永久ライセンスから。年次アップグレードは任意。詳細は価格ページ。',
  ctaTitle: 'パスを選ぶ',
  ctaLead: 'オープンソースから始め、出荷準備ができたら商用エンジンを評価してください。',
  pricingCta: '価格を見る',
  engineCta: 'DWG Engine について',
}

export const commercialKo: CommercialCopy = {
  ...commercialEn,
  metaTitle: '오픈소스와 상용 — MLightCAD',
  metaDescription:
    'MLightCAD 오픈소스와 상용 비교. DXF·기본 DWG·렌더링·편집·플러그인은 오픈. 프로덕션 DWG Engine·재배포·OEM·우선 지원은 상용.',
  eyebrow: '라이선스',
  title: '오픈소스와 상용',
  lead: '인프라는 오픈으로 유지합니다. 프로덕션 DWG Engine과 재배포 권한은 상용 — 커뮤니티는 성장하고 제품 팀은 클로즈드소스를 출하할 수 있습니다.',
  openCta: 'CAD Viewer 체험',
  commercialCta: 'DWG Engine',
  tableTitle: '무료 vs 라이선스',
  tableLead: '오픈 스택으로 구축·학습하세요. 프로덕션 DWG나 상용 재배포가 필요하면 DWG Engine을 라이선스하세요.',
  colCapability: '기능',
  colOpen: '오픈소스',
  colCommercial: '상용',
  rows: [
    { capability: 'DXF 파싱 및 보기', open: YES, commercial: YES },
    { capability: '기본 DWG (오픈 변환기)', open: YES, commercial: YES },
    { capability: 'WebGL 렌더링', open: YES, commercial: YES },
    { capability: 'CAD 편집 및 리뷰', open: YES, commercial: YES },
    { capability: '플러그인 API', open: YES, commercial: YES },
    { capability: '프로덕션 DWG Engine', open: NO, commercial: YES },
    { capability: '더 크거나 어려운 실무 도면', open: NO, commercial: YES },
    { capability: '클로즈드소스 재배포', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / 화이트라벨', open: NO, commercial: YES },
    { capability: '지원', open: '커뮤니티', commercial: '우선' },
  ],
  note: '상용 DWG Engine은 영구 라이선스부터 시작하며 연간 업그레이드는 선택입니다. 자세한 내용은 가격 페이지를 보세요.',
  ctaTitle: '경로 선택',
  ctaLead: '오픈소스로 시작하고, 출하 준비가 되면 상용 엔진을 평가하세요.',
  pricingCta: '가격 보기',
  engineCta: 'DWG Engine 알아보기',
}

export const commercialEs: CommercialCopy = {
  ...commercialEn,
  metaTitle: 'Open source y comercial — MLightCAD',
  metaDescription:
    'Compare lo open source y comercial de MLightCAD: DXF, DWG básico, render, edición y plugins siguen abiertos; motor DWG de producción, redistribución, OEM y soporte prioritario son comerciales.',
  eyebrow: 'Licencias',
  title: 'Open source y comercial',
  lead: 'La infraestructura permanece abierta. El motor DWG de producción y los derechos de redistribución son comerciales — la comunidad crece y los equipos de producto pueden enviar software de código cerrado.',
  openCta: 'Probar CAD Viewer',
  commercialCta: 'DWG Engine',
  tableTitle: 'Gratis frente a con licencia',
  tableLead: 'Use el stack abierto para construir y aprender. Licencie el DWG Engine cuando necesite DWG de producción o redistribución comercial.',
  colCapability: 'Capacidad',
  colOpen: 'Open source',
  colCommercial: 'Comercial',
  rows: [
    { capability: 'Análisis y visualización DXF', open: YES, commercial: YES },
    { capability: 'DWG básico (convertidor abierto)', open: YES, commercial: YES },
    { capability: 'Renderizado WebGL', open: YES, commercial: YES },
    { capability: 'Edición y revisión CAD', open: YES, commercial: YES },
    { capability: 'API de plugins', open: YES, commercial: YES },
    { capability: 'Motor DWG de producción', open: NO, commercial: YES },
    { capability: 'Dibujos de producción más grandes / difíciles', open: NO, commercial: YES },
    { capability: 'Redistribución de código cerrado', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / white-label', open: NO, commercial: YES },
    { capability: 'Soporte', open: 'Comunidad', commercial: 'Prioritario' },
  ],
  note: 'El DWG Engine comercial comienza con licencia perpetua y paquetes de actualización anuales opcionales. Detalles en la página de precios.',
  ctaTitle: 'Elija su camino',
  ctaLead: 'Empiece en open source, o evalúe el motor comercial cuando esté listo para enviar.',
  pricingCta: 'Ver precios',
  engineCta: 'Conocer DWG Engine',
}

export const commercialPt: CommercialCopy = {
  ...commercialEn,
  metaTitle: 'Open source e comercial — MLightCAD',
  metaDescription:
    'Compare open source e comercial no MLightCAD: DXF, DWG básico, render, edição e plugins ficam abertos; motor DWG de produção, redistribuição, OEM e suporte prioritário são comerciais.',
  eyebrow: 'Licenciamento',
  title: 'Open source e comercial',
  lead: 'A infraestrutura permanece aberta. O motor DWG de produção e os direitos de redistribuição são comerciais — a comunidade cresce e times de produto podem enviar software closed-source.',
  openCta: 'Experimentar CAD Viewer',
  commercialCta: 'DWG Engine',
  tableTitle: 'Grátis vs licenciado',
  tableLead: 'Use o stack aberto para construir e aprender. Licencie o DWG Engine quando precisar de DWG de produção ou redistribuição comercial.',
  colCapability: 'Capacidade',
  colOpen: 'Open source',
  colCommercial: 'Comercial',
  rows: [
    { capability: 'Parsing e visualização DXF', open: YES, commercial: YES },
    { capability: 'DWG básico (conversor aberto)', open: YES, commercial: YES },
    { capability: 'Renderização WebGL', open: YES, commercial: YES },
    { capability: 'Edição e revisão CAD', open: YES, commercial: YES },
    { capability: 'API de plugins', open: YES, commercial: YES },
    { capability: 'Motor DWG de produção', open: NO, commercial: YES },
    { capability: 'Desenhos de produção maiores / mais difíceis', open: NO, commercial: YES },
    { capability: 'Redistribuição closed-source', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / white-label', open: NO, commercial: YES },
    { capability: 'Suporte', open: 'Comunidade', commercial: 'Prioritário' },
  ],
  note: 'O DWG Engine comercial começa com licença perpétua e pacotes anuais de upgrade opcionais. Detalhes na página de preços.',
  ctaTitle: 'Escolha o caminho',
  ctaLead: 'Comece no open source, ou avalie o motor comercial quando estiver pronto para enviar.',
  pricingCta: 'Ver preços',
  engineCta: 'Conhecer DWG Engine',
}

export const commercialRu: CommercialCopy = {
  ...commercialEn,
  metaTitle: 'Open source и коммерция — MLightCAD',
  metaDescription:
    'Сравнение open source и коммерции MLightCAD: DXF, базовый DWG, рендер, редактирование и плагины открыты; производственный DWG Engine, распространение, OEM и приоритетная поддержка — коммерческие.',
  eyebrow: 'Лицензирование',
  title: 'Open source и коммерция',
  lead: 'Инфраструктура остаётся открытой. Производственный DWG Engine и права на распространение — коммерческие: сообщество растёт, а продуктовые команды могут поставлять закрытый софт.',
  openCta: 'Попробовать CAD Viewer',
  commercialCta: 'DWG Engine',
  tableTitle: 'Бесплатно и по лицензии',
  tableLead: 'Стройте и учитесь на открытом стеке. Лицензируйте DWG Engine, когда нужны производственный DWG или коммерческое распространение.',
  colCapability: 'Возможность',
  colOpen: 'Open source',
  colCommercial: 'Коммерция',
  rows: [
    { capability: 'DXF: разбор и просмотр', open: YES, commercial: YES },
    { capability: 'Базовый DWG (открытый конвертер)', open: YES, commercial: YES },
    { capability: 'WebGL-рендеринг', open: YES, commercial: YES },
    { capability: 'Редактирование и review CAD', open: YES, commercial: YES },
    { capability: 'Plugin API', open: YES, commercial: YES },
    { capability: 'Производственный DWG Engine', open: NO, commercial: YES },
    { capability: 'Более крупные / сложные чертежи', open: NO, commercial: YES },
    { capability: 'Закрытое распространение', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / white-label', open: NO, commercial: YES },
    { capability: 'Поддержка', open: 'Сообщество', commercial: 'Приоритетная' },
  ],
  note: 'Коммерческий DWG Engine начинается с бессрочной лицензии и опциональных годовых обновлений. Подробности на странице цен.',
  ctaTitle: 'Выберите путь',
  ctaLead: 'Начните с open source или оцените коммерческий движок, когда будете готовы к поставке.',
  pricingCta: 'Смотреть цены',
  engineCta: 'Узнать про DWG Engine',
}

export const commercialCs: CommercialCopy = {
  ...commercialEn,
  metaTitle: 'Open source a komerční — MLightCAD',
  metaDescription:
    'Porovnání open source a komerční nabídky MLightCAD: DXF, základní DWG, render, editace a pluginy zůstávají otevřené; produkční DWG Engine, redistribuce, OEM a prioritní podpora jsou komerční.',
  eyebrow: 'Licence',
  title: 'Open source a komerční',
  lead: 'Infrastruktura zůstává otevřená. Produkční DWG Engine a práva na redistribuci jsou komerční — komunita roste a produktové týmy mohou dodávat closed-source software.',
  openCta: 'Vyzkoušet CAD Viewer',
  commercialCta: 'DWG Engine',
  tableTitle: 'Zdarma vs s licencí',
  tableLead: 'Stavějte a učte se na otevřeném stacku. Licencujte DWG Engine, až budete potřebovat produkční DWG nebo komerční redistribuci.',
  colCapability: 'Schopnost',
  colOpen: 'Open source',
  colCommercial: 'Komerční',
  rows: [
    { capability: 'DXF parsing a prohlížení', open: YES, commercial: YES },
    { capability: 'Základní DWG (open převodník)', open: YES, commercial: YES },
    { capability: 'WebGL rendering', open: YES, commercial: YES },
    { capability: 'CAD editace a review', open: YES, commercial: YES },
    { capability: 'Plugin API', open: YES, commercial: YES },
    { capability: 'Produkční DWG Engine', open: NO, commercial: YES },
    { capability: 'Větší / těžší produkční výkresy', open: NO, commercial: YES },
    { capability: 'Closed-source redistribuce', open: NO, commercial: YES },
    { capability: 'SaaS / OEM / white-label', open: NO, commercial: YES },
    { capability: 'Podpora', open: 'Komunita', commercial: 'Prioritní' },
  ],
  note: 'Komerční DWG Engine začíná trvalou licencí s volitelnými ročními upgrady. Podrobnosti na stránce cen.',
  ctaTitle: 'Zvolte cestu',
  ctaLead: 'Začněte open source, nebo vyhodnoťte komerční engine, až budete připraveni dodávat.',
  pricingCta: 'Zobrazit ceny',
  engineCta: 'Zjistit více o DWG Engine',
}
