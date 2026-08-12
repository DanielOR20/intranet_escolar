# Guía de contribución

Este documento explica cómo el equipo trabaja sobre este repositorio.

## Ramas

- `main`: siempre debe quedar en un estado funcional.
- Para cada tarea o funcionalidad, crear una rama a partir de `main`
  con un nombre descriptivo, por ejemplo:
  - `feature/login-roles`
  - `feature/tablon-avisos`
  - `fix/validacion-formulario-usuario`

## Commits

- Hacer commits pequeños y frecuentes, no un único commit gigante al
  final.
- Escribir el mensaje en presente y describiendo el cambio, por
  ejemplo:
  - `agrego formulario de login`
  - `corrijo validacion de clave vacia`
  - `documento arquitectura del proyecto`

## Flujo de trabajo

1. Crear una rama desde `main`.
2. Hacer los cambios y commitear seguido.
3. Subir la rama (`git push`) y abrir un Pull Request hacia `main`.
4. Al menos un integrante del equipo revisa el Pull Request antes de
   aprobarlo (revisión de código).
5. Una vez aprobado, se hace merge a `main`.

## Revisión de código

Al revisar un Pull Request, fijarse en:

- Que el código funcione (probarlo localmente si es posible).
- Que los nombres de variables y funciones sean claros.
- Que no queden `console.log` de prueba olvidados.
- Que la documentación (`README.md`, `docs/`, `CHANGELOG.md`) se haya
  actualizado si el cambio lo amerita.

## Estilo de código

- JavaScript en español, nombres descriptivos (ver el código existente
  como referencia).
- Indentación de 2 espacios.
- Comentarios cortos explicando el "por qué", no el "qué" (el código ya
  dice qué hace).
