<div align="center">

# 🐾 Veterinaria San Marcos | Versión 1.0🐾

### Plataforma web para la gestión digital de una clínica veterinaria

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Dise%C3%B1o-Responsive-2ea44f?style=for-the-badge)
![Status](https://img.shields.io/badge/Estado-En%20desarrollo-yellow?style=for-the-badge)

</div>

---

## Autoría y créditos

- **Desarrollo:** Maximiliano Astudillo - José Barrientos - Dominga Ruiz
- **Asignatura:** Desarrollo FullStack II — DSY1104 - 009D 
- **Recursos visuales:** imágenes utilizadas estrictamente con fines académicos.

--- 

## Sobre el proyecto

**Veterinaria San Marcos** Simula la plataforma web de una clínica veterinaria real ubicada en Rancagua, con el objetivo de digitalizar procesos que hoy se realizan en papel: agendamiento de citas, fichas clínicas y control de vacunación.

La interfaz está pensada para tres tipos de personas: el **tutor de una mascota**, que necesita agendar horas y revisar el historial de su mascota sin llamar por teléfono; el **personal de la clínica**, que gestiona la atención diaria; y quien simplemente quiere conocer los servicios de la veterinaria.

> Este repositorio corresponde al frontend estático del proyecto. La lógica de negocio (autenticación, roles y persistencia de datos) se conectará a los microservicios backend descritos en la sección [Contexto del proyecto](#-contexto-del-proyecto) próximamente.

---

## Contexto del proyecto

Veterinaria San Marcos es una clínica fundada en 2009 en Rancagua que atiende un promedio de 25 pacientes al día entre perros, gatos, conejos y aves. Hoy su agenda y sus fichas clínicas se manejan en papel, lo que provoca fichas extraviadas, ausencias sin recordatorio y falta de historial digital de vacunación.

El proyecto busca resolver eso mediante una aplicación donde:

- Los dueños solicitan y revisan sus citas sin llamar por teléfono.
- Los médicos acceden al historial completo de cada paciente desde cualquier dispositivo.
- Diagnósticos, vacunas y medicamentos quedan registrados digitalmente.
- Los dueños reciben aviso antes del vencimiento de una vacuna.
- La clínica genera reportes de atención sin revisar archivadores.

La solución completa contempla un backend de **microservicios en Spring Boot** con base de datos relacional, comunicación vía **API REST/JSON**, autenticación con roles y un mapa interactivo (Leaflet / Google Maps) para ubicar la clínica.

---

## Características principales

| | Característica | Descripción |
|---|---|---|
| **Diseño responsivo** | Interfaz adaptable a móviles (≥360px), tablets (≥768px) y escritorio (≥1280px). |
| **CSS modular** | Estilos separados por sección (`style`, `servicios`, `blogs`, etc.) para mantener el código ordenado. |
| **Catálogo de servicios** | Vistas detalladas para Consultas, Cirugías, Vacunas, Exámenes y Desparasitación. |
| **Blog educativo** | Artículos enfocados en la tenencia responsable de mascotas. |
| **Formularios estructurados** | Contacto, inicio de sesión, registro y perfil de usuario. |
| **Accesibilidad** | HTML5 semántico y atributos ARIA. |
| **Tienda y carrito** | Módulo e-commerce en desarrollo para venta de productos veterinarios. |

---

## Tecnologías utilizadas

<div align="center">

| Tecnología | Uso en el proyecto |
|---|---|
| **HTML5** | Estructura semántica de todas las vistas |
| **CSS3** | Flexbox, CSS Grid, variables nativas y media queries |
| **JavaScript (Vanilla)** | Lógica de menús e interacciones del cliente |
| **Font Awesome** | Sistema de iconos vectoriales |

</div>

---

## Estructura del proyecto

```
VeterinariaSanMarcos/
│
├── assets/
│   ├── css/          → Hojas de estilo modulares (style.css, servicios.css, ...)
│   ├── img/           → Recursos gráficos, logos y fotografías
│   └── js/            → Scripts de interacción (app.js, contacto.js, ...)
│
├── index.html                     → Página de inicio
├── nosotros.html                  → Quiénes somos
├── servicios.html                 → Catálogo general de servicios médicos
├── detalle-servicios-*.html       → Vista específica de cada servicio
├── blogs.html                     → Listado de artículos educativos
├── detalle-blog-*.html            → Vista específica de cada artículo
├── contacto.html                  → Formulario de contacto y ubicación
├── login.html                     → Autenticación de usuarios
├── registro.html                  → Creación de cuentas
├── mi-perfil.html                 → Perfil del usuario autenticado
├── tienda.html                    → Catálogo e-commerce (en desarrollo)
├── carrito.html                   → Carrito de compras
└── README.md
```

---

## Instalación y uso

Al ser un proyecto frontend estático, **no requiere instalaciones ni bases de datos locales** para visualizarse.

**1. Clona el repositorio**
```bash
git clone https://github.com/domimoly/VeterinariaSanMarcos.git
```

**2. Abre el proyecto**

Navega a la carpeta descargada y abre `index.html` en tu navegador de preferencia (Chrome, Firefox, Edge, Safari).

**3. Modo desarrollo (recomendado)**

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server** para ver los cambios en tiempo real.

---

## Roles de usuario

| Rol | Descripción | Accesos |
|---|---|---|
| **Administrador** | Gestiona el sistema completo. | Crear, editar y desactivar usuarios; asignar roles; ver todos los reportes. |
| **Recepcionista / Operador** | Personal interno de la clínica. | Ver, confirmar y reagendar citas; registrar y editar fichas de pacientes. |
| **Dueño de mascota** | Cliente que solicita atención. | Solicitar citas, ver su estado y consultar el historial clínico de sus propias mascotas. |

---

## Próximas mejoras

- [ ] Integración con backend de microservicios (Spring Boot + API REST)
- [ ] Autenticación real y control de acceso basado en roles (RBAC)
- [ ] Mapa interactivo con la ubicación de la clínica
- [ ] Flujo completo de solicitud y confirmación de citas
- [ ] Historial de vacunación con notificaciones de vencimiento
- [ ] Finalizar módulo de tienda y carrito de compras

---
