// Referencia al formulario y al contenedor de la lista
const form = document.getElementById("solicitudForm");
const listaSolicitudes = document.getElementById("listaSolicitudes");

// Nombres legibles para los value de los select
const nombresBarberos = {
  cualquiera: "Sin preferencia",
  darwin: "Darwin Cardona",
  edwin: "Edwin Garcia",
 juan: "Juan Esteban Muñoz"
};

const nombresServicios = {
  corte: "Corte de cabello",
  barba: "Arreglo de barba",
  corte_barba: "Corte + Barba",
  diseno: "Diseño / Línea de cabello",
  otros: "Otros"
};

// Muestra las solicitudes guardadas en el localStorage
function mostrarSolicitudes() {
  let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];

  if (solicitudes.length === 0) {
    listaSolicitudes.innerHTML = '<p class="sin-solicitudes">Aún no hay solicitudes registradas.</p>';
    return;
  }

  listaSolicitudes.innerHTML = "";
  solicitudes.forEach((s) => {
    const card = document.createElement("div");
    card.className = "solicitud-card";
    card.innerHTML = `
      <strong>${s.nombre}</strong> — ${nombresServicios[s.servicio] || s.servicio}
      con ${nombresBarberos[s.barbero] || s.barbero}<br>
      Fecha: ${s.fecha} | Hora: ${s.hora}<br>
      Tel: ${s.telefono} | Correo: ${s.correo}
      ${s.comentarios ? "<br>Comentarios: " + s.comentarios : ""}
    `;
    listaSolicitudes.appendChild(card);
  });
}

// Evento submit: valida, guarda en localStorage y limpia el formulario
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío del formulario y la recarga de la página

  let nombre = document.getElementById("nombre").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let correo = document.getElementById("correo").value.trim();
  let barbero = document.getElementById("barbero").value;
  let servicio = document.getElementById("servicio").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let comentarios = document.getElementById("comentarios").value.trim();

  // Valida que los campos obligatorios no estén vacíos
  if (!nombre || !telefono || !correo || !barbero || !servicio || !fecha || !hora) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  // Valida que la fecha seleccionada no sea anterior a hoy
  const hoy = new Date().toISOString().split("T")[0];
  if (fecha < hoy) {
    alert("La fecha seleccionada no puede ser anterior a hoy.");
    return;
  }

  // Recupera el array de solicitudes del localStorage, si no existe crea un array vacío
  let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];

  solicitudes.push({
    nombre,
    telefono,
    correo,
    barbero,
    servicio,
    fecha,
    hora,
    comentarios
  });

  // Guarda el array en el localStorage
  localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

  alert("Solicitud registrada correctamente 💈");

  form.reset();
  mostrarSolicitudes();
});

// Al cargar la página, muestra las solicitudes ya guardadas
document.addEventListener("DOMContentLoaded", mostrarSolicitudes);