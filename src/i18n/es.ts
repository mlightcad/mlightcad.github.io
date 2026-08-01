import type { Dictionary } from './types'
import type { ParserCopy } from './parser'

const parserEs: ParserCopy = {
  metaTitle: 'Parser DWG propietario — MLightCAD',
  metaDescription:
    'Parser DWG comercial para productos de código cerrado: licencia perpetua, sin distribución GPL, reemplazo directo de LibreDWG en cad-viewer.',
  metaKeywords:
    'parser DWG, DWG propietario, alternativa LibreDWG, convertidor DWG comercial, cad-viewer, CAD código cerrado, licencia perpetua',
  eyebrow: 'Producto comercial',
  title: 'Parser DWG propietario',
  lead: 'Una alternativa comercial al stack open source LibreDWG — diseñada para productos de código cerrado, despliegues white-label y visores SaaS / on-premise que no pueden distribuir código GPL-3.0 a sus clientes.',
  contactCta: 'Solicitar licencia de prueba',
  demoCta: 'Probar demo en vivo',
  demoHref: 'https://mlightcad.com/realdwg-web-example/',
  scopeTitle: 'Alcance',
  scopeLead: 'Reemplazo directo del convertidor DWG open source predeterminado.',
  scopeRows: [
    { label: 'Formato', value: 'DWG' },
    { label: 'Paquete', value: '@mlight-cad/dwg-converter' },
    { label: 'Entrega', value: 'Paquete npm precompilado (sin código fuente)' },
  ],
  benefitsTitle: 'Por qué lo eligen los equipos',
  benefits: [
    'Menor uso de memoria que el stack WASM basado en LibreDWG',
    'Compatibilidad con archivos DWG más grandes — sin las limitaciones de heap de libredwg-web',
    'Análisis más preciso para planos de producción',
    'Mantiene el resto del stack cad-viewer solo con MIT cuando se eliminan las dependencias GPL',
  ],
  licenseTitle: 'Licencia',
  receiveTitle: 'Qué recibe',
  receive: [
    'Un paquete npm precompilado (compilado / empaquetado). El código fuente no está incluido.',
    'Una licencia perpetua para usar el paquete en sus productos y despliegues.',
  ],
  permittedTitle: 'Uso permitido',
  permitted: [
    'Integrar y redistribuir dentro de su aplicación de código cerrado (escritorio, móvil o web)',
    'Desplegar en entornos SaaS, on-premise y white-label',
    'Usuarios, inquilinos, proyectos o archivos ilimitados — sin tarifas por asiento o por archivo',
  ],
  restrictionsTitle: 'Restricciones',
  restrictions: [
    'No puede redistribuir ni revender el parser como biblioteca o SDK de análisis DWG independiente.',
  ],
  pricingTitle: 'Precios',
  pricingRows: [
    { item: 'Licencia perpetua (donación única)', amount: '$3,000 USD' },
    { item: 'Paquetes de actualización — primer año', amount: 'Incluido' },
    { item: 'Paquetes de actualización — después del primer año', amount: '$1,500 / año' },
  ],
  pricingNote:
    'Sin regalías, sin tarifas por asiento, sin límites de uso. Después del primer año puede seguir usando la versión que tiene sin pagar; la donación anual es solo para nuevos paquetes de actualización.',
  trialTitle: 'Licencia de prueba',
  trialLead: 'Empresas y organizaciones pueden solicitar una prueba antes de la compra. No se aceptan solicitudes personales / individuales en este momento.',
  trialCta: 'Solicitar licencia de prueba',
  trialSteps: [
    'Envíe el formulario de solicitud de prueba con información de la empresa y el uso previsto',
    'Incluya un nombre de usuario de GitHub — el acceso se concede a través de la organización mlight-cad',
    'Tras la aprobación, acepte la invitación a la organización de GitHub e instale @mlight-cad/dwg-converter',
  ],
  trialNote: 'La evaluación pública también está disponible a través del proyecto demo realdwg-web-example en GitHub.',
  trialForm: {
    title: 'Solicitar licencia de prueba',
    lead: 'Solo para empresas y organizaciones. Revisaremos su solicitud y le responderemos por correo electrónico.',
    close: 'Cerrar',
    companySection: 'Información de la empresa',
    useSection: 'Uso previsto',
    companyName: 'Nombre de la empresa / organización',
    companyNamePlaceholder: 'Nombre de su empresa',
    website: 'Sitio web',
    websitePlaceholder: 'https://example.com',
    websiteOptional: 'opcional',
    country: 'País / región',
    countryPlaceholder: 'País o región',
    contactName: 'Nombre de contacto',
    contactNamePlaceholder: 'Su nombre',
    contactEmail: 'Correo de contacto',
    contactEmailPlaceholder: 'Su correo de trabajo',
    githubUsername: 'Nombre de usuario de GitHub',
    githubUsernamePlaceholder: 'your-github-username',
    productName: 'Nombre del producto / proyecto',
    productNamePlaceholder: 'Nombre breve',
    deploymentModel: 'Modelo de despliegue',
    deploymentModelPlaceholder: 'p. ej. SaaS, on-premise, escritorio, white-label',
    useCase: 'Breve descripción del caso de uso',
    useCasePlaceholder: '1–3 frases sobre cómo planea usar el parser',
    submit: 'Enviar solicitud',
    submitting: 'Enviando…',
    success: 'Solicitud enviada. La revisaremos y responderemos por correo electrónico.',
    error: 'No se pudo enviar la solicitud. Inténtelo de nuevo o escriba a mlight.lee@outlook.com.',
    requiredHint: 'Los campos obligatorios están marcados con *',
  },
  integrationTitle: 'Integración',
  integrationLead:
    'Regístrelo como AcDbDatabaseConverter a través de AcDbDatabaseConverterManager — la misma ruta que LibreDWG. La salida cumple con @mlightcad/data-model bajo MIT; el renderizado y los plugins permanecen sin cambios.',
  supportTitle: 'Soporte',
  supportRows: [
    { area: 'Corrección de errores', detail: 'Atendidos lo antes posible' },
    { area: 'Paquetes de actualización', detail: 'Primer año incluido; después con donación anual' },
    { area: 'Soporte de integración', detail: 'Soporte razonable por correo electrónico' },
    { area: 'Tiempo de respuesta', detail: 'Normalmente en un día hábil para errores reportados' },
  ],
  faqTitle: 'Preguntas frecuentes',
  faqs: [
    {
      q: '¿Podemos usarlo en un producto white-label?',
      a: 'Sí. Intégelo en una aplicación comercial de código cerrado y white-label para clientes SaaS o on-premise.',
    },
    {
      q: '¿Necesitamos open source de nuestra aplicación?',
      a: 'No. La licencia del parser propietario permite uso de código cerrado. Los componentes open source de cad-viewer que use siguen sus propias licencias (MIT para el stack principal).',
    },
    {
      q: '¿Qué pasa si dejamos de pagar la donación anual?',
      a: 'Conserva los derechos perpetuos sobre las versiones ya recibidas. Simplemente no recibirá nuevos paquetes de actualización hasta renovar.',
    },
    {
      q: '¿Admite entidades 3D?',
      a: 'Parcialmente. 3DSOLID puede extraerse con wireframe de mejor esfuerzo o respaldo de caja delimitadora; la teselación B-rep completa aún no está disponible.',
    },
  ],
  relatedTitle: 'Relacionado',
  related: [
    {
      name: 'Documentación completa del producto',
      desc: 'Guía comercial completa que cubre alcance, licencia, precios, prueba e integración.',
      href: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.md',
    },
    {
      name: 'realdwg-web-example',
      desc: 'Aplicación de ejemplo que demuestra el parser DWG propietario en el navegador.',
      href: 'https://github.com/mlightcad/realdwg-web-example',
    },
    {
      name: 'Documentación de la API',
      desc: 'Referencia de la API para cad-viewer, data-model e integración del convertidor.',
      href: 'https://mlightcad.com/realdwg-web/',
    },
  ],
  imageAlts: {
    scope: 'Archivo DWG fluyendo hacia el paquete convertidor propietario y data-model',
    license: 'Paquete comercial sellado con marca de licencia perpetua',
    trial: 'Ruta de prueba desde el correo de la empresa hasta el acceso a la organización de GitHub',
    integration: 'Registro del convertidor DWG en el bus compartido del manager',
    support: 'Escudo que cubre corrección de errores, actualizaciones y soporte por correo',
    faq: 'Paneles de preguntas y respuestas sobre temas comunes de licencia',
    related: 'Hub del parser vinculado a documentos de licencia, ejemplo y referencia de API',
  },
}

export const es: Dictionary = {
  meta: {
    title: 'MLightCAD — El primer editor CAD open source en el navegador',
    description:
      'cad-viewer: el primer visor y editor DWG/DXF completamente sin backend que funciona íntegramente en el navegador — y el primer toolkit open source de edición DXF/DWG en la web.',
    keywords:
      'MLightCAD, cad-viewer, visor DWG, visor DXF, CAD navegador, WebGL CAD, CAD open source, editor DWG, editor DXF, cero backend',
  },
  nav: {
    product: 'Producto',
    cadViewer: 'cad-viewer',
    dwgParser: 'Parser DWG',
    features: 'Funciones',
    plugins: 'Plugins',
    docs: 'Documentación',
    github: 'GitHub',
    demo: 'Demo en vivo',
    language: 'Idioma',
  },
  hero: {
    brand: 'MLightCAD',
    meta: 'OPEN SOURCE · WEBGL · CERO BACKEND',
    headline: 'El primer stack CAD open source que nunca sale del navegador.',
    subline:
      'Analice, renderice y edite DXF/DWG íntegramente en el dispositivo — sin backend, sin pipeline de carga, sin comprometer la privacidad.',
    ctaDemo: 'Probar demo en vivo',
    ctaGithub: 'Ver en GitHub',
    firsts: [
      'Primer visor y editor DWG/DXF completamente sin backend en el navegador',
      'Primer toolkit open source de edición DXF/DWG en la web',
    ],
  },
  flagship: {
    eyebrow: 'Producto estrella',
    title: 'cad-viewer',
    lead: 'Un runtime CAD WebGL de nivel de producción: análisis DWG/DXF, geometría, visualización y edición — todo dentro de una pestaña del navegador moderno.',
    firstsLabel: 'Primeras en la industria',
    firsts: [
      'El primer visor y editor DWG/DXF que funciona completamente en el navegador con cero servicios backend.',
      'El primer toolkit open source para edición real de DXF/DWG en la web — no una vista previa de solo lectura.',
    ],
    ctaDemo: 'Abrir demo',
    ctaDocs: 'Documentación de la API',
  },
  features: {
    eyebrow: 'Funciones',
    title: 'Diseñado para privacidad, portabilidad y equipos de producto.',
    lead: 'Cada capacidad se diseña en torno a un solo principio: el trabajo CAD serio debe ser posible sin montar un servidor CAD.',
    items: [
      {
        id: 'privacy',
        title: 'Privacidad por arquitectura',
        body: 'Los planos se analizan y renderizan íntegramente en el cliente. Nada se sube, almacena en staging ni replica en un host remoto — la confidencialidad es una garantía estructural, no una casilla de política.',
        image: '/assets/features/privacy.svg',
        imageAlt: 'Candado conceptual: los planos permanecen en el dispositivo local',
      },
      {
        id: 'integration',
        title: 'Cero infraestructura, integración profunda',
        body: 'Integre CAD en su producto sin aprovisionar backends ni granjas de conversión. Una arquitectura modular de plugins le permite componer UI, exportación y agentes de IA como extensiones de primera clase.',
        image: '/assets/features/integration.svg',
        imageAlt: 'Aplicación host conectada al núcleo CAD y plugins',
      },
      {
        id: 'html-export',
        title: 'Exportación HTML offline en un solo archivo',
        body: 'Convierta un plano en vivo en un artefacto .html autocontenido con visor integrado — pan, zoom, extensiones, capas, medición de distancia e interfaz EN/ZH. Los destinatarios lo abren en cualquier navegador moderno: sin instalación, sin instancia de cad-viewer, sin servidor. En modo vista, el HTML offline usa aproximadamente un 83 % menos de memoria que AutoCAD 2020 con el mismo plano de muestra, manteniendo pan, zoom, capas y medición.',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG transformándose en un archivo HTML portable',
        actions: [
          {
            label: 'Abrir HTML de demo',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            variant: 'primary',
          },
          {
            label: 'Descargar HTML de demo',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            download: 'canteen.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'workflows',
        title: 'Offline y online, el mismo motor',
        body: 'Admite revisión air-gapped y flujos de producto conectados con un solo runtime. Edite localmente cuando no hay red; sincronice con su plataforma cuando vuelva — sin reescribir el núcleo CAD.',
        image: '/assets/features/workflows.svg',
        imageAlt: 'Bucle de flujo de trabajo offline y online',
      },
      {
        id: 'edit',
        title: 'Un editor de verdad — no un visor pasivo',
        body: 'Vaya más allá de pan y zoom. Seleccione, modifique y cree geometría con una superficie de comandos inspirada en AutoCAD — para que los productos web puedan ofrecer trabajo de dibujo real, no solo vistas previas de solo lectura.',
        image: '/assets/features/edit.svg',
        imageAlt: 'Puntos de agarre y operaciones de edición en un plano',
      },
    ],
  },
  plugins: {
    eyebrow: 'Ecosistema',
    title: 'Plugins oficiales',
    lead: 'Componga UI, exportación e IA en torno a un bus de plugins compartido — cargue solo lo que cada producto necesita.',
    imageAlt: 'Núcleo CAD con módulos plug-in de UI, agente, HTML, PDF y SVG',
    items: [
      { name: 'cad-simple-ui-plugin', role: 'Barra de herramientas y gestor de capas (DOM agnóstico al framework)' },
      { name: 'cad-agent-plugin', role: 'Agente CAD en lenguaje natural con herramientas de dibujo' },
      { name: 'cad-html-plugin', role: 'Exportar HTML offline autocontenido' },
      { name: 'cad-pdf-plugin', role: 'Exportación PDF vectorial e importación PDF a CAD' },
      { name: 'cad-svg-plugin', role: 'Exportación SVG vectorial' },
    ],
  },
  resources: {
    eyebrow: 'Recursos',
    title: 'Documentación, demo y comunidad',
    lead: 'Comience con el visor en vivo, luego profundice en la referencia de la API y la wiki del proyecto.',
    links: [
      {
        name: 'Demo en vivo',
        desc: 'Visor completo en el navegador',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'Documentación de la API',
        desc: 'Documentación versionada en Read the Docs',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: 'Documentación más reciente',
        desc: 'GitHub Pages (dev / latest)',
        href: 'https://mlightcad.github.io/cad-viewer/docs/',
      },
      {
        name: 'Wiki',
        desc: 'Guías y notas de arquitectura',
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
    tagline: 'Infraestructura CAD open source para la web.',
    rights: '© 2026 MLightCAD',
  },
  parser: parserEs,
}
