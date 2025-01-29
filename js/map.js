// Seletores de elementos
const mapView = document.getElementById("mapView");
const tableView = document.getElementById("tableView");
const tableBtn = document.getElementById("tableBtn");
const backToMapBtn = document.getElementById("backToMap");
const scaleSelect = document.getElementById("scaleSelect");
const coordinatesEl = document.getElementById("coordinates");
let map;

// Função de inicialização do mapa
function initializeMap() {
  map = L.map("map", { zoomControl: false }).setView([-17.13261, -46.39732], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Zoom control
  L.control.zoom({ position: "topleft" }).addTo(map);

  // Atualiza coord. conforme mouse move
  map.on("mousemove", (e) => {
    const { lat, lng } = e.latlng;
    coordinatesEl.textContent = `${lng.toFixed(6)}, ${lat.toFixed(6)}`;
  });

  // Marcadores de exemplo
  const reservoirs = [
    {
      name: "Barra dos Coqueiros",
      coordinates: [-17.13261, -46.39732],
      volume: 0.0,
      inflowRate: 171.89,
      outflowRate: 169.0,
    },
    {
      name: "Caçu",
      coordinates: [-17.15, -46.45],
      volume: 90.07,
      inflowRate: 194.31,
      outflowRate: 181.0,
    },
  ];

  reservoirs.forEach((res) => {
    const marker = L.circleMarker(res.coordinates, {
      radius: 8,
      fillColor: getMarkerColor(res.volume),
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);

    marker.bindPopup(`
      <strong>${res.name}</strong><br>
      Volume Útil: ${res.volume}%<br>
      Vazão Afluente: ${res.inflowRate} m³/s<br>
      Vazão Defluente: ${res.outflowRate} m³/s
    `);
  });
}

// Lógica de cor do marcador
function getMarkerColor(volume) {
  if (volume < 30) return "#dc3545"; // vermelho
  if (volume < 60) return "#ffc107"; // amarelo
  return "#28a745"; // verde
}

// Exibe Mapa
function showMapView() {
  mapView.style.display = "block";
  tableView.style.display = "none";
  if (map) map.invalidateSize();
}

// Exibe Tabela
function showTableView() {
  mapView.style.display = "none";
  tableView.style.display = "block";
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  initializeMap();

  // Botão da tabela
  if (tableBtn) tableBtn.addEventListener("click", showTableView);
  // Botão de voltar ao mapa
  if (backToMapBtn) backToMapBtn.addEventListener("click", showMapView);

  // Select de escala
  if (scaleSelect) {
    scaleSelect.addEventListener("change", () => {
      const scale = parseInt(scaleSelect.value, 10);
      // Sua lógica de alterar a escala no mapa
      console.log("Escala selecionada:", scale);
    });
  }

  // Exemplo do reset
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      alert("Filtros resetados!");
    });
  }
});

window.addEventListener("resize", () => {
  if (map) {
    map.invalidateSize();
  }
});
