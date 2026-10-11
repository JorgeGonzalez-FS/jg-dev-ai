/* ============================================================
   Configuración del sitio JG Dev AI
   Todo lo que cambia entre entornos o que debes completar vive aquí.
   ============================================================ */

export default {
  name: "JG Dev AI",
  tagline: "Tecnología inteligente. Resultados reales.",
  lang: "es",
  locale: "es_ES",
  themeColor: "#0B1120",

  /* URL pública final, SIN barra al final.
     - GitHub Pages (repositorio "jg-dev-ai"):  https://jorgegonzalez-fs.github.io/jg-dev-ai
     - Con dominio propio (cuando lo tengas):    https://tudominio.com
     De esta URL salen el canonical, el sitemap, Open Graph y las rutas de los enlaces. */
  siteUrl: "https://jorgegonzalez-fs.github.io/jg-dev-ai",

  founder: "Jorge González",
  founderRole: "Fundador y desarrollador de software",

  /* SUPUESTO: tomé este correo de tu portafolio anterior. Confírmalo o cámbialo. */
  email: "technicalservice1920@gmail.com",
  github: "https://github.com/JorgeGonzalez-FS",

  /* Formulario de contacto.
     - Con accessKey vacía, el formulario NO envía nada a ningún servidor:
       abre el correo del visitante con el mensaje ya redactado, y la página lo indica.
     - Para recibir los mensajes directamente en tu correo (plan gratuito de Web3Forms):
         1) Entra en https://web3forms.com e introduce tu correo para recibir la clave.
         2) Pega la clave en accessKey.
       La clave de Web3Forms está pensada para ser pública (no es un secreto), pero solo
       sirve para enviar mensajes a TU correo. Revisa los límites vigentes del plan gratuito. */
  form: {
    provider: "web3forms",
    endpoint: "https://api.web3forms.com/submit",
    accessKey: ""
  },

  /* Datos legales: complétalos antes de publicar las páginas legales. */
  legal: {
    legalName: "",       /* nombre legal del responsable (persona o sociedad) */
    taxId: "",           /* identificación fiscal, según tu país */
    address: "",         /* domicilio o dato de contacto legal */
    country: ""          /* país de establecimiento */
  }
};
