# Arquitectura del proyecto

## Stack tecnológico

- **HTML5** para la estructura de las 4 páginas.
- **CSS3** puro para los estilos (un solo archivo compartido,
  `css/style.css`).
- **JavaScript** puro (sin frameworks ni librerías externas).
- **localStorage / sessionStorage** del navegador como "base de
  datos": no hay backend ni servidor.

Se eligió este stack porque no requiere instalar nada (no hace falta
Node, npm, ni una base de datos real) y permite enfocarse en la lógica
de roles, permisos y estructura del proyecto sin la complejidad de
un backend.

## Estructura por capas

```
Páginas (HTML)  →  Lógica de cada página (js/*.js)  →  Datos (data.js)  →  localStorage
                             ↑
                        Sesión (sesion.js)
```

- **`data.js`**: única capa que lee y escribe en `localStorage`.
  Expone funciones como `obtenerUsuarios()`, `agregarUsuario()`,
  `obtenerRegistros()`, `agregarAviso()`, etc. Ningún otro archivo
  accede a `localStorage` directamente.
- **`sesion.js`**: maneja quién inició sesión (guardado en
  `sessionStorage`, no en `localStorage`, para que se cierre al
  cerrar el navegador) y protege cada panel según el rol.
- **`login.js` / `admin.js` / `docente.js` / `estudiante.js`**: lógica
  específica de cada página, usando las funciones de `data.js` y
  `sesion.js`.

## Modelo de datos

### Usuario
```js
{
  id: "u_123",
  nombre: "Ana Administradora",
  usuario: "admin",
  clave: "admin123",
  rol: "administracion" | "docente" | "estudiante"
}
```

### Registro académico (nota/asistencia)
```js
{
  id: "reg_123",
  estudianteId: "u_123",
  estudianteNombre: "Emma Estudiante",
  materia: "Matemática",
  nota: 85,
  asistencia: "presente" | "ausente" | "tardanza",
  fecha: "2026-08-12",
  docenteId: "u_456"
}
```

### Aviso
```js
{
  id: "aviso_123",
  titulo: "Bienvenidos",
  contenido: "Texto del aviso",
  autor: "Ana Administradora",
  fecha: "2026-08-12"
}
```

## Control de acceso por rol

Cada panel (`admin.html`, `docente.html`, `estudiante.html`) llama a
`protegerPagina(rolEsperado)` apenas carga. Esta función:

1. Revisa si hay una sesión activa en `sessionStorage`.
2. Si no hay sesión, o el rol guardado no coincide con el esperado
   para esa página, redirige a `index.html`.

Esto evita que, por ejemplo, un estudiante entre a `admin.html`
escribiendo la URL directamente.

## Limitaciones conocidas

- Al no haber backend, cualquier persona con acceso al navegador
  podría editar `localStorage` manualmente. Es aceptable para un
  proyecto académico, pero no para producción.
- Las contraseñas se guardan en texto plano. En una versión real se
  debería usar un backend con hashing de contraseñas.
