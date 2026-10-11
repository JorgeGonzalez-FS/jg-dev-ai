/* ============================================================
   Proyectos del portafolio
   kind:
     "concept"  -> demostración conceptual (NUNCA trabajo para un cliente real)
     "own"      -> proyecto propio
     "client"   -> trabajo para un cliente real (solo cuando exista y haya permiso)
   Para añadir un proyecto: copia un bloque, cambia los datos y guarda su captura en
   public/assets/img/projects/. Los campos vacíos no se muestran.
   ============================================================ */

export const KINDS = {
  concept: "Demostración conceptual",
  own: "Proyecto propio",
  client: "Proyecto para cliente"
};

const DEMOS = "https://jorgegonzalez-fs.github.io/jg-dev-portfolio";
const CODE = "https://github.com/JorgeGonzalez-FS/jg-dev-portfolio/tree/main";

export const PROJECTS = [
  {
    id: "landing-page-pro",
    title: "Landing Page Pro",
    kind: "concept",
    category: "Web",
    featured: true,
    summary: "Landing page de ejemplo para un negocio ficticio, con proceso, planes y formulario.",
    problem:
      "Muchas páginas de negocios locales son difíciles de leer en el móvil y no dejan claro cómo contactar.",
    solution:
      "Una landing con propuesta de valor, pasos de trabajo, planes, preguntas frecuentes y un formulario con validación.",
    features: [
      "Diseño adaptable y menú móvil accesible",
      "Formulario con validación en el navegador (en la demo no envía mensajes)",
      "Preguntas frecuentes que funcionan sin JavaScript",
      "Cabecera que cambia al desplazarse"
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/assets/img/projects/landing-page-pro.webp",
    imageAlt: "Captura de la portada de Landing Page Pro: montañas y el titular «Tu negocio en la web».",
    demo: `${DEMOS}/landing-page-pro/`,
    code: `${CODE}/landing-page-pro`
  },
  {
    id: "business-dashboard",
    title: "Business Dashboard",
    kind: "concept",
    category: "Aplicación",
    featured: true,
    summary: "Panel administrativo de ejemplo con indicadores, gráficos y tabla de pedidos.",
    problem:
      "Los datos de ventas repartidos en varias hojas dificultan ver qué está pasando en el negocio.",
    solution:
      "Un panel que resume ingresos, pedidos y clientes, y permite buscar, filtrar y exportar los pedidos.",
    features: [
      "Indicadores calculados según el periodo elegido",
      "Gráficos de barras y de dona dibujados con SVG, sin librerías",
      "Tabla con búsqueda, filtro por estado y orden por columna",
      "Exportación a CSV",
      "Todos los datos son inventados"
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/assets/img/projects/business-dashboard.webp",
    imageAlt: "Captura del panel Nexo: indicadores, gráfico de barras de ingresos y gráfico de dona por categoría.",
    demo: `${DEMOS}/business-dashboard/`,
    code: `${CODE}/business-dashboard`
  },
  {
    id: "tienda-online",
    title: "Tienda Online AURORA",
    kind: "concept",
    category: "Web",
    featured: true,
    summary: "Tienda de ejemplo de productos de audio con carrito y compra simulada.",
    problem:
      "Una tienda pequeña necesita que el catálogo sea fácil de recorrer y que el carrito no se pierda al recargar.",
    solution:
      "Un catálogo con filtros, búsqueda y orden, y un carrito que recuerda tu selección.",
    features: [
      "Filtro por categoría, búsqueda y orden por precio o nombre",
      "Carrito que se conserva al recargar la página",
      "Panel del carrito accesible con teclado",
      "Compra simulada: no hay pagos ni pedidos reales"
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/assets/img/projects/tienda-online.webp",
    imageAlt: "Captura de la tienda AURORA: titular «Sonido que te envuelve» y un auricular ilustrado.",
    demo: `${DEMOS}/tienda-online/`,
    code: `${CODE}/tienda-online`
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    kind: "own",
    category: "Aplicación",
    featured: false,
    summary: "Gestor de tareas desarrollado con HTML, CSS y JavaScript.",
    problem: "",
    solution: "",
    features: [],
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/assets/img/projects/taskflow.svg",
    imageAlt: "Ilustración genérica del proyecto TaskFlow.",
    demo: "https://jorgegonzalez-fs.github.io/taskflow-jg-dev/",
    code: "https://github.com/JorgeGonzalez-FS/taskflow-jg-dev"
  }
];
