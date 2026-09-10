document.addEventListener('DOMContentLoaded', () => {
    // Lógica del menú lateral del Administrador en móviles
    const btnMenuAdmin = document.getElementById('btn-menu-admin');
    const adminSidebar = document.getElementById('admin-sidebar');

    if (btnMenuAdmin && adminSidebar) {
        btnMenuAdmin.addEventListener('click', () => {
            adminSidebar.classList.toggle('activa');
        });
    }
});