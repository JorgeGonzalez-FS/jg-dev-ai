import { url, pageHeader, projectCard, ctaBand } from "../components.mjs";
import { PROJECTS } from "../data/projects.mjs";

export default () => {
  const body = `
${pageHeader({
  crumb: "Portafolio",
  eyebrow: "Portafolio",
  title: "Proyectos y demostraciones",
  text: "Lo que ves aquí se puede abrir y comprobar. Cada proyecto indica con claridad si es una demostración conceptual o un proyecto propio."
})}

<section class="section">
  <div class="container">
    <p class="notice-bar"><strong>Transparencia.</strong> Todavía no publicamos trabajos realizados para clientes. Las demostraciones conceptuales usan datos inventados y no representan a ninguna empresa real.</p>
    <div class="grid-2">
      ${PROJECTS.map((p) => projectCard(p)).join("")}
    </div>
  </div>
</section>

${ctaBand({
  title: "¿Tienes un proyecto en mente?",
  text: "Cuéntanos tu caso y valoramos juntos qué se puede construir y cómo.",
  primary: { label: "Solicitar propuesta", href: url("/contacto/") },
  secondary: { label: "Ver servicios", href: url("/servicios/") }
})}`;

  return {
    path: "/portafolio/",
    nav: "portafolio",
    title: "Portafolio de proyectos y demostraciones | JG Dev AI",
    description: "Demostraciones conceptuales y proyectos propios de JG Dev AI con su problema, solución, tecnologías, demo y código fuente. Sin casos de clientes inventados.",
    body
  };
};
