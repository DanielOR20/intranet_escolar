/*
  docente.js
  ---------------------------------------------------------
  🍎 Manzanita: el docente puede:
    - ver la lista de estudiantes
    - cargar notas/asistencia para un estudiante
    - ver el tablón de avisos y publicar avisos nuevos
  ---------------------------------------------------------
*/

let sesion;

document.addEventListener("DOMContentLoaded", () => {
  sesion = protegerPagina("docente");
  if (!sesion) return;

  document.getElementById("nombre-usuario-activo").textContent = sesion.nombre;
  document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesion);

  llenarSelectDeEstudiantes();
  configurarFormularioRegistro();
  renderizarRegistros();
  configurarFormularioAvisos();
  renderizarAvisos();
});

// ---------- Notas / Asistencia ----------

function llenarSelectDeEstudiantes() {
  const select = document.getElementById("select-estudiante");
  const estudiantes = obtenerUsuarios().filter((u) => u.rol === "estudiante");

  select.innerHTML = estudiantes
    .map((est) => `<option value="${est.id}">${est.nombre}</option>`)
    .join("");
}

function configurarFormularioRegistro() {
  const formulario = document.getElementById("form-registro");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const select = document.getElementById("select-estudiante");
    const estudianteId = select.value;
    const estudianteNombre = select.options[select.selectedIndex]?.text || "";

    agregarRegistro({
      estudianteId,
      estudianteNombre,
      materia: document.getElementById("materia").value.trim(),
      nota: Number(document.getElementById("nota").value),
      asistencia: document.getElementById("asistencia").value,
      fecha: new Date().toISOString().slice(0, 10),
      docenteId: sesion.id,
    });

    formulario.reset();
    renderizarRegistros();
  });
}

function renderizarRegistros() {
  const tabla = document.getElementById("cuerpo-tabla-registros");
  tabla.innerHTML = "";

  obtenerRegistros().forEach((registro) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${registro.estudianteNombre}</td>
      <td>${registro.materia}</td>
      <td>${registro.nota}</td>
      <td>${registro.asistencia}</td>
      <td>${registro.fecha}</td>
      <td><button class="boton-peligro" data-id="${registro.id}">Borrar</button></td>
    `;
    tabla.appendChild(fila);
  });

  tabla.querySelectorAll("button[data-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      borrarRegistro(boton.dataset.id);
      renderizarRegistros();
    });
  });
}

// ---------- Avisos ----------

function configurarFormularioAvisos() {
  const formulario = document.getElementById("form-aviso");
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    agregarAviso({
      titulo: document.getElementById("titulo-aviso").value.trim(),
      contenido: document.getElementById("contenido-aviso").value.trim(),
      autor: sesion.nombre,
    });

    formulario.reset();
    renderizarAvisos();
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
