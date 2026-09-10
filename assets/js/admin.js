document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del menú lateral del Administrador en móviles
    const btnMenuAdmin = document.getElementById('btn-menu-admin');
    const adminSidebar = document.getElementById('admin-sidebar');

    if (btnMenuAdmin && adminSidebar) {
        btnMenuAdmin.addEventListener('click', () => {
            adminSidebar.classList.toggle('activa');
        });
    }

    // 2. Elementos de la interfaz de Usuarios
    const vistaLista = document.getElementById('vista-lista-usuarios');
    const vistaFormulario = document.getElementById('vista-formulario-usuario');
    const btnMostrarForm = document.getElementById('btn-mostrar-formulario');
    const btnVolverLista = document.getElementById('btn-volver-lista');
    const formUsuario = document.getElementById('form-admin-usuario');
    const tituloFormulario = document.querySelector('#vista-formulario-usuario h3');
    const btnSubmitForm = document.querySelector('#form-admin-usuario button[type="submit"]');

    // Variable para saber si estamos creando o editando (guardará la fila a editar)
    let filaEnEdicion = null;

    // 3. Alternar entre Tabla y Formulario
    function mostrarFormulario(modo = 'crear') {
        vistaLista.style.display = 'none';
        vistaFormulario.style.display = 'block';
        
        if (modo === 'crear') {
            tituloFormulario.textContent = 'Registrar Nuevo Usuario';
            btnSubmitForm.textContent = 'Crear Usuario';
            formUsuario.reset();
            document.getElementById('admin-run').disabled = false; // El RUN se puede escribir
            document.getElementById('admin-comuna').disabled = true;
            filaEnEdicion = null;
        } else if (modo === 'editar') {
            tituloFormulario.textContent = 'Editar Usuario';
            btnSubmitForm.textContent = 'Actualizar Usuario';
            document.getElementById('admin-run').disabled = true; // El RUN no se edita por seguridad
        }
    }

    function mostrarLista() {
        vistaFormulario.style.display = 'none';
        vistaLista.style.display = 'block';
        filaEnEdicion = null;
    }

    if (btnMostrarForm && btnVolverLista) {
        btnMostrarForm.addEventListener('click', () => mostrarFormulario('crear'));
        btnVolverLista.addEventListener('click', mostrarLista);
    }

    // 4. Arreglo de Regiones y Comunas
    const regionesYcomunas = {
        "rm": { nombre: "Región Metropolitana", comunas: ["Santiago", "Ñuñoa", "Maipú", "Providencia"] },
        "valpo": { nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        "biobio": { nombre: "Región del Bío Bío", comunas: ["Concepción", "Talcahuano", "Los Ángeles"] }
    };

    const selectRegion = document.getElementById('admin-region');
    const selectComuna = document.getElementById('admin-comuna');

    if (selectRegion && selectComuna) {
        // Cargar Regiones iniciales
        for (const clave in regionesYcomunas) {
            const opcion = document.createElement('option');
            opcion.value = clave;
            opcion.textContent = regionesYcomunas[clave].nombre;
            selectRegion.appendChild(opcion);
        }

        // Evento: Cargar Comunas al cambiar Región
        selectRegion.addEventListener('change', (e) => {
            cargarComunas(e.target.value);
        });
    }

    // Función auxiliar para cargar comunas rápidamente (útil al editar)
    function cargarComunas(regionId, comunaSeleccionada = null) {
        selectComuna.innerHTML = '<option value="">-- Seleccione Comuna --</option>'; 
        if (regionId && regionesYcomunas[regionId]) {
            selectComuna.disabled = false;
            regionesYcomunas[regionId].comunas.forEach(comuna => {
                const op = document.createElement('option');
                op.value = comuna.toLowerCase().replace(" ", "-");
                op.textContent = comuna;
                if (op.value === comunaSeleccionada) op.selected = true;
                selectComuna.appendChild(op);
            });
        } else {
            selectComuna.disabled = true;
        }
    }


    // 5. Lógica para EDITAR un usuario desde la tabla
    // Usamos delegación de eventos en la tabla para que funcione con filas nuevas
    const tablaUsuarios = document.querySelector('.tabla-admin');
    if (tablaUsuarios) {
        tablaUsuarios.addEventListener('click', (e) => {
            // Buscamos si el clic fue en un botón de editar o en su icono
            const btnEditar = e.target.closest('.btn-editar');
            
            if (btnEditar) {
                // Obtenemos la fila (tr) donde se hizo clic
                filaEnEdicion = btnEditar.closest('tr');
                const celdas = filaEnEdicion.querySelectorAll('td');
                
                // Extraemos los datos de las celdas
                const run = celdas[0].textContent.trim();
                const nombreCompleto = celdas[1].textContent.trim();
                const correo = celdas[2].textContent.trim();
                const rol = celdas[3].textContent.trim();

                // Llenamos el formulario con los datos extraídos
                // (Asumimos que el nombre completo se pone en "Nombre" para simplificar)
                document.getElementById('admin-run').value = run;
                document.getElementById('admin-nombre').value = nombreCompleto;
                document.getElementById('admin-apellidos').value = ""; // Podrías separar el string si quisieras
                document.getElementById('admin-correo').value = correo;
                
                // Seleccionamos el rol correcto
                const selectRol = document.getElementById('admin-rol');
                for(let i=0; i < selectRol.options.length; i++) {
                    if(selectRol.options[i].value === rol) selectRol.selectedIndex = i;
                }

                // Cambiamos a la vista de formulario en modo edición
                mostrarFormulario('editar');
            }
            
            // Simulación botón eliminar/desactivar
            const btnEliminar = e.target.closest('.btn-eliminar');
            if (btnEliminar) {
                if(confirm("¿Estás seguro de que deseas desactivar este usuario?")) {
                    alert("Usuario desactivado correctamente (Simulación).");
                }
            }
        });
    }

    // 6. Validaciones y Envío del Formulario (Crear o Actualizar)
    if (formUsuario) {
        formUsuario.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const runInput = document.getElementById('admin-run');
            const run = runInput.value.trim();
            const nombre = document.getElementById('admin-nombre').value.trim();
            const apellidos = document.getElementById('admin-apellidos').value.trim();
            const correo = document.getElementById('admin-correo').value.trim();
            const rol = document.getElementById('admin-rol').value;
            const direccion = document.getElementById('admin-direccion').value.trim();

            let errores = [];

            // Validaciones requeridas por el proyecto
            if (run.length < 7 || run.length > 9 || run.includes('.') || run.includes('-')) {
                errores.push("El RUN debe tener entre 7 y 9 caracteres y no contener puntos ni guion.");
            }
            if (!nombre || nombre.length > 50) errores.push("El nombre es requerido (Máx 50).");
            if (!correo || correo.length > 100) errores.push("El correo es requerido (Máx 100).");
            
            const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
            const correoValido = dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
            if (!correoValido) errores.push("Dominio de correo inválido.");

            if (errores.length > 0) {
                alert("Errores:\n- " + errores.join("\n- "));
            } else {
                
                // Definir color del Badge
                let claseRol = 'badge-cliente';
                if (rol === 'Administrador') claseRol = 'badge-admin';
                if (rol === 'Vendedor') claseRol = 'badge-vendedor';

                if (filaEnEdicion) {
                    // MODO EDICIÓN: Actualizamos la fila existente
                    const celdas = filaEnEdicion.querySelectorAll('td');
                    celdas[1].textContent = `${nombre} ${apellidos}`;
                    celdas[2].textContent = correo;
                    celdas[3].innerHTML = `<span class="badge ${claseRol}">${rol}</span>`;
                    
                    alert(`Usuario ${run} actualizado correctamente.`);
                } else {
                    // MODO CREACIÓN: Añadimos una nueva fila
                    const tbody = document.querySelector('.tabla-admin tbody');
                    const nuevaFila = document.createElement('tr');
                    
                    nuevaFila.innerHTML = `
                        <td style="padding: 12px; border-bottom: 1px solid #eee;">${run}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee;">${nombre} ${apellidos}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee;">${correo}</td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee;"><span class="badge ${claseRol}">${rol}</span></td>
                        <td style="padding: 12px; border-bottom: 1px solid #eee;">
                            <button class="btn-accion btn-editar" title="Editar"><i class="fa-solid fa-pen"></i></button>
                            <button class="btn-accion btn-eliminar" title="Desactivar"><i class="fa-solid fa-ban"></i></button>
                        </td>
                    `;
                    tbody.appendChild(nuevaFila);
                    alert(`Usuario creado exitosamente con rol: ${rol}`);
                }

                // Restaurar vista
                mostrarLista();
            }
        });
    }

    // ==========================================
    // MANTENEDOR DE PRODUCTOS
    // ==========================================
// ==========================================
    // MANTENEDOR DE PRODUCTOS (CON LOCALSTORAGE)
    // ==========================================
    const vistaListaProd = document.getElementById('vista-lista-productos');
    const vistaFormProd = document.getElementById('vista-formulario-producto');
    const btnNuevoProd = document.getElementById('btn-nuevo-producto');
    const btnVolverProd = document.getElementById('btn-volver-lista-prod');
    const formProducto = document.getElementById('form-admin-producto');
    const tituloFormProd = document.getElementById('titulo-form-prod');
    const tablaProductosBody = document.querySelector('#tabla-productos tbody');
    
    // Variable para saber qué producto estamos editando
    let filaProdEnEdicion = null; 

    // 1. Inicializar LocalStorage si no existe
    if (!localStorage.getItem('productosVeterinaria')) {
        const productosBase = [
            { codigo: "MED-001", nombre: "Amoxibay 250mg", categoria: "Medicamento", precio: 4200, stock: 45, imagen: "assets/img/amoxibay.jpg" },
            { codigo: "ACC-012", nombre: "Nexgard (2 a 4 kg)", categoria: "Antiparasitario", precio: 9500, stock: 12, imagen: "assets/img/NEXGARD.jpg" }
        ];
        localStorage.setItem('productosVeterinaria', JSON.stringify(productosBase));
    }

    // 2. Función para renderizar la tabla leyendo de LocalStorage
    function cargarTablaProductos() {
        if(!tablaProductosBody) return;
        
        tablaProductosBody.innerHTML = ''; // Limpiar tabla
        const productos = JSON.parse(localStorage.getItem('productosVeterinaria')) || [];

        productos.forEach(prod => {
            // Asignamos color al badge según categoría
            let badgeClass = 'badge-cliente';
            if(prod.categoria === 'Antiparasitario') badgeClass = 'badge-vendedor';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${prod.codigo}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${prod.nombre}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><span class="badge ${badgeClass}">${prod.categoria}</span></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">$${prod.precio.toLocaleString('es-CL')}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${prod.stock} un.</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;" class="celda-acciones">
                    <button class="btn-accion btn-editar" data-codigo="${prod.codigo}" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-accion btn-eliminar" data-codigo="${prod.codigo}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tablaProductosBody.appendChild(tr);
        });
    }

    // Cargar la tabla al iniciar la página
    cargarTablaProductos();

    // 3. Alternar vistas
    function mostrarFormularioProd(modo = 'crear', codigoEdicion = null) {
        vistaListaProd.style.display = 'none';
        vistaFormProd.style.display = 'block';
        if (modo === 'crear') {
            tituloFormProd.textContent = 'Registrar Nuevo Producto';
            formProducto.reset();
            document.getElementById('prod-codigo').disabled = false;
            filaProdEnEdicion = null;
        } else {
            tituloFormProd.textContent = 'Editar Producto';
            document.getElementById('prod-codigo').disabled = true; // El código no se edita
            filaProdEnEdicion = codigoEdicion;
        }
    }

    if (btnNuevoProd && btnVolverProd) {
        btnNuevoProd.addEventListener('click', () => mostrarFormularioProd('crear'));
        btnVolverProd.addEventListener('click', () => {
            vistaFormProd.style.display = 'none';
            vistaListaProd.style.display = 'block';
        });
    }

    // 4. Funciones de validación en tiempo real (Rúbrica)
    function validarInputProd(input, condicion, mensajeError) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-msg')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-msg');
            errorSpan.style.color = '#e74c3c';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '5px';
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }

        if (!condicion) {
            errorSpan.textContent = mensajeError;
            input.style.borderColor = '#e74c3c';
            return false;
        } else {
            errorSpan.textContent = '';
            input.style.borderColor = '#ccc';
            return true;
        }
    }

    if (formProducto) {
        const inputCodigo = document.getElementById('prod-codigo');
        const inputNombre = document.getElementById('prod-nombre');
        const inputPrecio = document.getElementById('prod-precio');
        const inputStock = document.getElementById('prod-stock');

        // Validaciones en tiempo real
        inputCodigo.addEventListener('input', () => validarInputProd(inputCodigo, inputCodigo.value.trim().length >= 3, 'El código debe tener al menos 3 caracteres.'));
        inputNombre.addEventListener('input', () => validarInputProd(inputNombre, inputNombre.value.trim().length > 0 && inputNombre.value.length <= 100, 'El nombre es obligatorio (Máx 100 caracteres).'));
        inputPrecio.addEventListener('input', () => validarInputProd(inputPrecio, parseFloat(inputPrecio.value) >= 0, 'El precio debe ser 0 (Gratis) o mayor.'));
        inputStock.addEventListener('input', () => validarInputProd(inputStock, Number.isInteger(Number(inputStock.value)) && parseInt(inputStock.value) >= 0, 'El stock debe ser un número entero mayor o igual a 0.'));

        // 5. Envío del Formulario (Guardar en LocalStorage)
        formProducto.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const codigo = inputCodigo.value.trim();
            const nombre = inputNombre.value.trim();
            const categoria = document.getElementById('prod-categoria').value;
            const precio = parseFloat(inputPrecio.value);
            const stock = parseInt(inputStock.value);
            const descripcion = document.getElementById('prod-descripcion').value.trim();
            const imagen = document.getElementById('prod-imagen').value.trim() || 'assets/img/amoxibay.jpg';

            // Doble validación al enviar
            const isCodigoValid = codigo.length >= 3;
            const isNombreValid = nombre.length > 0 && nombre.length <= 100;
            const isPrecioValid = precio >= 0;
            const isStockValid = Number.isInteger(stock) && stock >= 0;
            const isCategoriaValid = categoria !== "";

            if (!isCodigoValid || !isNombreValid || !isPrecioValid || !isStockValid || !isCategoriaValid) {
                alert("Por favor, corrige los errores marcados en el formulario antes de guardar.");
                return;
            }

            let productos = JSON.parse(localStorage.getItem('productosVeterinaria')) || [];

            if (filaProdEnEdicion) {
                // Modo Edición: Encontrar y actualizar el producto
                const index = productos.findIndex(p => p.codigo === filaProdEnEdicion);
                if(index !== -1) {
                    productos[index] = { ...productos[index], nombre, categoria, precio, stock, descripcion, imagen };
                    alert(`Producto ${filaProdEnEdicion} actualizado correctamente.`);
                }
            } else {
                // Modo Creación: Verificar si existe el código y agregarlo
                if(productos.some(p => p.codigo === codigo)) {
                    alert("El código de producto ya existe.");
                    return;
                }
                productos.push({ codigo, nombre, categoria, precio, stock, descripcion, imagen });
                alert(`Producto ${nombre} creado exitosamente.`);
            }

            // Guardar el arreglo actualizado en localStorage y refrescar la tabla
            localStorage.setItem('productosVeterinaria', JSON.stringify(productos));
            cargarTablaProductos();
            
            vistaFormProd.style.display = 'none';
            vistaListaProd.style.display = 'block';
        });

        // 6. Lógica de Edición y Eliminación desde los botones de la tabla
        const tablaProductos = document.getElementById('tabla-productos');
        if (tablaProductos) {
            tablaProductos.addEventListener('click', (e) => {
                const btnEditar = e.target.closest('.btn-editar');
                const btnEliminar = e.target.closest('.btn-eliminar');
                let productos = JSON.parse(localStorage.getItem('productosVeterinaria')) || [];

                if (btnEditar) {
                    const cod = btnEditar.getAttribute('data-codigo');
                    const prod = productos.find(p => p.codigo === cod);
                    
                    if(prod) {
                        // Rellenamos el formulario con los datos del LocalStorage
                        document.getElementById('prod-codigo').value = prod.codigo;
                        document.getElementById('prod-nombre').value = prod.nombre;
                        document.getElementById('prod-categoria').value = prod.categoria;
                        document.getElementById('prod-precio').value = prod.precio;
                        document.getElementById('prod-stock').value = prod.stock;
                        document.getElementById('prod-descripcion').value = prod.descripcion || '';
                        document.getElementById('prod-imagen').value = prod.imagen || '';
                        
                        mostrarFormularioProd('editar', prod.codigo);
                    }
                }

                if (btnEliminar) {
                    const cod = btnEliminar.getAttribute('data-codigo');
                    if(confirm(`¿Estás seguro de que deseas eliminar el producto ${cod} permanentemente?`)) {
                        // Filtramos el arreglo para quitar el producto y volvemos a guardar
                        productos = productos.filter(p => p.codigo !== cod);
                        localStorage.setItem('productosVeterinaria', JSON.stringify(productos));
                        cargarTablaProductos();
                    }
                }
            });
        }
    }
 /*   if (!localStorage.getItem('productosVeterinaria')) {
        const productosBase = [
            { codigo: "MED-001", nombre: "Amoxibay 250mg", categoria: "Medicamento", precio: 4200, stock: 10, imagen: "assets/img/amoxibay.jpg" },
            { codigo: "MED-002", nombre: "Enrox 50mg", categoria: "Medicamento", precio: 6800, stock: 10, imagen: "assets/img/NEXGARD.jpg" },
            { codigo: "MED-003", nombre: "Metrobay 250mg", categoria: "Medicamento", precio: 3900, stock: 10, imagen: "assets/img/METROBAY.jpg" },
            { codigo: "ANT-004", nombre: "Nexgard", categoria: "Antiparasitario", precio: 9500, stock: 10, imagen: "assets/img/NEXGARD.jpg" },
            { codigo: "ANT-005", nombre: "Bravecto", categoria: "Antiparasitario", precio: 18900, stock: 10, imagen: "assets/img/BRAVECTO.png" }
            
        ];
        localStorage.setItem('productosVeterinaria', JSON.stringify(productosBase));
    }
        */
});