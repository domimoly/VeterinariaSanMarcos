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