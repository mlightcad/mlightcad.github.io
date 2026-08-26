/** Shared shape for the product tutorials / video gallery page. */

/** Stable key for a video in {@link TutorialCopy.videos}. */
export type TutorialVideoKey = 'measurement' | 'designReview'

/** Localized title and summary for one tutorial film. */
export interface TutorialVideoCopy {
  title: string
  body: string
}

/** Localized copy for the tutorials page. */
export interface TutorialCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  heroImageAlt: string
  play: string
  openYoutube: string
  moreLead: string
  channelCta: string
  videos: Record<TutorialVideoKey, TutorialVideoCopy>
}

/**
 * YouTube films shown on `/tutorial.html`.
 * To add a video: append an item here and add matching copy under `videos` in every locale below.
 */
export const TUTORIAL_VIDEOS: { youtubeId: string; key: TutorialVideoKey }[] = [
  { youtubeId: 'zWLs1TCtyBg', key: 'measurement' },
  { youtubeId: '1DPvN3oOI0Q', key: 'designReview' },
]

/** Public YouTube channel for longer-form and upcoming films. */
export const TUTORIAL_CHANNEL_HREF = 'https://www.youtube.com/@mlightcad'

export const tutorialEn: TutorialCopy = {
  metaTitle: 'Tutorials — MLightCAD',
  metaDescription:
    'Watch CAD-Viewer feature walkthroughs: measure drawings and review CAD designs directly in the browser.',
  metaKeywords: 'CAD tutorial, CAD-Viewer, DWG measurement, design review, browser CAD, MLightCAD',
  eyebrow: 'Product films',
  title: 'See CAD-Viewer at work',
  lead: 'Short walkthroughs of real features. New films land here as we ship them.',
  heroImageAlt: 'CAD-Viewer product films: measurement tools and design review',
  play: 'Play',
  openYoutube: 'Watch on YouTube',
  moreLead: 'More walkthroughs will appear in this list.',
  channelCta: 'YouTube channel',
  videos: {
    measurement: {
      title: 'Measurement tools',
      body: 'Measure distances, areas, and angles on DWG/DXF drawings without leaving the browser.',
    },
    designReview: {
      title: 'Design review',
      body: 'Review CAD designs in the browser with markup built for drawing comments and sign-off.',
    },
  },
}

export const tutorialZh: TutorialCopy = {
  metaTitle: '教程 — MLightCAD',
  metaDescription: '观看 CAD-Viewer 功能演示：在浏览器内测量图纸、审阅 CAD 设计。',
  metaKeywords: 'CAD 教程, CAD-Viewer, DWG 测量, 设计审阅, 浏览器 CAD, MLightCAD',
  eyebrow: '产品演示',
  title: '看 CAD-Viewer 实际怎么用',
  lead: '真实功能的短片演示。后续新功能会陆续放到这里。',
  heroImageAlt: 'CAD-Viewer 产品演示：测量工具与设计审阅',
  play: '播放',
  openYoutube: '在 YouTube 观看',
  moreLead: '更多演示会陆续出现在这份列表里。',
  channelCta: 'YouTube 频道',
  videos: {
    measurement: {
      title: '测量工具',
      body: '在浏览器内直接测量 DWG/DXF 图纸的距离、面积和角度。',
    },
    designReview: {
      title: '设计审阅',
      body: '在浏览器里审阅 CAD 设计，用面向图纸批注和确认的标记工具完成沟通。',
    },
  },
}

export const tutorialJa: TutorialCopy = {
  metaTitle: 'チュートリアル — MLightCAD',
  metaDescription:
    'CAD-Viewer の機能ウォークスルー: ブラウザ上で図面を測定し、CAD デザインをレビューできます。',
  metaKeywords: 'CAD チュートリアル, CAD-Viewer, DWG 測定, デザインレビュー, ブラウザ CAD, MLightCAD',
  eyebrow: '製品フィルム',
  title: 'CAD-Viewer の動きを見る',
  lead: '実際の機能の短い解説です。新しいフィルムは公開次第ここに追加します。',
  heroImageAlt: 'CAD-Viewer の製品フィルム：測定ツールとデザインレビュー',
  play: '再生',
  openYoutube: 'YouTube で見る',
  moreLead: '今後のウォークスルーはこの一覧に追加されます。',
  channelCta: 'YouTube チャンネル',
  videos: {
    measurement: {
      title: '測定ツール',
      body: 'ブラウザを離れずに、DWG/DXF 図面の距離・面積・角度を測定します。',
    },
    designReview: {
      title: 'デザインレビュー',
      body: '図面コメントと承認向けのマークアップで、ブラウザ上から CAD デザインをレビューします。',
    },
  },
}

export const tutorialKo: TutorialCopy = {
  metaTitle: '튜토리얼 — MLightCAD',
  metaDescription: 'CAD-Viewer 기능 시연: 브라우저에서 도면을 측정하고 CAD 설계를 검토하세요.',
  metaKeywords: 'CAD 튜토리얼, CAD-Viewer, DWG 측정, 설계 검토, 브라우저 CAD, MLightCAD',
  eyebrow: '제품 영상',
  title: 'CAD-Viewer가 실제로 하는 일',
  lead: '실제 기능을 짧게 보여 줍니다. 새 영상은 출시되는 대로 여기에 올라옵니다.',
  heroImageAlt: 'CAD-Viewer 제품 영상: 측정 도구와 설계 검토',
  play: '재생',
  openYoutube: 'YouTube에서 보기',
  moreLead: '이후 워크스루는 이 목록에 추가됩니다.',
  channelCta: 'YouTube 채널',
  videos: {
    measurement: {
      title: '측정 도구',
      body: '브라우저를 떠나지 않고 DWG/DXF 도면에서 거리, 면적, 각도를 측정합니다.',
    },
    designReview: {
      title: '설계 검토',
      body: '도면 코멘트와 승인을 위한 마크업으로 브라우저에서 CAD 설계를 검토합니다.',
    },
  },
}

export const tutorialEs: TutorialCopy = {
  metaTitle: 'Tutoriales — MLightCAD',
  metaDescription:
    'Vea recorridos de CAD-Viewer: mida dibujos y revise diseños CAD directamente en el navegador.',
  metaKeywords: 'tutorial CAD, CAD-Viewer, medición DWG, revisión de diseño, CAD en el navegador, MLightCAD',
  eyebrow: 'Películas del producto',
  title: 'Vea CAD-Viewer en acción',
  lead: 'Recorridos cortos de funciones reales. Las nuevas películas aparecen aquí cuando las publicamos.',
  heroImageAlt: 'Películas de CAD-Viewer: herramientas de medición y revisión de diseño',
  play: 'Reproducir',
  openYoutube: 'Ver en YouTube',
  moreLead: 'Más recorridos aparecerán en esta lista.',
  channelCta: 'Canal de YouTube',
  videos: {
    measurement: {
      title: 'Herramientas de medición',
      body: 'Mida distancias, áreas y ángulos en dibujos DWG/DXF sin salir del navegador.',
    },
    designReview: {
      title: 'Revisión de diseño',
      body: 'Revise diseños CAD en el navegador con markup pensado para comentarios y aprobación de planos.',
    },
  },
}

export const tutorialPt: TutorialCopy = {
  metaTitle: 'Tutoriais — MLightCAD',
  metaDescription:
    'Assista a demonstrações do CAD-Viewer: meça desenhos e revise projetos CAD direto no navegador.',
  metaKeywords: 'tutorial CAD, CAD-Viewer, medição DWG, revisão de projeto, CAD no navegador, MLightCAD',
  eyebrow: 'Filmes do produto',
  title: 'Veja o CAD-Viewer em ação',
  lead: 'Demonstrações curtas de recursos reais. Novos filmes entram aqui quando lançamos.',
  heroImageAlt: 'Filmes do CAD-Viewer: ferramentas de medição e revisão de projeto',
  play: 'Reproduzir',
  openYoutube: 'Assistir no YouTube',
  moreLead: 'Mais demonstrações vão aparecer nesta lista.',
  channelCta: 'Canal do YouTube',
  videos: {
    measurement: {
      title: 'Ferramentas de medição',
      body: 'Meça distâncias, áreas e ângulos em desenhos DWG/DXF sem sair do navegador.',
    },
    designReview: {
      title: 'Revisão de projeto',
      body: 'Revise projetos CAD no navegador com markup feito para comentários e aprovação de desenhos.',
    },
  },
}

export const tutorialRu: TutorialCopy = {
  metaTitle: 'Обучение — MLightCAD',
  metaDescription:
    'Смотрите обзоры CAD-Viewer: измеряйте чертежи и проверяйте CAD-проекты прямо в браузере.',
  metaKeywords: 'CAD туториал, CAD-Viewer, измерение DWG, проверка проекта, CAD в браузере, MLightCAD',
  eyebrow: 'Ролики о продукте',
  title: 'CAD-Viewer в работе',
  lead: 'Короткие разборы реальных функций. Новые ролики появляются здесь по мере выпуска.',
  heroImageAlt: 'Ролики CAD-Viewer: инструменты измерения и проверка проекта',
  play: 'Смотреть',
  openYoutube: 'Смотреть на YouTube',
  moreLead: 'Новые разборы будут добавляться в этот список.',
  channelCta: 'Канал YouTube',
  videos: {
    measurement: {
      title: 'Инструменты измерения',
      body: 'Измеряйте расстояния, площади и углы на чертежах DWG/DXF, не покидая браузер.',
    },
    designReview: {
      title: 'Проверка проекта',
      body: 'Проверяйте CAD-проекты в браузере с разметкой для комментариев и согласования чертежей.',
    },
  },
}

export const tutorialCs: TutorialCopy = {
  metaTitle: 'Tutoriály — MLightCAD',
  metaDescription:
    'Sledujte ukázky CAD-Viewer: měřte výkresy a kontrolujte CAD návrhy přímo v prohlížeči.',
  metaKeywords: 'CAD tutoriál, CAD-Viewer, měření DWG, kontrola návrhu, CAD v prohlížeči, MLightCAD',
  eyebrow: 'Produktová videa',
  title: 'CAD-Viewer v praxi',
  lead: 'Krátké ukázky skutečných funkcí. Nová videa sem přidáváme, jakmile je vydáme.',
  heroImageAlt: 'Videa CAD-Viewer: nástroje měření a kontrola návrhu',
  play: 'Přehrát',
  openYoutube: 'Sledovat na YouTube',
  moreLead: 'Další ukázky se objeví v tomto seznamu.',
  channelCta: 'Kanál YouTube',
  videos: {
    measurement: {
      title: 'Nástroje měření',
      body: 'Měřte vzdálenosti, plochy a úhly na výkresech DWG/DXF, aniž byste opustili prohlížeč.',
    },
    designReview: {
      title: 'Kontrola návrhu',
      body: 'Kontrolujte CAD návrhy v prohlížeči se značkami určenými pro komentáře a schválení výkresu.',
    },
  },
}
