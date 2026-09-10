// app.js | lógica compartida por todas las páginas del sitio
// menú hamburguesa, está presente en todas las páginas públicas
const botonMenu = document.querySelector("#boton-menu");
const menuPrincipal = document.querySelector("#menu-principal");

if (botonMenu && menuPrincipal) {
  botonMenu.addEventListener("click", () => {
    const abierto = menuPrincipal.classList.toggle("menu-abierta");
    botonMenu.setAttribute("aria-expanded", String(abierto));
  });
}

/*
// 1. Inicializar LocalStorage si no existe con todo el catálogo de la tienda
    if (!localStorage.getItem('productosVeterinaria')) {
        const productosBase = [
            { codigo: "MED-001", nombre: "Amoxibay 250mg", categoria: "Medicamento", precio: 4200, stock: 15, descripcion: "Antibiótico de amplio espectro.", imagen: "assets/img/amoxibay.jpg" },
            { codigo: "MED-002", nombre: "Enrox 50mg", categoria: "Medicamento", precio: 6800, stock: 12, descripcion: "Antibacteriano para perros y gatos.", imagen: "assets/img/NEXGARD.jpg" },
            { codigo: "MED-003", nombre: "Metrobay 250mg", categoria: "Medicamento", precio: 3900, stock: 20, descripcion: "Antimicrobiano de uso veterinario.", imagen: "assets/img/METROBAY.jpg" },
            { codigo: "ANT-001", nombre: "Nexgard", categoria: "Antiparasitario", precio: 9500, stock: 25, descripcion: "Tableta masticable antiparasitaria.", imagen: "assets/img/NEXGARD.jpg" },
            { codigo: "ANT-002", nombre: "Bravecto", categoria: "Antiparasitario", precio: 18900, stock: 10, descripcion: "Protección de hasta 12 semanas contra pulgas y garrapatas.", imagen: "assets/img/BRAVECTO.png" },
            { codigo: "ANT-003", nombre: "Revolution Plus", categoria: "Antiparasitario", precio: 14500, stock: 14, descripcion: "Protección mensual tópica para gatos.", imagen: "assets/img/REVOLUTIONPLUS.jpg" },
            { codigo: "ANT-004", nombre: "Drontal Plus", categoria: "Antiparasitario", precio: 3200, stock: 30, descripcion: "Desparasitante interno de amplio espectro.", imagen: "assets/img/DONTRALPLUS.jpg" },
            { codigo: "ANT-005", nombre: "Milbemax Gato", categoria: "Antiparasitario", precio: 6800, stock: 18, descripcion: "Tratamiento contra nematodos y cestodos.", imagen: "assets/img/MILBEMAX.jpg" },
            { codigo: "MED-004", nombre: "Meloxicam 1mg", categoria: "Medicamento", precio: 4500, stock: 22, descripcion: "Antiinflamatorio no esteroideo.", imagen: "assets/img/MELOXICAM.jpg" },
            { codigo: "MED-005", nombre: "Carprofen 50mg", categoria: "Medicamento", precio: 9800, stock: 15, descripcion: "Alivio del dolor e inflamación.", imagen: "assets/img/CARPROFEN.jpg" },
            { codigo: "ACC-001", nombre: "Clorhexidina shampoo", categoria: "Accesorio", precio: 8900, stock: 8, descripcion: "Shampoo antiséptico para mascotas.", imagen: "assets/img/Clorhexidina shampoo.jpg" },
            { codigo: "ACC-002", nombre: "Malaseb shampoo", categoria: "Accesorio", precio: 12500, stock: 6, descripcion: "Shampoo medicado antibacteriano y antifúngico.", imagen: "assets/img/Malaseb shampoo.jpg" },
            { codigo: "MED-006", nombre: "Apoquel 16mg", categoria: "Medicamento", precio: 22000, stock: 5, descripcion: "Tratamiento del prurito asociado con dermatitis.", imagen: "assets/img/Apoquel 16mg.png" },
            { codigo: "MED-007", nombre: "Probifor", categoria: "Medicamento", precio: 5600, stock: 25, descripcion: "Suplemento probiótico intestinal.", imagen: "assets/img/PROBIFOR.jpg" },
            { codigo: "MED-008", nombre: "Omeprazol 10mg vet", categoria: "Medicamento", precio: 3800, stock: 30, descripcion: "Protector de la mucosa gástrica.", imagen: "assets/img/Omeprazol 10mg vet.jpg" },
            { codigo: "MED-009", nombre: "Vetmedin 2.5mg", categoria: "Medicamento", precio: 28000, stock: 4, descripcion: "Tratamiento para la insuficiencia cardíaca.", imagen: "assets/img/Vetmedin 2.5mg.jpg" },
            { codigo: "MED-010", nombre: "Tramadol 50mg vet", categoria: "Medicamento", precio: 5200, stock: 15, descripcion: "Analgésico de acción central.", imagen: "assets/img/Tramadol 50mg vet.jpg" },
            { codigo: "MED-011", nombre: "Nobivac DHPPi", categoria: "Medicamento", precio: 8500, stock: 12, descripcion: "Vacuna canina múltiple.", imagen: "assets/img/NOBIVAC DHPPi.jpg" },
            { codigo: "MED-012", nombre: "Nobivac Rabies", categoria: "Medicamento", precio: 5800, stock: 10, descripcion: "Vacuna antirrábica.", imagen: "assets/img/Nobivac Rabies.jpg" },
            { codigo: "MED-013", nombre: "Felocell CVR", categoria: "Medicamento", precio: 7200, stock: 8, descripcion: "Vacuna para la inmunización felina.", imagen: "assets/img/Felocell CVR.jpg" },
            { codigo: "MED-014", nombre: "Omega vet 3-6-9", categoria: "Medicamento", precio: 9900, stock: 10, descripcion: "Suplemento de ácidos grasos.", imagen: "assets/img/Omega.jpg" },
            { codigo: "MED-015", nombre: "Condrovet forte", categoria: "Medicamento", precio: 14500, stock: 12, descripcion: "Condroprotector para el soporte articular.", imagen: "assets/img/Condrovet forte.jpg" }
        ];
        localStorage.setItem('productosVeterinaria', JSON.stringify(productosBase));
        */
    