# Requerimientos

Checklist de lo que el sistema debe hacer.

## Autenticación

- [x] Pantalla de login con usuario y contraseña.
- [x] Validación contra la lista de usuarios guardada.
- [x] Mensaje de error si las credenciales son incorrectas.
- [x] Redirección automática al panel correspondiente según el rol.
- [x] Cierre de sesión disponible en todos los paneles.

## Gestión de usuarios (rol administración)

- [x] Ver la lista de todos los usuarios.
- [x] Agregar un usuario nuevo (nombre, usuario, clave, rol).
- [x] Editar un usuario existente.
- [x] Borrar un usuario.

## Módulo académico (notas / asistencia)

- [x] El docente puede cargar una nota y estado de asistencia para un
      estudiante, en una materia y fecha determinadas.
- [x] El docente puede ver y borrar los registros cargados.
- [x] Administración puede ver todos los registros (solo lectura).
- [x] El estudiante/familia solo puede ver sus propios registros, no
      los de otros estudiantes.

## Tablón de avisos

- [x] Administración y docentes pueden publicar avisos (título y
      contenido).
- [x] Todos los roles pueden ver el listado de avisos, ordenado del
      más reciente al más antiguo.
- [x] Administración puede borrar avisos.

## Control de acceso por rol

- [x] Un usuario no puede acceder al panel de otro rol escribiendo la
      URL directamente (queda redirigido al login).
- [x] Cada panel muestra únicamente la información permitida para su
      rol.

## Pendiente / posibles mejoras futuras

- [ ] Validar que no se puedan crear dos usuarios con el mismo nombre
      de usuario.
- [ ] Agregar recuperación de contraseña.
- [ ] Exportar notas/asistencia a un archivo (CSV o PDF).
