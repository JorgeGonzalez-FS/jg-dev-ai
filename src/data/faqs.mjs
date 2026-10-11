/* ============================================================
   Preguntas frecuentes. featured: true -> también aparece en el inicio.
   Regla: no prometer plazos, precios ni resultados universales.
   ============================================================ */

export const FAQ_GROUPS = [
  {
    id: "proceso",
    title: "Proceso de trabajo",
    items: [
      {
        q: "¿Cómo empieza un proyecto?",
        a: "Con el formulario de contacto: nos cuentas qué necesitas. Te respondemos por correo con preguntas o con una propuesta de alcance. No se construye nada antes de acordar qué incluye y qué no.",
        featured: true
      },
      {
        q: "¿Qué necesito aportar?",
        a: "Depende del proyecto. En una web, normalmente textos, imágenes, logotipo y los accesos que ya tengas (dominio, hosting). Si algo no está listo, lo hablamos en la propuesta."
      },
      {
        q: "¿Con quién voy a hablar?",
        a: "Con Jorge González, fundador de JG Dev AI, que también es quien desarrolla los proyectos."
      },
      {
        q: "¿Trabajan con clientes de otros países?",
        a: "Sí, el trabajo es a distancia. Empezamos atendiendo en español y queremos ampliar progresivamente a clientes de habla inglesa."
      }
    ]
  },
  {
    id: "plazos",
    title: "Plazos y cotizaciones",
    items: [
      {
        q: "¿Cuánto tarda un proyecto?",
        a: "Depende del alcance, de cuánto contenido esté listo y de cuántas rondas de revisión haya. No damos plazos universales: la propuesta incluye un calendario estimado para tu caso concreto.",
        featured: true
      },
      {
        q: "¿Cuánto cuesta?",
        a: "No publicamos precios fijos, porque el coste depende del alcance. Tras conocer tu caso enviamos una cotización por escrito con lo que incluye y lo que queda fuera. El presupuesto que indicas en el formulario es solo orientativo.",
        featured: true
      },
      {
        q: "¿Qué pasa si el alcance cambia durante el proyecto?",
        a: "Se revisa por escrito: se ajusta el alcance, el coste o el calendario antes de continuar con lo nuevo."
      }
    ]
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento",
    items: [
      {
        q: "¿Incluyen mantenimiento después de publicar?",
        a: "Puede acordarse como un servicio aparte. La propuesta indica qué incluye (por ejemplo, correcciones o pequeños cambios) y qué no."
      },
      {
        q: "¿Podré actualizar yo mismo los contenidos?",
        a: "Cuando es posible, entregamos documentación para que puedas hacer cambios sencillos sin depender de nadie. Lo planteamos desde el principio."
      }
    ]
  },
  {
    id: "integraciones",
    title: "Integraciones",
    items: [
      {
        q: "¿Se puede conectar con las herramientas que ya uso?",
        a: "Depende de si esa herramienta ofrece una forma segura de conectarse (una API, formularios o exportación de datos). Lo comprobamos antes de proponerlo.",
        featured: true
      },
      {
        q: "¿Y si una integración exige pagar un plan?",
        a: "Lo indicamos en la propuesta con su coste y, si existe, una alternativa gratuita o más económica."
      }
    ]
  },
  {
    id: "ia",
    title: "Inteligencia artificial",
    items: [
      {
        q: "¿Para qué usan inteligencia artificial?",
        a: "Como herramienta de apoyo durante el desarrollo (asistentes de código, borradores, pruebas) y, cuando tiene sentido, como parte de la solución, por ejemplo en un chatbot. Una persona revisa el resultado antes de entregarlo.",
        featured: true
      },
      {
        q: "¿Un chatbot puede equivocarse?",
        a: "Sí. Por eso limitamos su alcance a lo que se puede controlar, lo probamos antes de publicarlo y lo configuramos para derivar a una persona cuando no sabe responder."
      },
      {
        q: "¿Qué pasa con mis datos si se usa IA?",
        a: "Antes de usar información de tu negocio con un servicio de IA de terceros lo hablamos y lo dejamos por escrito. Los detalles dependen del servicio y del proveedor que se elija."
      }
    ]
  }
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
export const FEATURED_FAQS = ALL_FAQS.filter((f) => f.featured);
