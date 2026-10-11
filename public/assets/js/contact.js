/* JG Dev AI | Formulario de contacto
   Dos modos, definidos en el HTML por data-mode:
   - "web3forms": envía los datos a un servicio de formularios (necesita form.accessKey en site.config.mjs).
   - "mailto":    abre el correo del visitante con el mensaje redactado. No envía nada por sí solo,
                  y la página lo explica con claridad.
   Estados: validando, enviando, éxito y error. */

(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const mode = form.dataset.mode;
  const toEmail = form.dataset.email;
  const statusBox = document.getElementById("form-status");
  const resultPanel = document.getElementById("form-result");
  const submitBtn = document.getElementById("submit-btn");
  const submitLabel = submitBtn.textContent;

  /* Preselecciona el servicio si llega en la URL: /contacto/?servicio=web */
  const wanted = new URLSearchParams(window.location.search).get("servicio");
  if (wanted && [...form.elements.servicio.options].some((o) => o.value === wanted)) {
    form.elements.servicio.value = wanted;
  }

  /* ---------- Validación ---------- */
  const rules = {
    nombre: (el) => (el.value.trim().length >= 2 ? "" : "Escribe tu nombre (mínimo 2 caracteres)."),
    email: (el) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) ? "" : "Escribe un correo válido, por ejemplo nombre@empresa.com.",
    servicio: (el) => (el.value ? "" : "Elige el servicio que te interesa."),
    mensaje: (el) =>
      el.value.trim().length >= 20 ? "" : "Cuéntanos un poco más sobre tu proyecto (mínimo 20 caracteres).",
    privacidad: (el) => (el.checked ? "" : "Necesitamos que aceptes el aviso de privacidad para poder responderte.")
  };

  function validate(name) {
    const el = form.elements[name];
    const message = rules[name](el);
    document.getElementById(`error-${name}`).textContent = message;
    el.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  Object.keys(rules).forEach((name) => {
    const el = form.elements[name];
    el.addEventListener("blur", () => validate(name));
    el.addEventListener("input", () => {
      if (el.getAttribute("aria-invalid") === "true") validate(name);
    });
    el.addEventListener("change", () => {
      if (el.getAttribute("aria-invalid") === "true") validate(name);
    });
  });

  /* ---------- Mensajes de estado ---------- */
  function showStatus(type, ...nodes) {
    statusBox.className = `form-status is-${type}`;
    statusBox.replaceChildren(...nodes.map((n) => (typeof n === "string" ? document.createTextNode(n) : n)));
  }
  function clearStatus() {
    statusBox.className = "form-status";
    statusBox.replaceChildren();
  }
  function mailLink(text) {
    const a = document.createElement("a");
    a.href = `mailto:${toEmail}`;
    a.textContent = text || toEmail;
    return a;
  }
  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.setAttribute("aria-busy", String(busy));
    submitBtn.textContent = busy ? "Enviando…" : submitLabel;
  }

  /* ---------- Datos del formulario ---------- */
  function collect() {
    const f = form.elements;
    return {
      name: f.nombre.value.trim(),
      email: f.email.value.trim(),
      company: f.empresa.value.trim(),
      service: f.servicio.selectedOptions[0].textContent.trim(),
      budget: f.presupuesto.value || "No indicado",
      message: f.mensaje.value.trim()
    };
  }

  /* ---------- Modo servicio de formularios ---------- */
  async function sendToService(data) {
    setBusy(true);
    showStatus("info", "Enviando tu mensaje…");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: form.dataset.accessKey,
          subject: `Nueva solicitud web: ${data.service} (${data.name})`,
          from_name: "JG Dev AI (sitio web)",
          name: data.name,
          email: data.email,
          company: data.company || "No indicada",
          service: data.service,
          budget: data.budget,
          message: data.message
        }),
        signal: controller.signal
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || !json.success) throw new Error(json.message || `Error ${response.status}`);
      showSuccess();
    } catch (error) {
      const timedOut = error.name === "AbortError";
      showStatus(
        "error",
        timedOut ? "El envío tardó demasiado. " : "No pudimos enviar tu mensaje. ",
        "Puedes intentarlo de nuevo o escribirnos directamente a ",
        mailLink(),
        "."
      );
      statusBox.focus();
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }

  function showSuccess() {
    clearStatus();
    form.hidden = true;
    resultPanel.hidden = false;
    resultPanel.focus();
  }

  /* ---------- Modo correo (sin servidor) ---------- */
  function openMailClient(data) {
    const MAX = 1500;                       /* los enlaces mailto muy largos fallan en algunos clientes */
    const truncated = data.message.length > MAX;
    const lines = [
      data.message.slice(0, MAX) + (truncated ? "…" : ""),
      "",
      "—",
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Empresa: ${data.company || "No indicada"}`,
      `Servicio de interés: ${data.service}`,
      `Presupuesto aproximado: ${data.budget}`
    ];
    const body = lines.join("\n");
    const subject = `Solicitud de propuesta: ${data.service}`;
    window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "btn btn-secondary btn-sm";
    copy.textContent = "Copiar el mensaje";
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`Para: ${toEmail}\nAsunto: ${subject}\n\n${body}`);
        copy.textContent = "Mensaje copiado";
      } catch {
        copy.textContent = "No se pudo copiar: selecciona el texto del formulario";
      }
    });
    showStatus(
      "info",
      "Hemos intentado abrir tu aplicación de correo con el mensaje listo. Todavía NO se ha enviado: revísalo y pulsa «Enviar» allí. Si no se abrió nada, copia el mensaje y escríbenos a ",
      mailLink(),
      truncated ? ". Tu descripción era muy larga y se recortó en el correo: revisa que no falte nada importante." : ".",
      document.createElement("br"),
      copy
    );
    statusBox.focus();
  }

  /* ---------- Envío ---------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    /* Trampa para bots: un humano nunca rellena este campo oculto */
    if (form.elements.botcheck.value) {
      showSuccess();
      return;
    }

    const results = Object.keys(rules).map(validate);
    if (results.includes(false)) {
      const invalid = results.filter((ok) => !ok).length;
      showStatus("error", `Revisa ${invalid === 1 ? "el campo marcado" : `los ${invalid} campos marcados`} antes de enviar.`);
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    clearStatus();
    const data = collect();
    if (mode === "web3forms") sendToService(data);
    else openMailClient(data);
  });

  document.getElementById("send-another").addEventListener("click", () => {
    form.reset();
    Object.keys(rules).forEach((name) => form.elements[name].removeAttribute("aria-invalid"));
    resultPanel.hidden = true;
    form.hidden = false;
    clearStatus();
    form.elements.nombre.focus();
  });
})();
