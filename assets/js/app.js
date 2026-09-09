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