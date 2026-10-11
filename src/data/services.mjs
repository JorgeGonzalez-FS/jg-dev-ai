/* ============================================================
   Servicios de JG Dev AI
   Estados:
     available   -> se puede contratar hoy
     consult     -> solo bajo consulta previa; se evalúa la viabilidad
     development -> en desarrollo; NO se ofrece como servicio listo
   REGLA: no cambies un servicio a "available" hasta que exista una
   implementación funcional que puedas demostrar.
   ============================================================ */

export const STATUS = {
  available: { label: "Disponible", tone: "ok" },
  consult: { label: "Bajo consulta", tone: "dev" },
  development: { label: "En desarrollo", tone: "dev" }
};

export const CATEGORIES = [
  { id: "web", title: "Presencia web y software", text: "Lo que tu negocio muestra y usa a diario en internet." },
  { id: "automatizacion", title: "Automatización y atención", text: "Menos tareas repetitivas y respuestas más ordenadas." },
  { id: "ia", title: "IA aplicada", text: "Líneas en desarrollo que evaluamos caso por caso." }
];

export const SERVICES = [
  {
    id: "web",
    category: "web",
    title: "Páginas web y landing pages",
    short: "Sitios claros, rápidos y adaptables a móvil que llevan al visitante a contactarte.",
    icon: "globe",
    status: "available",
    featured: true,
    problem:
      "Tu negocio no aparece en internet, la página actual es lenta o confusa, o no hay una forma clara de que un cliente te contacte.",
    solution:
      "Diseñamos y construimos una página clara, rápida y adaptable, con un camino evidente hacia el contacto o la compra.",
    features: [
      "Diseño adaptable a móvil, tableta y ordenador",
      "Estructura de contenidos pensada para tu oferta",
      "Formulario de contacto con validación",
      "Preparación SEO básica: títulos, descripciones, estructura y sitemap",
      "Accesibilidad básica: navegación por teclado y contraste adecuado",
      "Publicación en alojamiento gratuito o en el que prefieras"
    ],
    benefits: [
      "Una presencia profesional que puedes enseñar a tus clientes",
      "Una página que carga con rapidez también en móvil",
      "Una base sencilla de mantener y ampliar"
    ],
    examples: [
      "Página de presentación para un negocio local",
      "Landing page para un servicio concreto o una campaña",
      "Portafolio de un profesional independiente"
    ],
    deliverables: [
      "Sitio publicado y funcionando",
      "Código fuente organizado",
      "Guía breve para actualizar contenidos",
      "Lista de pendientes si falta dominio, formulario o analítica"
    ]
  },
  {
    id: "automatizacion",
    category: "automatizacion",
    title: "Automatización de procesos",
    short: "Automatizaciones sencillas para tareas repetitivas entre tus herramientas habituales.",
    icon: "bolt",
    status: "available",
    featured: true,
    problem:
      "Tareas repetitivas, como copiar datos entre herramientas, enviar los mismos correos o avisar al equipo, consumen horas y provocan errores.",
    solution:
      "Identificamos una tarea concreta y la automatizamos con herramientas conocidas (formularios, hojas de cálculo, correo, calendarios) o con scripts a medida.",
    features: [
      "Diagnóstico del proceso actual y definición de qué automatizar",
      "Conexión entre formularios, hojas de cálculo, correo y calendarios",
      "Avisos y notificaciones automáticas",
      "Revisión manual prevista para cuando algo falla",
      "Documentación de cómo funciona y de sus límites"
    ],
    benefits: [
      "Menos trabajo manual en tareas repetitivas",
      "Menos errores de copia entre herramientas",
      "Procesos documentados que cualquiera del equipo puede entender"
    ],
    examples: [
      "Guardar cada solicitud de un formulario en una hoja y avisar por correo",
      "Enviar recordatorios automáticos de citas",
      "Generar un resumen semanal a partir de una hoja de datos"
    ],
    deliverables: [
      "Automatización funcionando",
      "Documento con el flujo, sus límites y qué hacer si falla",
      "Instrucciones para pausarla o modificarla",
      "Una revisión de ajustes posterior, si se acuerda en la propuesta"
    ]
  },
  {
    id: "chatbots",
    category: "automatizacion",
    title: "Chatbots y asistentes virtuales",
    short: "Asistentes de alcance acotado que responden dudas frecuentes y derivan a una persona.",
    icon: "chat",
    status: "available",
    featured: true,
    problem:
      "Tu equipo responde una y otra vez las mismas preguntas, o los visitantes no encuentran la información clave.",
    solution:
      "Un asistente de alcance limitado que responde con contenido que tú aprobaste y deriva a una persona cuando la consulta excede lo que puede resolver.",
    features: [
      "Respuestas basadas en información definida contigo: preguntas frecuentes, servicios, horarios",
      "Derivación a correo o formulario cuando no puede ayudar",
      "Límites claros sobre lo que no responde",
      "Pruebas con conversaciones reales antes de publicarlo",
      "Reglas simples, sin IA generativa, cuando eso es suficiente"
    ],
    benefits: [
      "Respuestas inmediatas a las dudas más comunes",
      "Menos interrupciones por preguntas repetidas",
      "Control sobre el contenido que utiliza el asistente"
    ],
    examples: [
      "Asistente de preguntas frecuentes en la web de un negocio",
      "Asistente que orienta al visitante hacia el servicio adecuado y recoge sus datos de contacto"
    ],
    deliverables: [
      "Asistente integrado en tu web o en el canal acordado",
      "Base de contenido que puedes editar",
      "Guía de uso y de límites",
      "Registro de las pruebas realizadas"
    ],
    note:
      "Un chatbot puede equivocarse y no sustituye la atención humana. Por eso se limita su alcance y se prueba antes de publicarlo. Si usa un modelo de IA de terceros, puede haber un coste por uso, que se detalla en la propuesta."
  },
  {
    id: "agentes",
    category: "ia",
    title: "Agentes de IA con herramientas e integraciones",
    short: "Línea en desarrollo: se evalúa cada caso antes de proponer nada.",
    icon: "spark",
    status: "development",
    problem:
      "Hay procesos que combinan varios pasos y herramientas (consultar datos, redactar, actualizar un sistema) y hoy dependen por completo de una persona.",
    solution:
      "Estamos desarrollando esta línea. Cada caso se evalúa para decidir si un agente es la solución adecuada y qué supervisión humana necesita. Si encaja, se plantea como un proyecto piloto acotado.",
    features: [
      "Qué herramientas podría usar y con qué permisos",
      "Qué pasos requerirían aprobación humana",
      "Registro de lo que hizo en cada ejecución",
      "Límites y mecanismos para detenerlo"
    ],
    benefits: [
      "Si el caso es viable: menos pasos manuales en un proceso acotado",
      "Decisiones apoyadas en un análisis previo de riesgos"
    ],
    examples: [
      "Preparar un borrador de respuesta a partir de datos internos para que una persona lo revise"
    ],
    deliverables: [
      "Antes de construir: documento de viabilidad, alcance y riesgos",
      "Si se continúa: piloto acotado con criterios de éxito acordados"
    ],
    note: "Todavía no ofrecemos esto como un servicio listo para contratar."
  },
  {
    id: "ventas-atencion",
    category: "automatizacion",
    title: "Automatización de ventas y atención al cliente",
    short: "Ordenar el primer contacto y el seguimiento. Lo sencillo ya se puede hacer; lo avanzado se evalúa.",
    icon: "headset",
    status: "development",
    problem:
      "Consultas y oportunidades que se pierden por falta de seguimiento o por responder tarde.",
    solution:
      "Combinar automatizaciones y asistentes para ordenar el primer contacto y el seguimiento. Las partes sencillas (formularios, avisos, hojas de seguimiento) se contratan hoy como Automatización de procesos. Lo más avanzado se evalúa caso por caso.",
    features: [
      "Registro ordenado de cada consulta recibida",
      "Avisos al equipo cuando entra una oportunidad",
      "Recordatorios de seguimiento",
      "Integración con asistentes, solo si el caso lo justifica"
    ],
    benefits: [
      "Un seguimiento más ordenado de las consultas",
      "Menos oportunidades olvidadas por falta de recordatorio"
    ],
    examples: [
      "Hoja de seguimiento que se rellena sola con las solicitudes de la web",
      "Aviso por correo cuando una consulta lleva días sin respuesta"
    ],
    deliverables: [
      "Definición del proceso de ventas o atención que se quiere ordenar",
      "Propuesta con lo que se puede automatizar hoy y lo que queda para una segunda fase"
    ],
    note: "La línea completa está en desarrollo; no la ofrecemos como servicio cerrado."
  },
  {
    id: "marketing-ia",
    category: "ia",
    title: "Marketing y contenido asistidos por IA",
    short: "Línea en desarrollo: borradores con IA y revisión humana antes de publicar.",
    icon: "pen",
    status: "development",
    problem:
      "Producir contenido de forma constante lleva tiempo, y escribir cada pieza desde cero es lento.",
    solution:
      "Estamos desarrollando flujos en los que la IA ayuda a generar borradores y variaciones, y una persona revisa y aprueba todo antes de publicarlo.",
    features: [
      "Instrucciones adaptadas al tono de tu marca",
      "Revisión humana obligatoria antes de publicar",
      "Plantillas reutilizables para tipos de contenido recurrentes"
    ],
    benefits: [
      "Un punto de partida más rápido para borradores",
      "Contenido revisado por una persona, no publicado de forma automática"
    ],
    examples: [
      "Borradores de publicaciones para redes a partir de una idea o un artículo",
      "Variaciones de un mismo texto para distintos canales"
    ],
    deliverables: [
      "Antes de construir: acuerdo sobre tono, límites y proceso de revisión"
    ],
    note: "Todavía no ofrecemos esto como un servicio listo para contratar."
  },
  {
    id: "software",
    category: "web",
    title: "Aplicaciones y software a medida",
    short: "Herramientas pequeñas y bien acotadas, tras evaluar su viabilidad.",
    icon: "layers",
    status: "consult",
    problem:
      "Ninguna herramienta del mercado encaja con tu forma de trabajar, o dependes de hojas de cálculo que ya no dan abasto.",
    solution:
      "Evaluamos si una aplicación a medida es la mejor opción. Si lo es, la planteamos como un proyecto pequeño y bien acotado, con entregas que puedas revisar.",
    features: [
      "Análisis del problema y alternativas existentes antes de programar",
      "Alcance acordado por escrito, con lo que incluye y lo que no",
      "Desarrollo con tecnologías sencillas de mantener",
      "Entregas parciales para revisar el avance"
    ],
    benefits: [
      "Una herramienta ajustada a tu forma de trabajar",
      "Un alcance entendido por ambas partes desde el principio"
    ],
    examples: [
      "Panel interno para consultar y filtrar datos propios",
      "Herramienta sencilla para gestionar solicitudes o pedidos"
    ],
    deliverables: [
      "Documento de alcance y viabilidad",
      "Aplicación funcionando, si se continúa",
      "Código fuente y documentación"
    ],
    note: "Se acepta solo tras evaluar la viabilidad y el alcance de cada proyecto."
  }
];

export const getService = (id) => SERVICES.find((s) => s.id === id);
