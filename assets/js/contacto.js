const formulario = document.querySelector("#form-contacto");

if (formulario) {
  const nombre = document.querySelector("#nombre");
  const correo = document.querySelector("#correo");
  const comentario = document.querySelector("#comentario");
  const mensajeExito = document.querySelector("#mensaje-exito");

  function mostrarError(control, idError, mensaje) {
    const salida = document.querySelector(`#${idError}`);
    salida.textContent = mensaje;
    control.classList.add("campo-invalido");
    control.setAttribute("aria-invalid", "true");
  }

  function limpiarError(control, idError) {
    const salida = document.querySelector(`#${idError}`);
    salida.textContent = "";
    control.classList.remove("campo-invalido");
    control.removeAttribute("aria-invalid");
  }

  function validarNombre(valor) {
    limpiarError(nombre, "error-nombre");

    if (valor === "") {
      mostrarError(nombre, "error-nombre", "El nombre es obligatorio");
      return false;
    }

    if (valor.length > 50) {
      mostrarError(nombre, "error-nombre", "Máximo 50 caracteres");
      return false;
    }

    return true;
  }

  function validarCorreo(valor) {
    limpiarError(correo, "error-correo");

    if (valor === "") {
      mostrarError(correo, "error-correo", "El correo es obligatorio");
      return false;
    }

    if (!valor.includes("@")) {
      mostrarError(correo, "error-correo", "El correo debe contener @");
      return false;
    }

    // cualquier cliente real puede escribir desde cualquier correo.
    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

    if (!formatoValido) {
      mostrarError(correo, "error-correo", "Ingresa un correo válido, ej: nombre@dominio.cl");
      return false;
    }

    return true;
  }

  function validarComentario(valor) {
    limpiarError(comentario, "error-comentario");

    if (valor === "") {
      mostrarError(comentario, "error-comentario", "Cuéntanos brevemente tu duda o comentario");
      return false;
    }

    if (valor.length < 10) {
      mostrarError(comentario, "error-comentario", "Escribe al menos 10 caracteres");
      return false;
    }

    if (valor.length > 500) {
      mostrarError(comentario, "error-comentario", "Máximo 500 caracteres");
      return false;
    }

    return true;
  }

  function procesarContacto(evento) {
    evento.preventDefault();

    const valorNombre = nombre.value.trim();
    const valorCorreo = correo.value.trim().toLowerCase();
    const valorComentario = comentario.value.trim();

    const nombreValido = validarNombre(valorNombre);
    const correoValido = validarCorreo(valorCorreo);
    const comentarioValido = validarComentario(valorComentario);

    const formularioValido = nombreValido && correoValido && comentarioValido;

    if (!formularioValido) {
      mensajeExito.textContent = "Revisa los campos marcados";
      return;
    }

    // Se guarda solo el último mensaje válido, sin datos sensibles
    const mensaje = {
      nombre: valorNombre,
      correo: valorCorreo,
      comentario: valorComentario,
      fecha: new Date().toISOString()
    };

    localStorage.setItem("ultimoContactoVeterinariaSanMarcos", JSON.stringify(mensaje));
    mensajeExito.textContent = `¡Gracias, ${valorNombre}! Recibimos tu mensaje y te contactaremos pronto.`;
    formulario.reset();
  }

  formulario.addEventListener("submit", procesarContacto);

  // Valida al perder el foco y limpia el error apenas la persona empieza a corregir
  nombre.addEventListener("blur", () => validarNombre(nombre.value.trim()));
  nombre.addEventListener("input", () => limpiarError(nombre, "error-nombre"));

  correo.addEventListener("blur", () => validarCorreo(correo.value.trim().toLowerCase()));
  correo.addEventListener("input", () => limpiarError(correo, "error-correo"));

  comentario.addEventListener("blur", () => validarComentario(comentario.value.trim()));
  comentario.addEventListener("input", () => limpiarError(comentario, "error-comentario"));

  // Aquí recupera el último mensaje enviado (si existe) al cargar la página
  const ultimoContacto = localStorage.getItem("ultimoContactoVeterinariaSanMarcos");

  if (ultimoContacto !== null) {
    const datos = JSON.parse(ultimoContacto);
    mensajeExito.textContent = `Último mensaje enviado: ${datos.nombre} (${datos.correo})`;
  }
}