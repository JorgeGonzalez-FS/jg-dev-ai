import { url, esc, icon, pageHeader, faqList, ctaBand } from "../components.mjs";
import { FAQ_GROUPS, ALL_FAQS } from "../data/faqs.mjs";

export default () => {
  const groups = FAQ_GROUPS.map((g) => `<section class="faq-group" aria-labelledby="g-${g.id}"><h2 id="g-${g.id}">${esc(g.title)}</h2>${faqList(g.items)}</section>`).join("");

  const body = `
${pageHeader({
  crumb: "Preguntas frecuentes",
  eyebrow: "Preguntas frecuentes",
  title: "Respuestas claras antes de empezar",
  text: "Sobre el proceso, los plazos, las cotizaciones, el mantenimiento, las integraciones y el uso de inteligencia artificial."
})}

<section class="section">
  <div class="container">${groups}</div>
</section>

${ctaBand({
  title: "¿Tu duda no está aquí?",
  text: "Escríbenos y te respondemos por correo.",
  primary: { label: "Contactar", href: url("/contacto/") }
})}`;

  return {
    path: "/preguntas-frecuentes/",
    nav: "preguntas-frecuentes",
    title: "Preguntas frecuentes sobre proyectos web, automatización e IA | JG Dev AI",
    description: "Respuestas sobre el proceso de trabajo, plazos, cotizaciones, mantenimiento, integraciones y uso responsable de la inteligencia artificial en proyectos de JG Dev AI.",
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ALL_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
      }
    ]
  };
};
