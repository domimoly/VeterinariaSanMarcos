document.addEventListener('DOMContentLoaded', () => {
    
    const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

    function mostrarError(input, mensaje) {
        let errorSpan = input.nextElementSibling;
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

    function validarCorreo(input) {
        const email = input.value.trim();
        if (email.length === 0) return mostrarError(input, 'Requerido.');
        if (email.length > 100) return mostrarError(input, 'Máximo 100 caracteres.');
        
        const partes = email.split('@');
        if (partes.length !== 2) return mostrarError(input, 'Formato inválido.');
        
        if (!dominiosPermitidos.includes(partes[1].toLowerCase())) {
            return mostrarError(input, 'Solo dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com');
        }
        mostrarError(input, ''); 
        return true;
    }

    function validarPassword(input) {
        const pass = input.value;
        if (pass.length === 0) return mostrarError(input, 'Requerido.');
        if (pass.length < 4 || pass.length > 10) return mostrarError(input, 'Debe tener entre 4 y 10 caracteres.');
        mostrarError(input, '');
        return true;
    }

    // --- LÓGICA LOGIN ---
    // ==========================================
    // LÓGICA PARA LA VISTA: INICIAR SESIÓN Y RECUPERACIÓN
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        // Elementos del Login
        const correoLogin = document.getElementById('correo-login');
        const passLogin = document.getElementById('pass-login');
        
        // Elementos de Recuperación
        const linkOlvido = document.getElementById('link-olvido-pass');
        const seccionLogin = document.getElementById('seccion-login');
        const seccionRecuperar = document.getElementById('seccion-recuperar');
        const btnVolver = document.getElementById('btn-volver-login');
        const formRecuperar = document.getElementById('form-recuperar');
        const correoRecuperar = document.getElementById('correo-recuperar');
        
        // --- 1. Validaciones en tiempo real Login ---
        correoLogin.addEventListener('input', () => validarCorreo(correoLogin));
        passLogin.addEventListener('input', () => validarPassword(passLogin));

        // --- VALIDACIÓN Y REDIRECCIÓN AL ENVIAR ---
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue automáticamente

            const isCorreoValid = validarCorreo(correoLogin);
            const isPassValid = validarPassword(passLogin);
            
            // Si hay errores de formato, detenemos el proceso y mostramos las sugerencias
            if (!isCorreoValid || !isPassValid) {
                return; 
            }

            // SIMULACIÓN DE ROLES Y AUTENTICACIÓN
            const emailIngresado = correoLogin.value.trim().toLowerCase();
            const passIngresada = passLogin.value;

            // 1. Caso Administrador (Acceso total al sistema)
            if (emailIngresado === 'admin@duoc.cl' && passIngresada === 'admin123') {
                alert('Bienvenido Administrador. Redirigiendo al panel de control...');
                // Simulamos guardar un token/rol de sesión
                localStorage.setItem('usuarioRol', 'Administrador'); 
                // Redirigimos al Home del Administrador
                window.location.href = 'admin-home.html';
            } 
            // 2. Caso Cliente Normal (Dueño de mascota)
            else if (emailIngresado === 'cliente@gmail.com' && passIngresada === '1234') {
                alert('Inicio de sesión exitoso. Bienvenido a Veterinaria San Marcos.');
                localStorage.setItem('usuarioRol', 'Cliente');
                window.location.href = 'index.html';
            } 
            // 3. Credenciales incorrectas
            else {
                mostrarError(passLogin, 'Correo o contraseña incorrectos.');
            }
        });

        // --- 2. Lógica para alternar vistas (Interacción JS) ---
        if (linkOlvido && seccionLogin && seccionRecuperar) {
            linkOlvido.addEventListener('click', (e) => {
                e.preventDefault(); // Evita que la página salte hacia arriba
                seccionLogin.style.display = 'none'; // Oculta login
                seccionRecuperar.style.display = 'block'; // Muestra recuperación
            });

            btnVolver.addEventListener('click', () => {
                seccionRecuperar.style.display = 'none';
                seccionLogin.style.display = 'block';
                formRecuperar.reset(); // Limpia el formulario al volver
                mostrarError(correoRecuperar, ''); // Limpia mensajes de error
            });
        }

        // --- 3. Validación en tiempo real Recuperar Cuenta ---
        if (correoRecuperar && formRecuperar) {
            correoRecuperar.addEventListener('input', () => validarCorreo(correoRecuperar));

            formRecuperar.addEventListener('submit', (e) => {
                e.preventDefault(); // Evitamos que la página se recargue (simulación)
                
                const isCorreoValid = validarCorreo(correoRecuperar);
                
                if (isCorreoValid) {
                    // Si pasa la validación (largo, formato y dominios permitidos)
                    alert('Correo validado exitosamente. Hemos enviado un enlace de recuperación a: ' + correoRecuperar.value);
                    
                    // Devolvemos al usuario a la pantalla de login
                    seccionRecuperar.style.display = 'none';
                    seccionLogin.style.display = 'block';
                    formRecuperar.reset();
                }
            });
        }
    }

    // --- LÓGICA REGISTRO ---
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        const correoReg = document.getElementById('correo-reg');
        const passReg = document.getElementById('pass-reg');
        const passConf = document.getElementById('pass-conf');
        const runReg = document.getElementById('run-reg');

        correoReg.addEventListener('input', () => validarCorreo(correoReg));
        passReg.addEventListener('input', () => validarPassword(passReg));
        passConf.addEventListener('input', () => {
            if (passConf.value !== passReg.value) mostrarError(passConf, 'Las contraseñas no coinciden.');
            else mostrarError(passConf, '');
        });
        runReg.addEventListener('input', () => {
            const runVal = runReg.value.trim();
            if (runVal.length < 7 || runVal.length > 9) mostrarError(runReg, 'Debe tener entre 7 y 9 caracteres.');
            else if (runVal.includes('.') || runVal.includes('-')) mostrarError(runReg, 'Ingresar sin puntos ni guion.');
            else mostrarError(runReg, '');
        });

        formRegistro.addEventListener('submit', (e) => {
            const isCorreoValid = validarCorreo(correoReg);
            const isPassValid = validarPassword(passReg);
            const isConfValid = passConf.value === passReg.value;
            const runVal = runReg.value.trim();
            const isRunValid = runVal.length >= 7 && runVal.length <= 9 && !runVal.includes('.') && !runVal.includes('-');
            
            if (!isConfValid) mostrarError(passConf, 'Las contraseñas no coinciden.');
            if (!isRunValid) mostrarError(runReg, 'Revisa el formato del RUN.');

            if (!isCorreoValid || !isPassValid || !isConfValid || !isRunValid) {
                e.preventDefault(); 
            }
        });
    }
});