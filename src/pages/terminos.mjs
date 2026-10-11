import { url, esc, pageHeader } from "../components.mjs";

export default (ctx) => {
  const { cfg } = ctx;
  const fill = (label) => `<span class="todo">[COMPLETAR: ${esc(label)}]</span>`;
  const review = (text) => `<span class="todo">[REVISAR: ${esc(text)}]</span>`;

  const body = `
${pageHeader({
  crumb: "Términos del servicio",
  eyebrow: "Legal",
  title: "Términos del servicio",
  text: "Estructura base que debes completar y revisar antes de considerarla definitiva."
})}

<section class="section">
  <div class="container">
    <div class="prose">
      <div class="notice" role="note">
        <strong>Borrador estructural, no asesoría legal</strong>
        Esta página organiza los apartados habituales, pero una plantilla genérica no garantiza el cumplimiento legal ni protege por sí sola tu actividad. Revísala con un profesional según tu país, el tipo de cliente (empresa o consumidor) y los servicios que ofrezcas.
        <ul>
          <li>Qué normas de consumo o contratación aplican según el país y el tipo de cliente.</li>
          <li>Cómo se acuerdan los pagos, las facturas y los impuestos en tu país.</li>
          <li>Quién conserva los derechos sobre el código y los materiales entregados.</li>
          <li>Qué límites de responsabilidad son válidos en tu jurisdicción.</li>
        </ul>
      </div>

      <h2>1. Quién ofrece los servicios</h2>
      <p>${esc(cfg.name)}, a cargo de ${esc(cfg.founder)}. Datos legales: ${fill("nombre o razón social, identificación fiscal y domicilio")}</p>

      <h2>2. Objeto</h2>
      <p>Estos términos regulan el uso de este sitio web y la contratación de servicios de desarrollo web, automatización y asistentes virtuales ofrecidos por ${esc(cfg.name)}.</p>

      <h2>3. Propuestas y cotizaciones</h2>
      <p>Las propuestas y los presupuestos orientativos no son vinculantes hasta que ambas partes aceptan por escrito el alcance, el coste y el calendario. Los precios o rangos indicados en el formulario de contacto son solo orientativos.</p>

      <h2>4. Alcance, entregables y revisiones</h2>
      <p>Cada proyecto se define en una propuesta que indica qué incluye y qué no. Los cambios de alcance se acuerdan por escrito. Número de rondas de revisión: ${fill("rondas de revisión incluidas")}</p>

      <h2>5. Pagos</h2>
      <p>${fill("forma y calendario de pago, moneda, facturación e impuestos")}</p>

      <h2>6. Propiedad intelectual</h2>
      <p>${fill("quién conserva los derechos del código y de los materiales, y cuándo se transfieren al cliente")} ${review("licencias de terceros, tipografías, imágenes y librerías utilizadas")}</p>

      <h2>7. Responsabilidades del cliente</h2>
      <p>El cliente aporta los contenidos, imágenes y accesos acordados, y declara que tiene derecho a usarlos.</p>

      <h2>8. Uso de inteligencia artificial</h2>
      <p>Podemos usar herramientas de inteligencia artificial como apoyo durante el desarrollo y, cuando se acuerde, dentro de la solución entregada. Una persona revisa el resultado, pero los sistemas de IA pueden cometer errores. Antes de usar información del cliente con un servicio de IA de terceros, se acuerda por escrito.</p>

      <h2>9. Servicios en desarrollo</h2>
      <p>Los servicios marcados como «En desarrollo» o «Bajo consulta» no constituyen una oferta cerrada. Su contratación depende de una evaluación previa de viabilidad.</p>

      <h2>10. Garantías y limitación de responsabilidad</h2>
      <p>${review("redacta esta cláusula con un profesional; los límites de responsabilidad pueden no ser válidos frente a consumidores o en algunas jurisdicciones")}</p>

      <h2>11. Confidencialidad</h2>
      <p>${fill("compromisos de confidencialidad sobre la información del cliente")}</p>

      <h2>12. Ley aplicable y resolución de conflictos</h2>
      <p>${fill("ley aplicable y jurisdicción")}</p>

      <h2>13. Cambios en estos términos</h2>
      <p>Última actualización: ${fill("fecha")}. Si estos términos cambian, se actualizará esta página.</p>

      <p class="small">Más información en el <a href="${url("/privacidad/")}">aviso de privacidad</a>.</p>
    </div>
  </div>
</section>`;

  return {
    path: "/terminos/",
    nav: "",
    title: "Términos del servicio (borrador a completar) | JG Dev AI",
    description: "Estructura de los términos del servicio de JG Dev AI: propuestas, alcance, pagos, propiedad intelectual, uso de IA y los campos pendientes de completar.",
    body
  };
};
