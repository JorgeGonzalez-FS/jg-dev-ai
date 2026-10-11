import { url, abs, icon, btn, sectionHead, serviceCard, projectCard, steps, faqList, ctaBand } from "../components.mjs";
import { SERVICES } from "../data/services.mjs";
import { PROJECTS } from "../data/projects.mjs";
import { FEATURED_FAQS } from "../data/faqs.mjs";

export default (ctx) => {
  const { cfg } = ctx;

  const body = `
<section class="hero">
  <div class="container hero-inner">
    <div>
      <p class="slogan">${cfg.tagline}</p>
      <h1>Desarrollo web, automatización e IA para negocios que quieren trabajar mejor</h1>
      <p class="lead">JG Dev AI crea páginas web, automatiza tareas repetitivas y desarrolla chatbots de alcance acotado. Empezamos por lo que más rápido aporta a tu negocio y lo explicamos sin rodeos.</p>
      <div class="hero-actions">
        ${btn("Solicitar propuesta", url("/contacto/"), { variant: "primary", icon: "arrow" })}
        ${btn("Explorar servicios", url("/servicios/"), { variant: "secondary" })}
      </div>
      <ul class="hero-points">
        <li>${icon("check")}Alcance claro antes de empezar</li>
        <li>${icon("check")}Comunicación directa con quien desarrolla</li>
        <li>${icon("check")}IA con supervisión humana</li>
      </ul>
    </div>
    <figure class="flow" aria-label="Ejemplo ilustrativo de un flujo automatizado sencillo">
      <figcaption class="flow-label">Ejemplo ilustrativo de un flujo sencillo</figcaption>
      <ol class="flow-steps">
        <li class="flow-step"><span class="icon-tile">${icon("globe")}</span><div><strong>Un formulario en tu web</strong><span>Un cliente deja su consulta</span></div></li>
        <li class="flow-step"><span class="icon-tile">${icon("bolt")}</span><div><strong>Una automatización sencilla</strong><span>Se registra y se ordena sin copiar datos a mano</span></div></li>
        <li class="flow-step"><span class="icon-tile">${icon("mail")}</span><div><strong>Aviso a tu equipo</strong><span>Una persona revisa y responde</span></div></li>
      </ol>
    </figure>
  </div>
</section>

<section class="section" aria-labelledby="servicios-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Servicios", title: "Lo que hacemos hoy", id: "servicios-titulo", text: "Empezamos por lo que podemos entregar con calidad: páginas web, automatizaciones sencillas y chatbots de alcance acotado." })}
    <div class="grid-3" data-reveal>
      ${SERVICES.filter((s) => s.featured).map(serviceCard).join("")}
    </div>
    <p class="more-link small">También evaluamos agentes de IA, automatización de ventas y atención, contenido asistido por IA y software a medida. Son líneas en desarrollo o bajo consulta. <a class="text-link" href="${url("/servicios/")}">Ver todos los servicios${icon("arrow", "icon icon-sm")}</a></p>
  </div>
</section>

<section class="section section--dark" id="proceso" aria-labelledby="proceso-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Proceso de trabajo", title: "Cómo trabajamos", id: "proceso-titulo", text: "Un proceso sencillo y por escrito, para que sepas qué esperar en cada etapa." })}
    <div data-reveal>
    ${steps([
      { title: "Conversación y diagnóstico", text: "Entendemos tu negocio, tu objetivo y qué se puede resolver con la solución más sencilla." },
      { title: "Propuesta con alcance", text: "Recibes por escrito qué se hará, qué no, qué necesitamos de ti y un calendario estimado." },
      { title: "Construcción con revisiones", text: "Trabajamos por entregas que puedes revisar, y ajustamos antes de continuar." },
      { title: "Publicación y seguimiento", text: "Publicamos, documentamos y acordamos cómo se mantendrá lo construido." }
    ])}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="proyectos-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Portafolio", title: "Proyectos seleccionados", id: "proyectos-titulo", text: "Demostraciones conceptuales que muestran cómo trabajamos. Todavía no publicamos trabajos para clientes." })}
    <div class="grid-3" data-reveal>
      ${PROJECTS.filter((p) => p.featured).map((p) => projectCard(p, { compact: true })).join("")}
    </div>
    <p class="more-link">${btn("Ver el portafolio completo", url("/portafolio/"), { variant: "secondary", icon: "arrow" })}</p>
  </div>
</section>

<section class="section section--alt" aria-labelledby="beneficios-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Beneficios", title: "Qué ganas al trabajar con nosotros", id: "beneficios-titulo" })}
    <div class="grid-4" data-reveal>
      <div class="benefit"><span class="icon-tile">${icon("target")}</span><h3>Alcance definido</h3><p>Cada propuesta indica qué incluye y qué no, para evitar sorpresas.</p></div>
      <div class="benefit"><span class="icon-tile">${icon("users")}</span><h3>Comunicación directa</h3><p>Hablas con la persona que desarrolla tu proyecto, sin intermediarios.</p></div>
      <div class="benefit"><span class="icon-tile">${icon("wrench")}</span><h3>Tecnología sencilla de mantener</h3><p>Elegimos herramientas que puedas entender y continuar, sin dependencias innecesarias.</p></div>
      <div class="benefit"><span class="icon-tile">${icon("shield")}</span><h3>IA con criterio</h3><p>La usamos donde aporta y siempre con revisión humana. No la vendemos como magia.</p></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="faq-titulo">
  <div class="container">
    ${sectionHead({ eyebrow: "Preguntas frecuentes", title: "Dudas habituales", id: "faq-titulo" })}
    ${faqList(FEATURED_FAQS)}
    <p class="more-link"><a class="text-link" href="${url("/preguntas-frecuentes/")}">Ver todas las preguntas${icon("arrow", "icon icon-sm")}</a></p>
  </div>
</section>

${ctaBand({
  title: "¿Hablamos de tu proyecto?",
  text: "Cuéntanos qué necesitas. Te respondemos por correo con preguntas o con una propuesta de alcance.",
  primary: { label: "Solicitar propuesta", href: url("/contacto/") },
  secondary: { label: "Ver servicios", href: url("/servicios/") }
})}`;

  return {
    path: "/",
    nav: "",
    title: "JG Dev AI | Desarrollo web, automatización y chatbots con IA",
    description: "Agencia digital que crea páginas web, automatiza tareas repetitivas y desarrolla chatbots de alcance acotado para negocios y profesionales. Solicita una propuesta.",
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: cfg.name,
        url: ctx.siteUrl + "/",
        logo: abs("/assets/img/icon-512.png"),
        slogan: cfg.tagline,
        email: cfg.email,
        founder: { "@type": "Person", name: cfg.founder },
        sameAs: [cfg.github]
      }
    ]
  };
};
