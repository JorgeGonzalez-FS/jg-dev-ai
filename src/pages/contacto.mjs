import { url, esc, icon, pageHeader } from "../components.mjs";
import { SERVICES, STATUS } from "../data/services.mjs";

export default (ctx) => {
  const { cfg } = ctx;
  const live = Boolean(cfg.form.accessKey);          /* ¿hay un servicio de formularios configurado? */
  const mode = live ? "web3forms" : "mailto";

  const serviceOptions = SERVICES.map((s) => {
    const suffix = s.status === "available" ? "" : ` (${STATUS[s.status].label.toLowerCase()})`;
    return `<option value="${s.id}">${esc(s.title + suffix)}</option>`;
  }).join("");

  const modeNote = live
    ? "Tus datos se envían a nuestro correo mediante el servicio Web3Forms. Más información en el <a href=\"" + url("/privacidad/") + "\">aviso de privacidad</a>."
    : "Este formulario abre tu aplicación de correo con el mensaje ya redactado. No se envía nada hasta que pulses «Enviar» en tu correo.";

  const body = `
${pageHeader({
  crumb: "Contacto",
  eyebrow: "Contacto",
  title: "Cuéntanos qué necesitas",
  text: "Describe tu proyecto con tus palabras. Te respondemos por correo con preguntas o con una propuesta de alcance."
})}

<section class="section">
  <div class="container contact-grid">
    <div class="form-card" id="formulario">
      <div id="form-result" class="result-panel" tabindex="-1" hidden>
        <h2>Mensaje enviado</h2>
        <p>Gracias por escribirnos. Hemos recibido tu solicitud y te responderemos por correo.</p>
        <button class="btn btn-secondary" type="button" id="send-another">Enviar otro mensaje</button>
      </div>

      <form id="contact-form" novalidate data-mode="${mode}" data-endpoint="${esc(cfg.form.endpoint)}" data-access-key="${esc(cfg.form.accessKey)}" data-email="${esc(cfg.email)}">
        <h2>Solicitar una propuesta</h2>
        <p class="form-intro">Los campos marcados con <span class="req" aria-hidden="true">*</span><span class="sr-only">asterisco</span> son obligatorios.</p>

        <div id="form-status" class="form-status" role="status" aria-live="polite" tabindex="-1"></div>

        <div class="form-row">
          <div class="field">
            <label for="nombre">Nombre <span class="req" aria-hidden="true">*</span></label>
            <input id="nombre" name="nombre" type="text" autocomplete="name" required aria-required="true" aria-describedby="error-nombre">
            <p class="error" id="error-nombre"></p>
          </div>
          <div class="field">
            <label for="email">Correo electrónico <span class="req" aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required aria-required="true" aria-describedby="error-email">
            <p class="error" id="error-email"></p>
          </div>
        </div>

        <div class="field">
          <label for="empresa">Empresa <span class="hint-inline">(opcional)</span></label>
          <input id="empresa" name="empresa" type="text" autocomplete="organization">
        </div>

        <div class="form-row">
          <div class="field">
            <label for="servicio">Servicio de interés <span class="req" aria-hidden="true">*</span></label>
            <select id="servicio" name="servicio" required aria-required="true" aria-describedby="error-servicio">
              <option value="">Elige una opción</option>
              ${serviceOptions}
              <option value="no-se">Aún no lo sé</option>
            </select>
            <p class="error" id="error-servicio"></p>
          </div>
          <div class="field">
            <label for="presupuesto">Presupuesto aproximado <span class="hint-inline">(opcional)</span></label>
            <select id="presupuesto" name="presupuesto" aria-describedby="hint-presupuesto">
              <option value="">Prefiero comentarlo después</option>
              <option>Menos de 500 USD</option>
              <option>Entre 500 y 1.500 USD</option>
              <option>Entre 1.500 y 5.000 USD</option>
              <option>Más de 5.000 USD</option>
            </select>
            <p class="hint" id="hint-presupuesto">Es solo orientativo. No es un compromiso ni una oferta.</p>
          </div>
        </div>

        <div class="field">
          <label for="mensaje">Descripción del proyecto <span class="req" aria-hidden="true">*</span></label>
          <textarea id="mensaje" name="mensaje" required aria-required="true" aria-describedby="hint-mensaje error-mensaje"></textarea>
          <p class="hint" id="hint-mensaje">¿Qué quieres conseguir? ¿Qué tienes hoy? ¿Hay alguna fecha importante? Mínimo 20 caracteres.</p>
          <p class="error" id="error-mensaje"></p>
        </div>

        <div class="hp" aria-hidden="true">
          <label for="botcheck">No rellenes este campo</label>
          <input id="botcheck" name="botcheck" type="text" tabindex="-1" autocomplete="off">
        </div>

        <div class="check-field">
          <input id="privacidad" name="privacidad" type="checkbox" required aria-required="true" aria-describedby="error-privacidad">
          <label for="privacidad">He leído el <a href="${url("/privacidad/")}" target="_blank" rel="noopener noreferrer">aviso de privacidad<span class="sr-only"> (se abre en una pestaña nueva)</span></a> y acepto que se usen mis datos para responder a esta solicitud. <span class="req" aria-hidden="true">*</span></label>
        </div>
        <p class="error" id="error-privacidad"></p>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit" id="submit-btn">Enviar solicitud</button>
        </div>
        <p class="form-mode">${modeNote}</p>
      </form>
    </div>

    <aside class="aside-card" aria-label="Qué pasa después">
      <h2>Qué pasa después</h2>
      <ol>
        <li>Leemos tu mensaje con atención.</li>
        <li>Te respondemos por correo con preguntas o con una propuesta de alcance.</li>
        <li>Si encaja, acordamos por escrito el alcance y el calendario.</li>
      </ol>
      <p>No damos plazos ni precios sin conocer tu caso.</p>
      <hr>
      <h3>Prefieres escribir directamente</h3>
      <p><a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a></p>
      <p class="small">Antes de escribir, quizá te ayude revisar las <a href="${url("/preguntas-frecuentes/")}">preguntas frecuentes</a>.</p>
    </aside>
  </div>
</section>`;

  return {
    path: "/contacto/",
    nav: "contacto",
    title: "Solicitar una propuesta | JG Dev AI",
    description: "Cuéntanos qué necesitas: página web, automatización o chatbot. Te respondemos por correo con preguntas o con una propuesta de alcance.",
    body,
    scripts: ["contact.js"]
  };
};
