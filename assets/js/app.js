const botonBienvenida = document.querySelector("#boton-bienvenida");

if (botonBienvenida) {
  botonBienvenida.addEventListener("click", () => {
    alert("Veterinaria San Marcos se construye paso a paso.");
  });
}

// Lógica para abrir y cerrar el menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btn-menu');
    const navegacion = document.getElementById('navegacion');

    if(btnMenu && navegacion) {
        btnMenu.addEventListener('click', () => {
            navegacion.classList.toggle('activa');
        });
    }
});


/* PERFIL */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Lógica del Menú Hamburguesa (Mantenemos lo que ya tenías) ---
    const btnMenu = document.getElementById('btn-menu');
    const navegacion = document.getElementById('navegacion');
    if(btnMenu && navegacion) {
        btnMenu.addEventListener('click', () => {
            navegacion.classList.toggle('activa');
        });
    }

    // --- 2. Lógica de Validaciones de Formularios ---
    
    // Reglas de negocio definidas en el documento
    const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    
    // Función genérica para mostrar/ocultar errores
    function mostrarError(input, mensaje) {
        let errorSpan = input.nextElementSibling;
        // Si no existe el span de error, lo creamos dinámicamente
        if (!errorSpan || !errorSpan.classList.contains('error-msg')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-msg');
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        
        if (mensaje) {
            errorSpan.textContent = mensaje;
            input.classList.add('input-error');
        } else {
            errorSpan.textContent = '';
            input.classList.remove('input-error');
        }
    }

    // Función para validar Correo
    function validarCorreo(input) {
        const email = input.value.trim();
        if (email.length === 0) return mostrarError(input, 'El correo es obligatorio.');
        if (email.length > 100) return mostrarError(input, 'El correo no puede exceder 100 caracteres.');
        
        const partes = email.split('@');
        if (partes.length !== 2) return mostrarError(input, 'Formato de correo inválido.');
        
        const dominio = partes[1].toLowerCase();
        if (!dominiosPermitidos.includes(dominio)) {
            return mostrarError(input, 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        }
        
        mostrarError(input, ''); // Sin errores
        return true;
    }

    // Función para validar Contraseña (Login)
    function validarPassword(input) {
        const pass = input.value;
        if (pass.length === 0) return mostrarError(input, 'La contraseña es obligatoria.');
        if (pass.length < 4 || pass.length > 10) {
            return mostrarError(input, 'La contraseña debe tener entre 4 y 10 caracteres.');
        }
        mostrarError(input, '');
        return true;
    }

    // Función para confirmar contraseñas (Registro)
    function validarConfirmacion(inputPass, inputConf) {
        if (inputConf.value !== inputPass.value) {
            return mostrarError(inputConf, 'Las contraseñas no coinciden.');
        }
        mostrarError(inputConf, '');
        return true;
    }

    // --- Aplicar validaciones en tiempo real (Formulario Login) ---
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        const inputCorreoLogin = document.getElementById('correo-login');
        const inputPassLogin = document.getElementById('pass-login');

        // Validar mientras escribe (Tiempo real)
        inputCorreoLogin.addEventListener('input', () => validarCorreo(inputCorreoLogin));
        inputPassLogin.addEventListener('input', () => validarPassword(inputPassLogin));

        // Validar al enviar el formulario
        formLogin.addEventListener('submit', (e) => {
            const correoValido = validarCorreo(inputCorreoLogin);
            const passValida = validarPassword(inputPassLogin);

            if (!correoValido || !passValida) {
                e.preventDefault(); // Detiene el envío si hay errores
            }
        });
    }

    // --- Aplicar validaciones en tiempo real (Formulario Registro) ---
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        const inputCorreoReg = document.getElementById('correo-reg');
        const inputPassReg = document.getElementById('pass-reg');
        const inputPassConf = document.getElementById('pass-conf-reg');

        inputCorreoReg.addEventListener('input', () => validarCorreo(inputCorreoReg));
        inputPassReg.addEventListener('input', () => validarPassword(inputPassReg));
        inputPassConf.addEventListener('input', () => validarConfirmacion(inputPassReg, inputPassConf));

        formRegistro.addEventListener('submit', (e) => {
            const correoValido = validarCorreo(inputCorreoReg);
            const passValida = validarPassword(inputPassReg);
            const confValida = validarConfirmacion(inputPassReg, inputPassConf);

            if (!correoValido || !passValida || !confValida) {
                e.preventDefault(); 
            }
        });
    }
});
