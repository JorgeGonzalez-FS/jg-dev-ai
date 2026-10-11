/* JG Dev AI | Comportamiento general
   1. Menú móvil: se cierra con Esc, al pulsar un enlace o al hacer clic fuera
   2. Animaciones de entrada discretas (se omiten si el usuario prefiere menos movimiento)
   El sitio funciona sin este archivo: el menú móvil usa <details>. */

(() => {
  const menu = document.querySelector(".nav-mobile");
  if (menu) {
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) menu.open = false;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
      if (e.matches) menu.open = false;
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      /* Solo se ocultan los elementos que aún no se ven, para no provocar parpadeos */
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-ready");
        observer.observe(el);
      }
    });
  }
})();
