/* ============================================================
   build.mjs: genera el sitio estático en /dist
   Uso:
     node build.mjs            -> versión de producción (usa siteUrl de site.config.mjs)
     node build.mjs --local    -> versión para probar en http://localhost:4173
   No tiene dependencias: solo necesita Node 18 o superior.
   ============================================================ */

import { readdir, mkdir, writeFile, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import cfg from "./site.config.mjs";
import * as components from "./src/components.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const local = process.argv.includes("--local");

/* ---------- Contexto compartido ---------- */
const siteUrl = (local ? "http://localhost:4173" : cfg.siteUrl).replace(/\/+$/, "");
try {
  new URL(siteUrl);
} catch {
  console.error(`✖ siteUrl no es una URL válida: "${siteUrl}". Revisa site.config.mjs.`);
  process.exit(1);
}
const base = new URL(siteUrl).pathname.replace(/\/+$/, "");   /* "" o "/jg-dev-ai" */
const build = Date.now().toString(36);                          /* evita caché antigua tras cada despliegue */
/* La clave del formulario puede venir de la variable de entorno FORM_ACCESS_KEY
   (útil en GitHub Actions) o de site.config.mjs. */
const accessKey = process.env.FORM_ACCESS_KEY || cfg.form.accessKey;
const effectiveCfg = { ...cfg, form: { ...cfg.form, accessKey } };
const ctx = { cfg: effectiveCfg, siteUrl, base, build, local };

components.init(ctx);

/* ---------- Preparar /dist ---------- */
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });
await writeFile(path.join(dist, ".nojekyll"), "");

/* ---------- Generar páginas ---------- */
const pageFiles = (await readdir(path.join(root, "src/pages"))).filter((f) => f.endsWith(".mjs")).sort();
const pages = [];

for (const file of pageFiles) {
  const mod = await import(pathToFileURL(path.join(root, "src/pages", file)).href);
  const page = mod.default(ctx);
  if (!page.path || !page.title || !page.description) {
    console.error(`✖ ${file}: faltan path, title o description.`);
    process.exit(1);
  }
  pages.push(page);
}

for (const page of pages) {
  const target = page.path.endsWith("/")
    ? path.join(dist, page.path, "index.html")
    : path.join(dist, page.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, components.layout(page), "utf8");
}

/* ---------- sitemap.xml y robots.txt ---------- */
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");

/* ---------- Resumen y avisos ---------- */
console.log(`✔ ${pages.length} páginas generadas en dist/ (${local ? "modo local" : "producción"})`);
console.log(`  siteUrl: ${siteUrl}   base: "${base || "/"}"`);
if (!effectiveCfg.form.accessKey) {
  console.log("  ⚠ form.accessKey vacío: el formulario abrirá el correo del visitante (no envía a ningún servidor).");
}
const emptyLegal = Object.entries(cfg.legal).filter(([, v]) => !v).map(([k]) => k);
if (emptyLegal.length) {
  console.log(`  ⚠ Datos legales sin completar en site.config.mjs: ${emptyLegal.join(", ")}`);
}
