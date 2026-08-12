# CLAUDE.md — Memoria del proyecto

Este archivo le da contexto a cualquier asistente de IA (o a un
integrante nuevo del equipo) para trabajar en este proyecto sin tener
que explicarlo todo de nuevo cada vez.

## 1. Contexto

Este es un sistema de intranet escolar simple, hecho con HTML, CSS y
JavaScript puro. No tiene backend: todos los datos (usuarios, notas,
asistencia, avisos) se guardan en el `localStorage` del navegador.
Los usuarios del sistema son de tres tipos: administración, docentes
y estudiantes/familias.

## 2. Requerimientos

Ver el detalle completo en [`docs/requerimientos.md`](docs/requerimientos.md).
En resumen, el sistema debe permitir:
- Iniciar sesión según rol (administración, docente, estudiante).
- Gestionar usuarios (crear, editar, borrar) desde administración.
- Cargar y consultar notas/asistencia.
- Publicar y consultar avisos.
- Mostrar a cada usuario solo la información que le corresponde según
  su rol.

## 3. Reglas de cómo escribir código en este proyecto

- Nombres de variables, funciones y comentarios en español.
- JavaScript sin frameworks (vanilla JS).
- Cada página HTML carga sus scripts en este orden: `data.js` →
  `sesion.js` → el script propio de la página (`login.js`, `admin.js`,
  `docente.js` o `estudiante.js`).
- Toda función que lea o escriba datos pasa por `data.js`; ningún otro
  archivo debería llamar a `localStorage` directamente.
- Estilos centralizados en `css/style.css`, reutilizando las clases ya
  existentes (`.boton-principal`, `.tarjeta`, etc.) antes de crear
  clases nuevas.

## 4. Restricciones (qué NO hacer nunca)

- No mostrar información de un rol en el panel de otro rol (por
  ejemplo, un estudiante nunca debe poder ver el panel de
  administración ni las notas de otros estudiantes).
- No guardar contraseñas ni datos sensibles reales: este es un
  proyecto académico con datos de ejemplo, no debe usarse en
  producción con datos reales sin agregar seguridad adecuada
  (hashing de contraseñas, backend real, etc.).
- No agregar dependencias externas (frameworks, librerías) sin que el
  equipo lo decida en conjunto, ya que el proyecto está pensado para
  mantenerse simple.

## 5. Objetivos actuales

- [ ] Completar los tres paneles con las funcionalidades mínimas.
- [ ] Ir documentando cada avance en `CHANGELOG.md`.
- [ ] Mantener actualizado `docs/requerimientos.md` como checklist.

## 6. Memoria (decisiones ya tomadas y por qué)

- Se eligió HTML + CSS + JS puro con `localStorage` en lugar de un
  backend con base de datos, porque el enunciado permite un alcance
  modesto y prioriza la documentación por sobre la complejidad técnica.
- La sesión activa se guarda en `sessionStorage` (no en
  `localStorage`) para que se cierre automáticamente al cerrar la
  pestaña del navegador.
- Cada panel llama a `protegerPagina(rolEsperado)` al cargar, para
  evitar que alguien entre a una página que no le corresponde
  cambiando la URL manualmente.

## 7. Buenas prácticas a seguir

- Hacer commits pequeños y frecuentes (ver `CONTRIBUTING.md`).
- Probar cada panel logueándose con cada uno de los tres roles antes
  de dar una funcionalidad por terminada.
- Mantener los mensajes de la interfaz en español y claros para
  usuarios no técnicos (docentes, familias).
