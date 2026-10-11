import { url, esc, pageHeader } from "../components.mjs";

export default (ctx) => {
  const { cfg } = ctx;
  /* Si el dato ya está en site.config.mjs se muestra; si no, aparece un aviso visible para completarlo. */
  const fill = (value, label) => (value ? esc(value) : `<span class="todo">[COMPLETAR: ${esc(label)}]</span>`);
  const review = (text) => `<span class="todo">[REVISAR: ${esc(text)}]</span>`;

  const body = `
${pageHeader({
  crumb: "Aviso de privacidad",
  eyebrow: "Legal",
  title: "Aviso de privacidad",
  text: "Estructura base que debes completar y revisar antes de considerarla definitiva."
})}

<section class="section">
  <div class="container">
    <div class="prose">
      <div class="notice" role="note">
        <strong>Borrador estructural, no asesoría legal</strong>
        Esta página es una estructura para organizar la información. Una plantilla genérica no garantiza el cumplimiento de ninguna ley. Los textos resaltados indican datos que debes completar o decisiones que debes revisar con un profesional según tu país y el tipo de cliente.
        <ul>
          <li>País de establecimiento y país de tus clientes (la normativa puede variar o aplicarse más de una a la vez).</li>
          <li>Base legal que corresponda a cada tratamiento de datos.</li>
          <li>Proveedores que reciben los datos y sus condiciones de tratamiento.</li>
          <li>Plazo de conservación y procedimiento para atender los derechos de las personas.</li>
          <li>Si más adelante añades analítica, cookies o publicidad, esta página y el sitio deberán actualizarse.</li>
        </ul>
      </div>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Nombre o razón social: ${fill(cfg.legal.legalName, "nombre legal")}</li>
        <li>Identificación fiscal: ${fill(cfg.legal.taxId, "identificación fiscal según tu país")}</li>
        <li>Domicilio o dato de contacto legal: ${fill(cfg.legal.address, "domicilio")}</li>
        <li>País: ${fill(cfg.legal.country, "país")}</li>
        <li>Correo de contacto: <a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a></li>
      </ul>

      <h2>2. Qué datos recogemos</h2>
      <p>A través del formulario de contacto recogemos los datos que tú escribes: nombre, correo electrónico, empresa (opcional), servicio de interés, presupuesto aproximado (opcional) y la descripción de tu proyecto.</p>
      <p>Este sitio no utiliza cookies propias ni herramientas de analítica. Aun así, al cargar la tipografía desde Google Fonts, el navegador se conecta a servidores de Google, que pueden recibir datos técnicos como la dirección IP. ${review("valora alojar la tipografía en el propio sitio si aplica normativa europea")}</p>
      <p>El alojamiento del sitio (GitHub Pages) puede registrar datos técnicos de las visitas. ${review("consulta las condiciones del proveedor")}</p>

      <h2>3. Para qué usamos tus datos</h2>
      <p>Para responder a tu solicitud, preparar una propuesta y mantener la comunicación relacionada con ella. No vendemos tus datos.</p>

      <h2>4. Base legal</h2>
      <p>${review("indica la base legal que corresponda a tu país y tipo de cliente; por ejemplo, la aplicación de medidas precontractuales a petición del interesado o su consentimiento")}</p>

      <h2>5. Quién recibe tus datos</h2>
      <ul>
        <li>Proveedor de correo electrónico que usamos para recibir tus mensajes: ${fill("", "nombre del proveedor")}</li>
        <li>Servicio de formularios (solo si lo activas en la configuración): Web3Forms.</li>
        <li>Proveedor de alojamiento: GitHub Pages.</li>
      </ul>
      <p>${review("completa la lista según los servicios que realmente utilices y revisa si implican transferencias internacionales de datos")}</p>

      <h2>6. Cuánto tiempo conservamos tus datos</h2>
      <p>${fill("", "plazo de conservación, por ejemplo mientras dure la comunicación y el plazo que exija la ley")}</p>

      <h2>7. Tus derechos</h2>
      <p>Puedes pedir acceso a tus datos, su rectificación o supresión, y, según la ley que te sea aplicable, oponerte a su tratamiento, limitarlo o solicitar su portabilidad. Para ejercer estos derechos escribe a <a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a>. ${review("añade la autoridad de protección de datos a la que puede acudir el usuario en tu país")}</p>

      <h2>8. Menores</h2>
      <p>Este sitio está dirigido a empresas y profesionales. ${review("confirma si necesitas una cláusula específica sobre menores")}</p>

      <h2>9. Cambios en este aviso</h2>
      <p>Última actualización: ${fill("", "fecha")}. Si cambiamos cómo tratamos los datos, actualizaremos esta página.</p>

      <p class="small">Volver a <a href="${url("/contacto/")}">contacto</a>.</p>
    </div>
  </div>
</section>`;

  return {
    path: "/privacidad/",
    nav: "",
    title: "Aviso de privacidad (borrador a completar) | JG Dev AI",
    description: "Estructura del aviso de privacidad de JG Dev AI: qué datos recoge el formulario de contacto, para qué se usan y qué campos faltan por completar.",
    body
  };
};
