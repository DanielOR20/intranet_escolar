/*
  admin.js
  ---------------------------------------------------------
  🍎 Manzanita: el panel de administración puede:
    - ver, agregar, editar y borrar usuarios (cualquier rol)
    - ver el tablón de avisos completo y publicar avisos
    - ver todas las notas/asistencia cargadas
  ---------------------------------------------------------
*/

let sesion;

document.addEventListener("DOMContentLoaded", () => {
  sesion = protegerPagina("administracion");
  if (!sesion) return;

  document.getElementById("nombre-usuario-activo").textContent = sesion.nombre;
  document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesion);

  configurarFormularioUsuarios();
  renderizarUsuarios();
  renderizarRegistros();
  configurarFormularioAvisos();
  renderizarAvisos();
});

// ---------- Gestión de usuarios ----------

function configurarFormularioUsuarios() {
  const formulario = document.getElementById("form-usuario");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const idEnEdicion = formulario.dataset.editandoId;

    const datos = {
      nombre: document.getElementById("nombre-nuevo").value.trim(),
      usuario: document.getElementById("usuario-nuevo").value.trim(),
      clave: document.getElementById("clave-nueva").value,
      rol: document.getElementById("rol-nuevo").value,
    };

    if (idEnEdicion) {
      editarUsuario(idEnEdicion, datos);
      delete formulario.dataset.editandoId;
      document.getElementById("titulo-form-usuario").textContent = "Agregar usuario";
    } else {
      agregarUsuario(datos);
    }

    formulario.reset();
    renderizarUsuarios();
  });

  document.getElementById("btn-cancelar-edicion").addEventListener("click", () => {
    formulario.reset();
    delete formulario.dataset.editandoId;
    document.getElementById("titulo-form-usuario").textContent = "Agregar usuario";
  });
}

function renderizarUsuarios() {
  const tabla = document.getElementById("cuerpo-tabla-usuarios");
  tabla.innerHTML = "";

  obtenerUsuarios().forEach((usuario) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.usuario}</td>
      <td>${etiquetaRol(usuario.rol)}</td>
      <td class="celda-acciones">
        <button class="boton-secundario" data-accion="editar" data-id="${usuario.id}">Editar</button>
        <button class="boton-peligro" data-accion="borrar" data-id="${usuario.id}">Borrar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  tabla.querySelectorAll('[data-accion="editar"]').forEach((boton) => {
    boton.addEventListener("click", () => iniciarEdicionUsuario(boton.dataset.id));
  });

  tabla.querySelectorAll('[data-accion="borrar"]').forEach((boton) => {
    boton.addEventListener("click", () => {
      if (confirm("¿Borrar este usuario?")) {
        borrarUsuario(boton.dataset.id);
        renderizarUsuarios();
      }
    });
  });
}

function iniciarEdicionUsuario(id) {
  const usuario = obtenerUsuarios().find((u) => u.id === id);
  if (!usuario) return;

  const formulario = document.getElementById("form-usuario");
  formulario.dataset.editandoId = id;
  document.getElementById("titulo-form-usuario").textContent = `Editando a ${usuario.nombre}`;
  document.getElementById("nombre-nuevo").value = usuario.nombre;
  document.getElementById("usuario-nuevo").value = usuario.usuario;
  document.getElementById("clave-nueva").value = usuario.clave;
  document.getElementById("rol-nuevo").value = usuario.rol;
}

function etiquetaRol(rol) {
  const etiquetas = {
    administracion: "Administración",
    docente: "Docente",
    estudiante: "Estudiante / Familia",
  };
  return etiquetas[rol] || rol;
}

// ---------- Ver notas / asistencia (solo lectura para admin) ----------

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
    `;
    tabla.appendChild(fila);
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
      <div class="tarjeta-aviso-encabezado">
        <h3>${aviso.titulo}</h3>
        <button class="boton-peligro" data-id="${aviso.id}">Borrar</button>
      </div>
      <p>${aviso.contenido}</p>
      <p class="tarjeta-aviso-meta">Publicado por ${aviso.autor} el ${aviso.fecha}</p>
    `;
    contenedor.appendChild(tarjeta);
  });

  contenedor.querySelectorAll("button[data-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      borrarAviso(boton.dataset.id);
      renderizarAvisos();
    });
  });
}
