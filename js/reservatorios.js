document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o mapa
  const map = L.map("map", {
    zoomControl: false,
    center: [-25.463115, -44.154053], // Ajuste conforme desejar
    zoom: 7,
  });

  // Camada base (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Exemplo de marcadores
  const reservoirs = [
    { name: "Reservatório 1", coords: [-25.4, -44.1] },
    { name: "Reservatório 2", coords: [-25.6, -43.9] },
  ];

  reservoirs.forEach((res) => {
    const marker = L.circleMarker(res.coords, {
      radius: 8,
      fillColor: "blue",
      color: "#fff",
      weight: 2,
      fillOpacity: 1,
    }).addTo(map);

    marker.bindPopup(`
      <strong>${res.name}</strong><br />
      Volume: 70%<br />
      Vazão: 120 m³/s
    `);
  });

  // Atualiza coordenadas no rodapé
  map.on("mousemove", (e) => {
    const { lat, lng } = e.latlng;
    document.getElementById("coordinates-lat").textContent = lat.toFixed(6);
    document.getElementById("coordinates-lng").textContent = lng.toFixed(6);
  });

  // Botões Zoom
  document.getElementById("zoomInBtn").addEventListener("click", () => {
    map.zoomIn();
  });
  document.getElementById("zoomOutBtn").addEventListener("click", () => {
    map.zoomOut();
  });

  // Botão Home
  document.getElementById("homeBtn").addEventListener("click", () => {
    map.setView([-25.463115, -44.154053], 7);
  });

  // Botão Layers
  document.getElementById("layersBtn").addEventListener("click", () => {
    alert("Abrir menu de camadas...");
  });

  // Switchers (Globo/Tabela/Gráfico)
  const globeViewBtn = document.getElementById("globeViewBtn");
  const tableViewBtn = document.getElementById("tableViewBtn");
  const chartViewBtn = document.getElementById("chartViewBtn");

  [globeViewBtn, tableViewBtn, chartViewBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      globeViewBtn.classList.remove("active");
      tableViewBtn.classList.remove("active");
      chartViewBtn.classList.remove("active");
      btn.classList.add("active");
      // Lógica: exibir tabela ou gráfico
    });
  });

  // Botões Filtro / Reset
  document.getElementById("filterBtn").addEventListener("click", () => {
    alert("Filtrar...");
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    alert("Resetando...");
  });

  // Responsividade
  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});
