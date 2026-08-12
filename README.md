# Intranet Escolar

Sistema web simple de intranet para un colegio, con inicio de sesión por
roles, gestión de usuarios, registro académico (notas y asistencia) y un
tablón de avisos.

## ¿Qué hace este proyecto?

- **Login por roles**: administración, docente y estudiante/familia, cada
  uno con su propio panel.
- **Gestión de usuarios**: administración puede crear, editar y borrar
  usuarios de cualquier rol.
- **Módulo académico**: los docentes cargan notas y asistencia por
  estudiante; cada estudiante ve solo lo suyo.
- **Tablón de avisos**: administración y docentes publican avisos;
  todos los roles pueden leerlos.
- **Separación por rol**: cada usuario solo accede a las páginas que le
  corresponden.

## Tecnologías usadas

HTML, CSS y JavaScript puro (sin frameworks ni backend). Los datos se
guardan en el `localStorage` del navegador, por lo que no hace falta
instalar ni configurar nada para probarlo. Más detalle técnico en
[`docs/arquitectura.md`](docs/arquitectura.md).

## Cómo instalarlo / ejecutarlo

No requiere instalación. Alcanza con:

1. Clonar este repositorio.
   ```bash
   git clone <url-del-repositorio>
   cd intranet-escolar
   ```
2. Abrir el archivo `index.html` con doble clic, o servirlo con una
   extensión tipo "Live Server" si usás VS Code.

## Cómo usarlo

Al abrir `index.html`, se muestra la pantalla de login. Podés entrar con
cualquiera de estos usuarios de prueba (ya vienen cargados la primera
vez que se abre el sistema):

| Rol             | Usuario      | Contraseña      |
| --------------- | ------------ | --------------- |
| Administración  | `admin`      | `admin123`      |
| Docente         | `docente`    | `docente123`    |
| Estudiante      | `estudiante` | `estudiante123` |

Cada rol es redirigido automáticamente a su propio panel
(`admin.html`, `docente.html` o `estudiante.html`).

## Estructura del proyecto

```
intranet-escolar/
├── index.html          # página de login
├── admin.html           # panel de administración
├── docente.html          # panel de docente
├── estudiante.html        # panel de estudiante/familia
├── css/
│   └── style.css          # estilos compartidos
├── js/
│   ├── data.js              # datos y acceso a localStorage
│   ├── sesion.js              # manejo de sesión y protección de rutas
│   ├── login.js                # lógica del formulario de login
│   ├── admin.js                  # lógica del panel de administración
│   ├── docente.js                  # lógica del panel de docente
│   └── estudiante.js                 # lógica del panel de estudiante
└── docs/
    ├── arquitectura.md
    └── requerimientos.md
```

## Documentación relacionada

- [`CONTRIBUTING.md`](CONTRIBUTING.md): cómo trabaja el equipo (ramas,
  commits, revisión de código).
- [`CHANGELOG.md`](CHANGELOG.md): historial de cambios del proyecto.
- [`docs/arquitectura.md`](docs/arquitectura.md): decisiones técnicas.
- [`docs/requerimientos.md`](docs/requerimientos.md): checklist de
  requerimientos funcionales.
- [`CLAUDE.md`](CLAUDE.md): memoria del proyecto para trabajar con
  asistentes de IA.

## Licencia

Proyecto académico, de uso educativo.
