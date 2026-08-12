/*
  login.js
  ---------------------------------------------------------
  🍎 Manzanita: valida usuario y clave contra la lista de
  usuarios guardada por data.js, y si coincide, guarda la
  sesión y redirige al panel correspondiente según el rol.
  ---------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {
  // Si ya había una sesión activa, mandamos directo a su panel
  const sesionExistente = obtenerSesion();
  if (sesionExistente) {
    redirigirSegunRol(sesionExistente.rol);
    return;
  }

  const formulario = document.getElementById("form-login");
  const mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value;

    const encontrado = buscarUsuarioPorCredenciales(usuario, clave);

    if (!encontrado) {
      mensajeError.textContent = "Usuario o contraseña incorrectos.";
      mensajeError.hidden = false;
      return;
    }

    iniciarSesion(encontrado);
    redirigirSegunRol(encontrado.rol);
  });
});
