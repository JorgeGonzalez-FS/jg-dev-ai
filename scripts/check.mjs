/* Comprobaciones automáticas sobre /dist (sin dependencias).
   Uso: npm test   (o: node scripts/check.mjs tras construir)
   Revisa: metadatos SEO, un solo h1, alt en imágenes, enlaces internos y anclas,
   rel en enlaces externos, sitemap, robots y tamaño de los recursos.
   NO sustituye a una auditoría con Lighthouse ni a una prueba manual con lector de pantalla. */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const all = await walk(dist);
const htmlFiles = all.filter((f) => f.endsWith(".html"));
const rel = (f) => path.relative(dist, f) || ".";

const exists = async (p) => stat(p).then(() => true, () => false);
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

/* Lee el siteUrl del canonical de la portada para conocer el prefijo de rutas */
const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");
const siteUrl = (indexHtml.match(/<link rel="canonical" href="([^"]+)"/) || [])[1].replace(/\/$/, "");
const base = new URL(siteUrl).pathname.replace(/\/$/, "");

const pageIds = new Map();     /* ruta de archivo -> Set de ids */
const pageData = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  pageData.set(file, html);
  pageIds.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const html = pageData.get(file);
  const name = rel(file);
  const is404 = name === "404.html";

  /* --- Metadatos --- */
  if (!/<html lang="[a-z-]+"/.test(html)) err(name, "falta lang en <html>");
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) err(name, "falta <title>");
  else {
    if (title.length > 75) warn(name, `título largo (${title.length} caracteres)`);
    if (titles.has(title)) err(name, `título duplicado con ${titles.get(title)}`);
    titles.set(title, name);
  }
  if (!desc) err(name, "falta meta description");
  else {
    if (desc.length < 70 || desc.length > 170) warn(name, `meta description de ${desc.length} caracteres (ideal 70-160)`);
    if (descriptions.has(desc)) err(name, `description duplicada con ${descriptions.get(desc)}`);
    descriptions.set(desc, name);
  }
  if (!is404) {
    for (const p of ['rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'property="og:url"', 'name="twitter:card"']) {
      if (!html.includes(p)) err(name, `falta ${p}`);
    }
  } else if (!html.includes("noindex")) err(name, "la 404 debería llevar noindex");

  /* --- Estructura --- */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) err(name, `debe haber un único <h1> (hay ${h1s})`);
  if (!html.includes('id="contenido"')) err(name, "falta el destino del enlace «Saltar al contenido»");
  if (!html.includes('<a class="skip-link"')) err(name, "falta el enlace «Saltar al contenido»");

  /* --- Imágenes --- */
  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (attr(tag, "alt") === undefined) err(name, `imagen sin alt: ${tag.slice(0, 80)}`);
    if (!attr(tag, "width") || !attr(tag, "height")) warn(name, "imagen sin width/height (provoca saltos de diseño)");
  }

  /* --- Botones y formularios --- */
  for (const tag of html.match(/<button\b[^>]*>/g) || []) {
    if (!/\stype="/.test(tag)) err(name, `<button> sin type: ${tag}`);
  }
  for (const tag of html.match(/<(input|select|textarea)\b[^>]*>/g) || []) {
    const type = attr(tag, "type");
    if (type === "hidden") continue;
    const id = attr(tag, "id");
    if (!id) { err(name, `campo sin id: ${tag.slice(0, 70)}`); continue; }
    if (!html.includes(`for="${id}"`)) err(name, `el campo #${id} no tiene <label for>`);
  }

  /* --- Enlaces --- */
  for (const tag of html.match(/<a\b[^>]*>/g) || []) {
    const href = attr(tag, "href");
    if (href === undefined) continue;
    if (href === "" || href === "#") { err(name, `enlace vacío: ${tag.slice(0, 80)}`); continue; }
    if (/^mailto:/.test(href)) continue;
    if (/^https?:\/\//.test(href)) {
      if (!href.startsWith(siteUrl) && /target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) {
        err(name, `enlace externo con target=_blank sin rel=noopener: ${href}`);
      }
      if (!href.startsWith(siteUrl)) continue;          /* los externos no se pueden comprobar sin red */
    }
    /* enlace interno: normalizar a ruta de archivo dentro de dist */
    let target = href.startsWith("http") ? new URL(href).pathname + (new URL(href).hash || "") : href;
    const [pathname, hash] = target.split("#");
    let filePath;
    if (pathname === "" || pathname === undefined) filePath = file;
    else {
      if (!pathname.startsWith(base + "/") && pathname !== base) { err(name, `enlace interno sin el prefijo "${base}": ${href}`); continue; }
      const local = pathname.slice(base.length).split("?")[0] || "/";
      filePath = path.join(dist, local);
      if (local.endsWith("/")) filePath = path.join(filePath, "index.html");
      if (!(await exists(filePath))) { err(name, `enlace roto: ${href}`); continue; }
    }
    if (hash && pageIds.has(filePath) && !pageIds.get(filePath).has(hash)) {
      err(name, `ancla inexistente: ${href}`);
    }
  }

  /* --- Recursos locales (css, js, imágenes, iconos) --- */
  for (const m of html.matchAll(/(?:src|href)="([^"]+\.(?:css|js|png|webp|svg|jpg))(?:\?[^"]*)?"/g)) {
    const ref = m[1];
    if (/^https?:\/\//.test(ref) && !ref.startsWith(siteUrl)) continue;
    const p = ref.startsWith("http") ? new URL(ref).pathname : ref;
    if (!p.startsWith(base + "/")) { err(name, `recurso sin prefijo "${base}": ${ref}`); continue; }
    if (!(await exists(path.join(dist, p.slice(base.length))))) err(name, `recurso inexistente: ${ref}`);
  }
}

/* --- Sitemap y robots --- */
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
for (const file of htmlFiles) {
  const name = rel(file);
  if (name === "404.html") continue;
  const loc = siteUrl + "/" + name.replace(/index\.html$/, "");
  if (!sitemap.includes(`<loc>${loc.replace(/\/\/$/, "/")}</loc>`) && !sitemap.includes(`<loc>${loc}</loc>`)) {
    err("sitemap.xml", `falta ${loc}`);
  }
}
if (sitemap.includes("404")) err("sitemap.xml", "no debería incluir la 404");
if (!(await exists(path.join(dist, "robots.txt")))) err("robots.txt", "no existe");

/* --- Presupuestos de tamaño --- */
const sizeOf = async (f) => (await stat(f)).size;
const css = all.filter((f) => f.endsWith(".css"));
const js = all.filter((f) => f.endsWith(".js"));
const imgs = all.filter((f) => /\.(png|webp|jpg)$/.test(f));
for (const f of css) if ((await sizeOf(f)) > 60 * 1024) warn(rel(f), "CSS supera 60 KB");
for (const f of js) if ((await sizeOf(f)) > 30 * 1024) warn(rel(f), "JS supera 30 KB");
for (const f of imgs) {
  const kb = (await sizeOf(f)) / 1024;
  if (kb > 200 && !f.endsWith("og-image.png")) warn(rel(f), `imagen de ${Math.round(kb)} KB (conviene optimizarla)`);
}

/* --- Resultado --- */
const totalKB = async (files) => Math.round((await Promise.all(files.map(sizeOf))).reduce((a, b) => a + b, 0) / 102.4) / 10;
console.log(`Páginas revisadas: ${htmlFiles.length}`);
console.log(`CSS: ${await totalKB(css)} KB · JS: ${await totalKB(js)} KB · imágenes: ${await totalKB(imgs)} KB`);
if (warnings.length) { console.log(`\nAvisos (${warnings.length}):`); warnings.forEach((w) => console.log("  ⚠ " + w)); }
if (errors.length) { console.log(`\nErrores (${errors.length}):`); errors.forEach((e) => console.log("  ✖ " + e)); process.exit(1); }
console.log("\n✔ Sin errores en las comprobaciones automáticas.");
