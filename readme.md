# 🌎 App de Clima – Ciudades de Chile

Proyecto desarrollado para el **Módulo 4 – Lógica y Estadísticas en JavaScript**  
Curso Front-End Sence, 2026.

---

## 📌 Descripción

Esta aplicación web simula una App de Clima con información de 5 ciudades reales de Chile:

- Santiago
- Valparaíso
- Concepción
- La Serena
- Punta Arenas

La aplicación cuenta con:

- 🏠 Vista Home con listado de ciudades y clima actual.
- 🔎 Vista de detalle por ciudad.
- 📊 Sección de estadísticas semanales calculadas dinámicamente con JavaScript.

El foco principal del módulo fue implementar correctamente la **lógica de programación**, modelado de datos y manipulación del DOM.

---

## 🧠 Modelado de datos

Los datos están definidos en el archivo `app.js` como un arreglo de objetos llamado `lugares`.

Cada lugar contiene:

- `id`
- `nombre`
- `tempActual`
- `estadoActual`
- `pronosticoSemanal` (arreglo de objetos)

Ejemplo simplificado:

```javascript
const lugares = [
  {
    id: 1,
    nombre: "Santiago",
    tempActual: 28,
    estadoActual: "Soleado",
    pronosticoSemanal: [
      { dia: "Lunes", min: 18, max: 30, estado: "Soleado" },
      ...
    ]
  }
];
```

## 🔗 Repositorio GitHub

https://github.com/kyusita/App-Clima---modulo-4
