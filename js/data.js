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
        nombre: "Daniel Administrador",
        usuario: "admindaniel",
        clave: "12345",
        rol: "administracion",
      },
      {
        id: "u_docente",
        nombre: "Daniel Docente",
        usuario: "docentedaniel",
        clave: "12345",
        rol: "docente",
      },
      {
        id: "u_estudiante",
        nombre: "Daniel Estudiante",
        usuario: "estudiantedaniel",
        clave: "12345",
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
        estudianteNombre: "Daniel Estudiante",
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
        autor: "Daniel Administrador",
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
