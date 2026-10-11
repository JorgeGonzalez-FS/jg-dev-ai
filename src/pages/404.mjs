import { url, btn } from "../components.mjs";

export default () => ({
  path: "/404.html",
  nav: "",
  noindex: true,
  title: "Página no encontrada | JG Dev AI",
  description: "La página que buscas no existe o cambió de dirección. Vuelve al inicio o explora los servicios de JG Dev AI.",
  body: `<section class="section"><div class="container not-found">
  <p class="code" aria-hidden="true">404</p>
  <h1>No encontramos esta página</h1>
  <p class="lead">Puede que la dirección esté mal escrita o que la página haya cambiado de sitio.</p>
  <div class="hero-actions">
    ${btn("Volver al inicio", url("/"), { variant: "primary", icon: "arrow" })}
    ${btn("Ver servicios", url("/servicios/"), { variant: "secondary" })}
  </div>
</div></section>`
});
