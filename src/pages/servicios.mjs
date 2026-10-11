import { url, esc, icon, btn, pageHeader, serviceDetail, ctaBand } from "../components.mjs";
import { SERVICES, CATEGORIES } from "../data/services.mjs";

export default () => {
  const chips = SERVICES.map((s) => `<a href="#${s.id}">${esc(s.title)}</a>`).join("");

  const blocks = CATEGORIES.map((cat) => {
    const items = SERVICES.filter((s) => s.category === cat.id);
    return `<section class="category-block" aria-labelledby="cat-${cat.id}">
      <header><h2 id="cat-${cat.id}">${esc(cat.title)}</h2><p>${esc(cat.text)}</p></header>
      ${items.map(serviceDetail).join("")}
    </section>`;
  }).join("");

  const body = `
${pageHeader({
  crumb: "Servicios",
  eyebrow: "Servicios",
  title: "Servicios con un alcance que se entiende",
  text: "Empezamos por lo que podemos entregar con calidad. Lo que todavía estamos desarrollando lo decimos con claridad."
})}

<section class="section">
  <div class="container">
    <p class="notice-bar"><strong>Cómo leer los estados.</strong> «Disponible» se puede contratar hoy. «Bajo consulta» se acepta tras evaluar la viabilidad de cada proyecto. «En desarrollo» todavía no es un servicio cerrado: lo evaluamos contigo antes de proponer nada.</p>
    <nav class="anchor-nav" aria-label="Ir a un servicio">${chips}</nav>
    ${blocks}
  </div>
</section>

${ctaBand({
  title: "¿No sabes cuál encaja con tu caso?",
  text: "Describe tu situación y te decimos con honestidad qué se puede hacer, qué no y por dónde empezar.",
  primary: { label: "Solicitar propuesta", href: url("/contacto/") },
  secondary: { label: "Ver preguntas frecuentes", href: url("/preguntas-frecuentes/") }
})}`;

  return {
    path: "/servicios/",
    nav: "servicios",
    title: "Servicios de desarrollo web, automatización y chatbots | JG Dev AI",
    description: "Páginas web, automatización de procesos y chatbots de alcance acotado. Conoce qué incluye cada servicio, qué estamos desarrollando y cómo pedir una cotización.",
    body
  };
};
