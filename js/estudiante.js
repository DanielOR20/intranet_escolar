let sesion;

document.addEventListener("DOMContentLoaded", () => {
  sesion = protegerPagina("estudiante");
  if (!sesion) return;

  document.getElementById("nombre-usuario-activo").textContent = sesion.nombre;
  document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesion);

  renderizarMisRegistros();
  renderizarAvisos();
});

function renderizarMisRegistros() {
  const tabla = document.getElementById("cuerpo-tabla-registros");
  tabla.innerHTML = "";

  const misRegistros = obtenerRegistrosDeEstudiante(sesion.id);

  if (misRegistros.length === 0) {
    tabla.innerHTML = `<tr><td colspan="4">Todavía no tenés notas ni asistencia registradas.</td></tr>`;
    return;
  }

  misRegistros.forEach((registro) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${registro.materia}</td>
      <td>${registro.nota}</td>
      <td>${registro.asistencia}</td>
      <td>${registro.fecha}</td>
    `;
    tabla.appendChild(fila);
  });
}

function renderizarAvisos() {
  const contenedor = document.getElementById("lista-avisos");
  contenedor.innerHTML = "";

  obtenerAvisos().forEach((aviso) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-aviso";
    tarjeta.innerHTML = `
      <h3>${aviso.titulo}</h3>
      <p>${aviso.contenido}</p>
      <p class="tarjeta-aviso-meta">Publicado por ${aviso.autor} el ${aviso.fecha}</p>
    `;
    contenedor.appendChild(tarjeta);
  });
}
