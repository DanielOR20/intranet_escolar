# Changelog

Todos los cambios importantes de este proyecto se documentan en este
archivo.

## [0.1.0] - Fecha inicial del proyecto

### Agregado
- Estructura inicial del repositorio.
- Documentación base: `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`,
  `docs/arquitectura.md`, `docs/requerimientos.md`.
- Página de login (`index.html`) con validación contra usuarios
  guardados en `localStorage`.
- Panel de administración (`admin.html`): alta, edición y borrado de
  usuarios; vista de notas/asistencia; publicación de avisos.
- Panel de docente (`docente.html`): carga de notas/asistencia por
  estudiante; publicación de avisos.
- Panel de estudiante/familia (`estudiante.html`): vista de notas y
  asistencia propias; lectura de avisos.
- Manejo de sesión por rol (`sesion.js`), con redirección automática y
  protección de cada panel según el rol correspondiente.
- Datos de ejemplo (usuarios, notas y avisos) que se cargan
  automáticamente la primera vez que se abre el sistema.

<!--
🍎 Manzanita: a medida que agregues funcionalidades nuevas, sumá una
nueva sección con la fecha o el número de versión, siguiendo el mismo
formato: Agregado / Cambiado / Corregido / Eliminado.
-->
