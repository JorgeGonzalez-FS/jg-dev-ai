/* Servidor local mínimo para previsualizar /dist en http://localhost:4173
   Uso: npm run dev   (genera el sitio en modo local y lo sirve) */
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT) || 4173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".ico": "image/x-icon"
};

http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(root, pathname);
  if (!file.startsWith(root)) { res.writeHead(403).end("Prohibido"); return; }   /* evita salir de dist/ */
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" }).end(data);
  } catch {
    const page = await readFile(path.join(root, "404.html")).catch(() => "No encontrado");
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end(page);
  }
}).listen(port, () => console.log(`Sitio en http://localhost:${port}  (Ctrl+C para parar)`));
