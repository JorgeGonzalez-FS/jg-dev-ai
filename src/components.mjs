/* ============================================================
   Componentes reutilizables de JG Dev AI
   Cada función devuelve HTML como texto. El script build.mjs
   llama a init() una vez con el contexto (URLs y configuración).
   ============================================================ */

import { STATUS, getService } from "./data/services.mjs";
import { KINDS } from "./data/projects.mjs";

let C = null;
export const init = (ctx) => { C = ctx; };

/* ---------- Utilidades ---------- */
export const url = (path) => C.base + path;          /* enlace interno, con prefijo si hay subcarpeta */
export const abs = (path) => C.siteUrl + path;       /* URL absoluta (canonical, Open Graph, sitemap) */
export const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

/* ---------- Iconos (trazo, estilo consistente) ---------- */
const ICONS = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  external: '<path d="M7 17 17 7M8 7h9v9"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6M16 4.7a3.5 3.5 0 0 1 0 6.6M18.5 14.4c1.8.8 3 2.7 3 5.6"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-4-4 8-8z"/><path d="M9 17 4 22"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'
};
const GITHUB_PATH =
  "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z";

export function icon(name, cls = "icon") {
  if (name === "github") {
    return `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${GITHUB_PATH}"/></svg>`;
  }
  return `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

/* ---------- Logotipo: monograma JG ---------- */
export function logoMark(size = 36) {
  return `<svg class="logo-mark" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true" focusable="false"><defs><linearGradient id="jg-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#2563EB"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#jg-grad)"/><g fill="none" stroke="#0B1120" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 13v16a6 6 0 0 1-6 6"/><path d="M38 19a8.5 8.5 0 1 0 .8 6.5H31"/></g></svg>`;
}

/* ---------- Piezas pequeñas ---------- */
export function btn(label, href, { variant = "primary", icon: ic = "", external = false, size = "" } = {}) {
  const cls = `btn btn-${variant}${size ? ` btn-${size}` : ""}`;
  const ext = external ? ' target="_blank" rel="noopener noreferrer"' : "";
  const trailing = ic ? icon(ic, "icon icon-sm") : "";
  return `<a class="${cls}" href="${esc(href)}"${ext}>${esc(label)}${trailing}</a>`;
}

export function badge(text, tone = "neutral") {
  return `<span class="badge badge--${tone}">${esc(text)}</span>`;
}

export function sectionHead({ eyebrow = "", title, text = "", center = false, id = "" }) {
  return `<div class="section-head${center ? " is-center" : ""}">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}<h2${id ? ` id="${id}"` : ""}>${esc(title)}</h2>${text ? `<p class="lead">${esc(text)}</p>` : ""}</div>`;
}

export function pageHeader({ eyebrow = "", title, text = "", crumb = "" }) {
  return `<section class="page-header"><div class="container">${crumb ? `<p class="crumb"><a href="${url("/")}">Inicio</a><span aria-hidden="true">/</span><span>${esc(crumb)}</span></p>` : ""}${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}<h1>${esc(title)}</h1>${text ? `<p class="lead">${esc(text)}</p>` : ""}</div></section>`;
}

export function steps(items) {
  return `<ol class="steps">${items
    .map((s, i) => `<li class="step"><span class="step-n" aria-hidden="true">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
    .join("")}</ol>`;
}

export function checkList(items) {
  return `<ul class="check-list">${items.map((i) => `<li>${icon("check", "icon icon-check")}<span>${esc(i)}</span></li>`).join("")}</ul>`;
}

export function ctaBand({ title, text, primary, secondary }) {
  return `<section class="cta-band"><div class="container cta-inner"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div><div class="cta-actions">${primary ? btn(primary.label, primary.href, { variant: "primary", icon: "arrow" }) : ""}${secondary ? btn(secondary.label, secondary.href, { variant: "secondary" }) : ""}</div></div></section>`;
}

/* ---------- Servicios ---------- */
export function serviceCard(s) {
  const st = STATUS[s.status];
  return `<article class="card service-card"><div class="card-top"><span class="icon-tile">${icon(s.icon)}</span>${badge(st.label, st.tone)}</div><h3>${esc(s.title)}</h3><p>${esc(s.short)}</p><a class="text-link" href="${url("/servicios/")}#${s.id}">Ver detalle${icon("arrow", "icon icon-sm")}<span class="sr-only"> de ${esc(s.title)}</span></a></article>`;
}

export function serviceDetail(s) {
  const st = STATUS[s.status];
  const ok = s.status === "available";
  const cta = ok ? "Solicitar una cotización" : "Consultar si es viable";
  return `<article class="service-detail" id="${s.id}" aria-labelledby="${s.id}-title">
  <div class="service-main">
    <div class="service-head"><span class="icon-tile">${icon(s.icon)}</span><div><h3 id="${s.id}-title">${esc(s.title)}</h3>${badge(st.label, st.tone)}</div></div>
    <h4>El problema</h4><p>${esc(s.problem)}</p>
    <h4>La solución</h4><p>${esc(s.solution)}</p>
    ${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}
    <div class="service-cta">${btn(cta, `${url("/contacto/")}?servicio=${s.id}#formulario`, { variant: "primary", icon: "arrow" })}</div>
  </div>
  <div class="service-lists">
    <div class="list-box"><h4>${ok ? "Funcionalidades" : "Qué se evaluaría"}</h4>${checkList(s.features)}</div>
    <div class="list-box"><h4>${ok ? "Beneficios realistas" : "Beneficios posibles"}</h4>${checkList(s.benefits)}</div>
    <div class="list-box"><h4>${ok ? "Ejemplos de aplicación" : "Ejemplos posibles"}</h4>${checkList(s.examples)}</div>
    <div class="list-box"><h4>${ok ? "Entregables" : "Entregables previstos"}</h4>${checkList(s.deliverables)}</div>
  </div>
</article>`;
}

/* ---------- Proyectos ---------- */
export function projectCard(p, { compact = false } = {}) {
  const link = (href, label, ic) =>
    href ? `<a class="text-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}${icon(ic, "icon icon-sm")}<span class="sr-only"> de ${esc(p.title)} (se abre en una pestaña nueva)</span></a>` : "";
  const detail = compact
    ? ""
    : `${p.problem || p.solution ? `<dl class="ps">${p.problem ? `<div><dt>Problema</dt><dd>${esc(p.problem)}</dd></div>` : ""}${p.solution ? `<div><dt>Solución</dt><dd>${esc(p.solution)}</dd></div>` : ""}</dl>` : ""}${p.features.length ? `<h4>Funcionalidades</h4>${checkList(p.features)}` : ""}`;
  return `<article class="card project-card" id="${p.id}">
  <div class="project-media"><img src="${url(p.image)}" width="800" height="500" loading="lazy" decoding="async" alt="${esc(p.imageAlt)}"></div>
  <div class="project-body">
    <div class="meta">${badge(KINDS[p.kind], p.kind === "client" ? "ok" : "dev")}<span class="category">${esc(p.category)}</span></div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.summary)}</p>
    ${detail}
    <ul class="chips" aria-label="Tecnologías utilizadas">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="project-links">${link(p.demo, "Ver demostración", "external")}${link(p.code, "Ver código", "code")}</div>
  </div>
</article>`;
}

/* ---------- Preguntas frecuentes ---------- */
export function faqList(items) {
  return `<div class="faq-list">${items.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><div class="faq-body"><p>${esc(f.a)}</p></div></details>`).join("")}</div>`;
}

/* ---------- Navegación y pie ---------- */
const NAV = [
  { key: "servicios", label: "Servicios", path: "/servicios/" },
  { key: "portafolio", label: "Portafolio", path: "/portafolio/" },
  { key: "sobre-nosotros", label: "Sobre nosotros", path: "/sobre-nosotros/" },
  { key: "preguntas-frecuentes", label: "Preguntas frecuentes", path: "/preguntas-frecuentes/" }
];

function navLinks(current) {
  return `<ul>${NAV.map((n) => `<li><a href="${url(n.path)}"${n.key === current ? ' aria-current="page"' : ""}>${esc(n.label)}</a></li>`).join("")}</ul>`;
}

function header(current) {
  const cta = `<a class="btn btn-primary btn-sm" href="${url("/contacto/")}"${current === "contacto" ? ' aria-current="page"' : ""}>Solicitar propuesta</a>`;
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${url("/")}" aria-label="JG Dev AI, ir al inicio">${logoMark(36)}<span class="brand-name">JG Dev <span>AI</span></span></a>
    <nav class="nav-desktop" aria-label="Principal">${navLinks(current)}${cta}</nav>
    <details class="nav-mobile">
      <summary aria-label="Abrir menú de navegación"><span class="nav-open">${icon("menu")}</span><span class="nav-close">${icon("close")}</span></summary>
      <nav aria-label="Principal (móvil)">${navLinks(current)}${cta}</nav>
    </details>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="brand" href="${url("/")}" aria-label="JG Dev AI, ir al inicio">${logoMark(34)}<span class="brand-name">JG Dev <span>AI</span></span></a>
      <p>${esc(C.cfg.tagline)}</p>
      <p class="small">Agencia digital fundada por ${esc(C.cfg.founder)}.</p>
    </div>
    <nav aria-label="Servicios"><h2 class="footer-title">Servicios</h2><ul>
      <li><a href="${url("/servicios/")}#web">Páginas web y landing pages</a></li>
      <li><a href="${url("/servicios/")}#automatizacion">Automatización de procesos</a></li>
      <li><a href="${url("/servicios/")}#chatbots">Chatbots y asistentes</a></li>
      <li><a href="${url("/servicios/")}">Todos los servicios</a></li>
    </ul></nav>
    <nav aria-label="Agencia"><h2 class="footer-title">Agencia</h2><ul>
      <li><a href="${url("/portafolio/")}">Portafolio</a></li>
      <li><a href="${url("/sobre-nosotros/")}">Sobre nosotros</a></li>
      <li><a href="${url("/preguntas-frecuentes/")}">Preguntas frecuentes</a></li>
      <li><a href="${url("/contacto/")}">Contacto</a></li>
    </ul></nav>
    <div><h2 class="footer-title">Contacto y legal</h2><ul>
      <li><a href="mailto:${esc(C.cfg.email)}">${esc(C.cfg.email)}</a></li>
      <li><a href="${esc(C.cfg.github)}" target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only"> (se abre en una pestaña nueva)</span></a></li>
      <li><a href="${url("/privacidad/")}">Aviso de privacidad</a></li>
      <li><a href="${url("/terminos/")}">Términos del servicio</a></li>
    </ul></div>
  </div>
  <div class="container footer-bottom"><p>© ${year} JG Dev AI. Todos los derechos reservados.</p></div>
</footer>`;
}

/* ---------- Plantilla de página ---------- */
export function layout(page) {
  const cfg = C.cfg;
  const fullTitle = page.title;
  const canonical = abs(page.path === "/404.html" ? "/" : page.path);
  const ogImage = abs("/assets/img/og-image.png");
  const robots = page.noindex ? "noindex,follow" : "index,follow";
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data:",
    `connect-src 'self' ${new URL(cfg.form.endpoint).origin}`,
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'"
  ].join("; ");
  const scripts = ["main.js", ...(page.scripts || [])]
    .map((s) => `<script defer src="${url(`/assets/js/${s}`)}?v=${C.build}"></script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="${cfg.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="${cfg.themeColor}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="${csp}">
${page.noindex ? "" : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.name)}">
<meta property="og:locale" content="${cfg.locale}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="JG Dev AI. ${esc(cfg.tagline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="${url("/assets/img/favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${url("/assets/img/apple-touch-icon.png")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${url("/assets/css/styles.css")}?v=${C.build}">
${scripts}
${(page.jsonLd || []).map(jsonLd).join("\n")}
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
${header(page.nav || "")}
<main id="contenido" tabindex="-1">
${page.body}
</main>
${footer()}
</body>
</html>
`;
}

export { getService };
