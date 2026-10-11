# JG Dev AI: sitio web de la agencia

Sitio estático multipágina (HTML, CSS y JavaScript sin frameworks) generado con un script de Node **sin dependencias**. Se publica gratis en GitHub Pages.

> **Antes de publicar, lee la sección «Pendientes que debes completar tú».** El sitio funciona, pero hay datos y decisiones que solo tú puedes aportar.

## Qué incluye

| Página | Ruta |
|---|---|
| Inicio | `/` |
| Servicios | `/servicios/` |
| Portafolio | `/portafolio/` |
| Sobre nosotros | `/sobre-nosotros/` |
| Contacto (formulario) | `/contacto/` |
| Preguntas frecuentes | `/preguntas-frecuentes/` |
| Aviso de privacidad (borrador) | `/privacidad/` |
| Términos del servicio (borrador) | `/terminos/` |
| Página 404 | cualquier ruta inexistente |

Además: `sitemap.xml`, `robots.txt`, metadatos SEO y Open Graph por página, datos estructurados (Organization y FAQPage), favicon, imagen para compartir, menú móvil que funciona incluso sin JavaScript, enlace «Saltar al contenido», estados de foco y respeto a `prefers-reduced-motion`.

## Estructura

```
jg-dev-ai/
├─ site.config.mjs        ← URL pública, correo, formulario y datos legales
├─ build.mjs              ← genera el sitio en dist/
├─ src/
│  ├─ components.mjs      ← cabecera, pie, tarjetas, formularios… (reutilizables)
│  ├─ data/               ← servicios, proyectos y preguntas frecuentes
│  └─ pages/              ← una página por archivo
├─ public/assets/         ← CSS, JS, imágenes (se copian tal cual)
├─ scripts/               ← check.mjs (comprobaciones) y serve.mjs (servidor local)
├─ docs/                  ← plantilla de seguimiento de oportunidades
└─ .github/workflows/     ← publicación automática en GitHub Pages
```

## Ejecutar y probar en tu ordenador

Necesitas Node 18 o superior (https://nodejs.org). No hay que instalar paquetes.

```bash
npm run dev      # genera el sitio en modo local y lo abre en http://localhost:4173
npm test         # genera el sitio y ejecuta las comprobaciones automáticas
```

`npm test` revisa metadatos, un único `h1` por página, `alt` en imágenes, etiquetas de los campos, enlaces internos y anclas, `rel` en enlaces externos, sitemap y tamaño de los recursos. **No sustituye a Lighthouse** ni a una prueba manual con lector de pantalla (ver «Verificaciones recomendadas»).

## Publicar en GitHub Pages (gratis)

1. Crea un repositorio público llamado **`jg-dev-ai`** en tu cuenta de GitHub y sube todo el contenido de esta carpeta (sin `dist/`).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Haz *push* a `main`. El flujo de `.github/workflows/pages.yml` construye, comprueba y publica el sitio.
4. La web quedará en `https://jorgegonzalez-fs.github.io/jg-dev-ai/`.

Si usas otro nombre de repositorio o un dominio propio, cambia `siteUrl` en `site.config.mjs` (sin barra final). De esa URL salen los *canonical*, el sitemap, Open Graph y las rutas de los enlaces.

> **Nota sobre `robots.txt`:** los buscadores solo lo leen en la raíz de un dominio. Mientras el sitio viva en `usuario.github.io/jg-dev-ai/`, no tendrá efecto. Con un dominio propio sí.

### Con dominio propio (cuando lo tengas)

Un dominio tiene coste anual (normalmente entre 10 y 15 USD). Es opcional: el sitio funciona sin él. Si lo compras: cambia `siteUrl`, configúralo en **Settings → Pages → Custom domain** y publica de nuevo.

## Configurar el formulario de contacto

El formulario **no simula nada**. Tiene dos modos y la propia página indica cuál está activo.

**Modo actual: correo.** Sin clave configurada, al enviar se abre el programa de correo del visitante con el mensaje redactado. El mensaje no se envía hasta que el visitante pulsa «Enviar» en su correo. Es la opción 100 % gratuita y sin servidores.

**Modo servicio de formularios (recomendado).** Los mensajes llegan directamente a tu correo:

1. Entra en https://web3forms.com e indica tu correo para recibir una clave de acceso (hay plan gratuito; revisa sus límites vigentes).
2. Pega la clave en `form.accessKey` de `site.config.mjs`, **o** guárdala como variable del repositorio y pásala en el flujo con `FORM_ACCESS_KEY`.
3. Vuelve a construir y publica.

Detalles de seguridad:
- La clave de Web3Forms está pensada para ser pública (va en el navegador). Solo permite enviar mensajes a *tu* correo; no es un secreto, pero tampoco debes reutilizarla para otras cosas.
- El formulario incluye una trampa para bots (campo oculto) y validación en el navegador. Esa validación mejora la experiencia, no es una barrera de seguridad.
- Si prefieres otro servicio (por ejemplo Formspree), habría que adaptar `public/assets/js/contact.js`.

## Añadir contenido

- **Un proyecto nuevo:** copia un bloque en `src/data/projects.mjs`, guarda su captura en `public/assets/img/projects/` (WebP, 800×500) y vuelve a construir. Usa `kind: "client"` **solo** para trabajos reales de clientes que hayan dado permiso. Los campos vacíos no se muestran.
- **Un servicio o una pregunta:** edita `src/data/services.mjs` o `src/data/faqs.mjs`. **No cambies un servicio a `available` hasta que exista una implementación funcional que puedas demostrar.**
- **TaskFlow:** su imagen es una ilustración genérica porque no pude capturar tu proyecto. Sustitúyela por una captura real y rellena su problema, solución y funcionalidades.

## Seguimiento de oportunidades

Opción gratuita y sencilla: importa `docs/oportunidades.csv` en Google Sheets. Cada vez que llegue una solicitud, añade una fila con su estado (Nuevo, Contactado, Propuesta enviada, Ganado, Perdido) y la próxima acción. No requiere ningún servicio adicional ni almacena datos en el sitio web.

## Pendientes que debes completar tú

**Bloquean una publicación honesta:**

1. **Páginas legales** (`/privacidad/` y `/terminos/`): están resaltadas en amarillo con los campos `[COMPLETAR]` y `[REVISAR]`. Completa tus datos en `site.config.mjs` (`legal`) y revisa el texto con un profesional según tu país y tus clientes. **Una plantilla genérica no garantiza el cumplimiento legal.** Hay una lista de comprobación en `docs/legal-checklist.md`.
2. **Correo de contacto:** `site.config.mjs` usa `technicalservice1920@gmail.com`, tomado de tu portafolio anterior. Confírmalo o cámbialo.
3. **Demostraciones del portafolio:** los enlaces apuntan a `jorgegonzalez-fs.github.io/jg-dev-portfolio/…`. Funcionarán cuando subas esas carpetas a ese repositorio.
4. **Afirmaciones sobre IA:** la página de preguntas frecuentes y «Sobre nosotros» dicen que usas asistentes de IA durante el desarrollo y que una persona revisa el resultado. Comprueba que describe fielmente cómo trabajas.

**Mejoras recomendadas:**

5. **Fuente Inter:** se carga desde Google Fonts (cómodo, pero es un recurso externo: añade una conexión y puede tener implicaciones de privacidad en la UE). Para alojarla en el propio sitio: descarga Inter en WOFF2, guárdala en `public/assets/fonts/`, añade un `@font-face` en el CSS y elimina los enlaces a Google en `components.mjs` y en la política CSP.
6. **Imagen para compartir** (`public/assets/img/og-image.png`): la generé con una tipografía de sistema porque no tenía Inter instalada. Puedes regenerarla con Inter.
7. **Capturas del portafolio:** también se generaron sin Inter. Si quieres que reflejen la tipografía final, vuelve a capturarlas.
8. **Versión en inglés:** el contenido está en datos (`src/data/`), lo que facilita duplicarlo en una carpeta `/en/`. No está implementada.
9. **Analítica:** el sitio no usa ninguna. Si la añades (por ejemplo, una herramienta sin cookies), actualiza el aviso de privacidad y la CSP.

## Verificaciones recomendadas tras publicar

- **Lighthouse** (Chrome → F12 → Lighthouse) sobre cada página, en móvil.
- **Google Search Console:** añade el sitio y envía `sitemap.xml`.
- **Prueba del formulario real:** envía un mensaje de prueba y comprueba que llega.
- **Lector de pantalla** (NVDA en Windows o VoiceOver en macOS): recorre inicio, servicios y contacto.
- **Compartir un enlace** en WhatsApp o LinkedIn para ver la tarjeta Open Graph.
- Prueba en Safari y Firefox además de Chrome.

## Seguridad: resumen

- Política de seguridad de contenido (CSP) por `<meta>`: solo scripts propios; conexiones solo a tu propio sitio y al servicio de formularios.
- Sin claves secretas en el código. Sin cookies ni almacenamiento local.
- Enlaces externos con `rel="noopener noreferrer"`.
- GitHub Pages no permite cabeceras HTTP personalizadas: la CSP por `<meta>` no cubre `frame-ancestors` ni HSTS. Si lo necesitas, ponlo detrás de un servicio como Cloudflare (tiene plan gratuito).
