const SESSION_KEY = "intranet_sesion_activa";

function iniciarSesion(usuario) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
}

function obtenerSesion() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function cerrarSesion() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}

// 🍎 Cada rol solo puede estar en su propia página.
function protegerPagina(rolEsperado) {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = "index.html";
    return null;
  }
  if (sesion.rol !== rolEsperado) {
    window.location.href = "index.html";
    return null;
  }
  return sesion;
}

function redirigirSegunRol(rol) {
  if (rol === "administracion") window.location.href = "admin.html";
  else if (rol === "docente") window.location.href = "docente.html";
  else if (rol === "estudiante") window.location.href = "estudiante.html";
}
