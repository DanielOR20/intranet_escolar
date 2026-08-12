/*
  data.js
  ---------------------------------------------------------
  🍎 Manzanita: este archivo es el "cerebro de los datos".
  Todo lo que el sistema guarda (usuarios, notas/asistencia,
  avisos) vive en localStorage del navegador. Este archivo
  se encarga de:
    1. Crear datos de ejemplo la primera vez que se usa
       (seed data), para que no arranques con todo vacío.
    2. Dar funciones simples para leer y guardar cada cosa,
       así los demás archivos (.js de cada panel) no tocan
       localStorage directamente, sino que llaman a estas
       funciones.
  ---------------------------------------------------------
*/

const DB_KEYS = {
  USERS: "intranet_usuarios",
  RECORDS: "intranet_notas_asistencia",
  NOTICES: "intranet_avisos",
};

// ---------- Utilidades genéricas ----------

function leer(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function guardar(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generarId(prefijo) {
  return `${prefijo}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// ---------- Seed: datos de ejemplo iniciales ----------

function inicializarDatosSiHaceFalta() {
  if (!leer(DB_KEYS.USERS)) {
    const usuariosIniciales = [
      {
        id: "u_admin",
        nombre: "Ana Administradora",
        usuario: "admin",
        clave: "admin123",
        rol: "administracion",
      },
      {
        id: "u_docente",
        nombre: "Diego Docente",
        usuario: "docente",
        clave: "docente123",
        rol: "docente",
      },
      {
        id: "u_estudiante",
        nombre: "Emma Estudiante",
        usuario: "estudiante",
        clave: "estudiante123",
        rol: "estudiante",
      },
    ];
    guardar(DB_KEYS.USERS, usuariosIniciales);
  }

  if (!leer(DB_KEYS.RECORDS)) {
    const registrosIniciales = [
      {
        id: generarId("reg"),
        estudianteId: "u_estudiante",
        estudianteNombre: "Emma Estudiante",
        materia: "Matemática",
        nota: 85,
        asistencia: "presente",
        fecha: new Date().toISOString().slice(0, 10),
        docenteId: "u_docente",
      },
    ];
    guardar(DB_KEYS.RECORDS, registrosIniciales);
  }

  if (!leer(DB_KEYS.NOTICES)) {
    const avisosIniciales = [
      {
        id: generarId("aviso"),
        titulo: "Bienvenidos al ciclo lectivo",
        contenido: "Este es el tablón de avisos de la intranet escolar.",
        autor: "Ana Administradora",
        fecha: new Date().toISOString().slice(0, 10),
      },
    ];
    guardar(DB_KEYS.NOTICES, avisosIniciales);
  }
}

// ---------- Usuarios ----------

function obtenerUsuarios() {
  return leer(DB_KEYS.USERS) || [];
}

function guardarUsuarios(lista) {
  guardar(DB_KEYS.USERS, lista);
}

function buscarUsuarioPorCredenciales(usuario, clave) {
  return obtenerUsuarios().find(
    (u) => u.usuario === usuario && u.clave === clave
  );
}

function agregarUsuario({ nombre, usuario, clave, rol }) {
  const lista = obtenerUsuarios();
  const nuevo = { id: generarId("u"), nombre, usuario, clave, rol };
  lista.push(nuevo);
  guardarUsuarios(lista);
  return nuevo;
}

function editarUsuario(id, cambios) {
  const lista = obtenerUsuarios().map((u) =>
    u.id === id ? { ...u, ...cambios } : u
  );
  guardarUsuarios(lista);
}

function borrarUsuario(id) {
  const lista = obtenerUsuarios().filter((u) => u.id !== id);
  guardarUsuarios(lista);
}

// ---------- Notas / Asistencia ----------

function obtenerRegistros() {
  return leer(DB_KEYS.RECORDS) || [];
}

function guardarRegistros(lista) {
  guardar(DB_KEYS.RECORDS, lista);
}

function agregarRegistro(registro) {
  const lista = obtenerRegistros();
  lista.push({ id: generarId("reg"), ...registro });
  guardarRegistros(lista);
}

function borrarRegistro(id) {
  const lista = obtenerRegistros().filter((r) => r.id !== id);
  guardarRegistros(lista);
}

function obtenerRegistrosDeEstudiante(estudianteId) {
  return obtenerRegistros().filter((r) => r.estudianteId === estudianteId);
}

// ---------- Avisos ----------

function obtenerAvisos() {
  return (leer(DB_KEYS.NOTICES) || []).sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
}

function guardarAvisos(lista) {
  guardar(DB_KEYS.NOTICES, lista);
}

function agregarAviso({ titulo, contenido, autor }) {
  const lista = obtenerAvisos();
  lista.push({
    id: generarId("aviso"),
    titulo,
    contenido,
    autor,
    fecha: new Date().toISOString().slice(0, 10),
  });
  guardarAvisos(lista);
}

function borrarAviso(id) {
  const lista = obtenerAvisos().filter((a) => a.id !== id);
  guardarAvisos(lista);
}

// Se ejecuta apenas se carga este script en cualquier página
inicializarDatosSiHaceFalta();
