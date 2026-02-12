/***********************
 MODELO DE DATOS
************************/

const lugares = [
  {
    id: 1,
    nombre: "Santiago",
    tempActual: 28,
    estadoActual: "Soleado",
    pronosticoSemanal: [
      { dia: "Lunes", min: 18, max: 30, estado: "Soleado" },
      { dia: "Martes", min: 17, max: 29, estado: "Soleado" },
      { dia: "Miércoles", min: 16, max: 27, estado: "Nublado" },
      { dia: "Jueves", min: 15, max: 26, estado: "Soleado" },
      { dia: "Viernes", min: 14, max: 25, estado: "Nublado" }
    ]
  },
  {
    id: 2,
    nombre: "Valparaíso",
    tempActual: 20,
    estadoActual: "Nublado",
    pronosticoSemanal: [
      { dia: "Lunes", min: 15, max: 21, estado: "Nublado" },
      { dia: "Martes", min: 14, max: 20, estado: "Soleado" },
      { dia: "Miércoles", min: 13, max: 19, estado: "Nublado" },
      { dia: "Jueves", min: 14, max: 22, estado: "Soleado" },
      { dia: "Viernes", min: 15, max: 23, estado: "Soleado" }
    ]
  },
  {
    id: 3,
    nombre: "Concepción",
    tempActual: 18,
    estadoActual: "Lluvioso",
    pronosticoSemanal: [
      { dia: "Lunes", min: 12, max: 18, estado: "Lluvioso" },
      { dia: "Martes", min: 11, max: 17, estado: "Lluvioso" },
      { dia: "Miércoles", min: 10, max: 16, estado: "Nublado" },
      { dia: "Jueves", min: 9, max: 15, estado: "Lluvioso" },
      { dia: "Viernes", min: 11, max: 17, estado: "Nublado" }
    ]
  },
  {
    id: 4,
    nombre: "La Serena",
    tempActual: 24,
    estadoActual: "Soleado",
    pronosticoSemanal: [
      { dia: "Lunes", min: 16, max: 25, estado: "Soleado" },
      { dia: "Martes", min: 15, max: 24, estado: "Soleado" },
      { dia: "Miércoles", min: 14, max: 23, estado: "Nublado" },
      { dia: "Jueves", min: 15, max: 26, estado: "Soleado" },
      { dia: "Viernes", min: 17, max: 27, estado: "Soleado" }
    ]
  },
  {
    id: 5,
    nombre: "Punta Arenas",
    tempActual: 8,
    estadoActual: "Ventoso",
    pronosticoSemanal: [
      { dia: "Lunes", min: 3, max: 9, estado: "Ventoso" },
      { dia: "Martes", min: 2, max: 8, estado: "Nublado" },
      { dia: "Miércoles", min: 1, max: 7, estado: "Lluvioso" },
      { dia: "Jueves", min: 0, max: 6, estado: "Ventoso" },
      { dia: "Viernes", min: 2, max: 9, estado: "Ventoso" }
    ]
  }
];


/***********************
 FUNCIONES
************************/

// Buscar lugar por ID
function obtenerLugarPorId(id) {
  return lugares.find(lugar => lugar.id === id);
}


// Calcular estadísticas semanales
function calcularEstadisticas(pronostico) {

  let minTemp = pronostico[0].min;
  let maxTemp = pronostico[0].max;
  let sumaPromedios = 0;
  let conteoEstados = {};

  for (let i = 0; i < pronostico.length; i++) {

    const dia = pronostico[i];

    if (dia.min < minTemp) minTemp = dia.min;
    if (dia.max > maxTemp) maxTemp = dia.max;

    sumaPromedios += (dia.min + dia.max) / 2;

    if (conteoEstados[dia.estado]) {
      conteoEstados[dia.estado]++;
    } else {
      conteoEstados[dia.estado] = 1;
    }
  }

  const promedio = (sumaPromedios / pronostico.length).toFixed(1);

  // Determinar clima predominante
  let climaPredominante = Object.keys(conteoEstados)[0];

  for (let estado in conteoEstados) {
    if (conteoEstados[estado] > conteoEstados[climaPredominante]) {
      climaPredominante = estado;
    }
  }

  // Generar resumen textual
  let resumen = "";

  if (climaPredominante === "Soleado") {
    resumen = "Semana mayormente soleada ☀️";
  } else if (climaPredominante === "Lluvioso") {
    resumen = "Semana con lluvias frecuentes 🌧️";
  } else if (climaPredominante === "Ventoso") {
    resumen = "Semana con fuertes vientos 💨";
  } else {
    resumen = `Semana con predominio de clima ${climaPredominante}`;
  }

  return {
    minTemp,
    maxTemp,
    promedio,
    conteoEstados,
    resumen,
    climaPredominante
  };
}


/***********************
 RENDER HOME
************************/

function renderHome() {

  const app = document.getElementById("app");
  app.innerHTML = "<h2>Ciudades disponibles</h2>";

  const container = document.createElement("div");
  container.classList.add("card-container");

  lugares.forEach(lugar => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${lugar.nombre}</h3>
      <p>🌡️ ${lugar.tempActual}°C</p>
      <p>Estado: ${lugar.estadoActual}</p>
    `;

    card.addEventListener("click", () => {
      renderDetalle(lugar.id);
    });

    container.appendChild(card);
  });

  app.appendChild(container);
}


/***********************
 RENDER DETALLE
************************/

function renderDetalle(id) {

  const lugar = obtenerLugarPorId(id);
  const estadisticas = calcularEstadisticas(lugar.pronosticoSemanal);
  const app = document.getElementById("app");

  app.innerHTML = "";

  const detalle = document.createElement("div");
  detalle.classList.add("detalle");

  // Agregar clase según clima predominante
  const clima = estadisticas.climaPredominante;

  if (clima === "Soleado") {
    detalle.classList.add("clima-soleado");
  } else if (clima === "Lluvioso") {
    detalle.classList.add("clima-lluvioso");
  } else if (clima === "Ventoso") {
    detalle.classList.add("clima-ventoso");
  } else {
    detalle.classList.add("clima-nublado");
  }

  detalle.innerHTML = `
    <h2>${lugar.nombre}</h2>
    <p>Temperatura actual: ${lugar.tempActual}°C</p>
    <p>Estado actual: ${lugar.estadoActual}</p>

    <div class="pronostico">
      <h3>Pronóstico semanal</h3>
      ${lugar.pronosticoSemanal.map(d =>
        `<div class="pronostico-item">
          ${d.dia} → Min: ${d.min}°C | Max: ${d.max}°C | ${d.estado}
        </div>`
      ).join("")}
    </div>

    <div class="estadisticas">
      <h3>Estadísticas de la semana</h3>
      <p>Mínima semanal: ${estadisticas.minTemp}°C</p>
      <p>Máxima semanal: ${estadisticas.maxTemp}°C</p>
      <p>Promedio semanal: ${estadisticas.promedio}°C</p>
      <p>Días por tipo de clima:</p>
      <ul>
        ${Object.entries(estadisticas.conteoEstados)
          .map(([estado, cantidad]) =>
            `<li>${estado}: ${cantidad} días</li>`
          ).join("")}
      </ul>
      <p><strong>${estadisticas.resumen}</strong></p>
    </div>
  `;

  const boton = document.createElement("button");
  boton.textContent = "Volver al inicio";
  boton.addEventListener("click", renderHome);

  detalle.appendChild(boton);
  app.appendChild(detalle);
}


/***********************
 INICIO
************************/

renderHome();
