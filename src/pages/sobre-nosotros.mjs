import { url, esc, icon, pageHeader, ctaBand } from "../components.mjs";

export default (ctx) => {
  const { cfg } = ctx;
  const principles = [
    { icon: "code", title: "Calidad del software", text: "Código claro, probado y documentado, que otra persona pueda mantener." },
    { icon: "eye", title: "Comunicación transparente", text: "Alcance, estado y límites explicados por escrito y sin tecnicismos innecesarios." },
    { icon: "spark", title: "Innovación con criterio", text: "Probamos tecnologías nuevas, pero solo proponemos las que resuelven tu problema." },
    { icon: "target", title: "Orientación a resultados", text: "Cada decisión se evalúa por lo que aporta al objetivo de tu negocio." }
  ];

  const body = `
${pageHeader({
  crumb: "Sobre nosotros",
  eyebrow: "Sobre nosotros",
  title: "Una agencia tecnológica que prefiere demostrar antes que prometer",
  text: `JG Dev AI fue fundada por ${cfg.founder} para ayudar a negocios y profesionales a mejorar su presencia digital y a automatizar tareas con criterio.`
})}

<section class="section">
  <div class="container about-grid">
    <div class="prose">
      <h2>Quiénes somos</h2>
      <p>JG Dev AI es una agencia digital en sus primeras etapas. Desarrolla páginas web, automatizaciones sencillas y asistentes de alcance acotado, y está construyendo otras líneas de trabajo con inteligencia artificial.</p>
      <h2>Por qué lo contamos así</h2>
      <p>Preferimos que todo lo que ves en este sitio se pueda comprobar. Por eso no mostramos cifras, testimonios ni casos de clientes que todavía no existen: te enseñamos demostraciones identificadas como tales, con su código.</p>
      <h2>Cómo usamos la inteligencia artificial</h2>
      <p>Usamos asistentes de IA como herramienta durante el desarrollo y, cuando tiene sentido, dentro de la solución. Siempre hay una persona que revisa, prueba y responde por el resultado.</p>
    </div>
    <aside class="card founder-card" aria-label="Fundador">
      <div class="avatar" aria-hidden="true">JG</div>
      <h3>${esc(cfg.founder)}</h3>
      <p><strong>${esc(cfg.founderRole)}</strong></p>
      <p class="small">Dirige JG Dev AI y es la persona con la que hablarás durante todo el proyecto.</p>
      <div class="links">
        <a class="text-link" href="mailto:${esc(cfg.email)}">${icon("mail", "icon icon-sm")}${esc(cfg.email)}</a>
        <a class="text-link" href="${esc(cfg.github)}" target="_blank" rel="noopener noreferrer">${icon("github", "icon icon-sm")}GitHub<span class="sr-only"> (se abre en una pestaña nueva)</span></a>
      </div>
    </aside>
  </div>
</section>

<section class="section section--alt" aria-labelledby="principios-titulo">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Filosofía de trabajo</p><h2 id="principios-titulo">Cómo entendemos nuestro trabajo</h2></div>
    <div class="grid-4" data-reveal>
      ${principles.map((p) => `<div class="card principle"><span class="icon-tile">${icon(p.icon)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join("")}
    </div>
  </div>
</section>

${ctaBand({
  title: "Empecemos por conversar",
  text: "Cuéntanos qué necesitas. Si podemos ayudarte, te lo explicamos con claridad. Si no, también te lo diremos.",
  primary: { label: "Solicitar propuesta", href: url("/contacto/") },
  secondary: { label: "Ver portafolio", href: url("/portafolio/") }
})}`;

  return {
    path: "/sobre-nosotros/",
    nav: "sobre-nosotros",
    title: "Sobre JG Dev AI: agencia digital fundada por Jorge González",
    description: "Conoce a JG Dev AI, una agencia tecnológica fundada por Jorge González: calidad de software, comunicación transparente y uso responsable de la inteligencia artificial.",
    body
  };
};
