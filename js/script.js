document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o mapa
  const map = L.map("map", {
    zoomControl: false, // desabilita o controle nativo de zoom
    center: [-28.574874, -40.715332],
    zoom: 7,
  });

  // Camada base
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Exemplo de marcadores
  const reservoirs = [
    { name: "Reservatório 1", coords: [-28.5, -40.7] },
    { name: "Reservatório 2", coords: [-28.6, -40.8] },
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

  // Atualiza coordenadas de mouse
  map.on("mousemove", (e) => {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    document.getElementById("coordinates-lat").textContent = lat;
    document.getElementById("coordinates-lng").textContent = lng;
  });

  // Botões de zoom
  document.getElementById("zoomInBtn").addEventListener("click", () => {
    map.zoomIn();
  });
  document.getElementById("zoomOutBtn").addEventListener("click", () => {
    map.zoomOut();
  });

  // Botão "Home"
  document.getElementById("homeBtn").addEventListener("click", () => {
    map.setView([-28.574874, -40.715332], 7);
  });

  // Botão "Layers"
  document.getElementById("layersBtn").addEventListener("click", () => {
    alert("Exemplo: Exibir menu de camadas...");
  });

  // Botão "Menu"
  document.getElementById("menuBtn").addEventListener("click", () => {
    alert("Abrir menu lateral...");
  });

  // Switcher (Mapa, Tabela, Gráfico)
  const globeViewBtn = document.getElementById("globeViewBtn");
  const tableViewBtn = document.getElementById("tableViewBtn");
  const chartViewBtn = document.getElementById("chartViewBtn");
  const allSwitcherBtns = [globeViewBtn, tableViewBtn, chartViewBtn];

  allSwitcherBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove classe 'active' de todos
      allSwitcherBtns.forEach((b) => b.classList.remove("active"));
      // Adiciona 'active' ao clicado
      btn.classList.add("active");

      // Aqui poderia chamar função para exibir a "Tabela" ou "Gráfico"
      // Ex: se for tableViewBtn, abrir modal da tabela.
    });
  });

  // Botão "Filtrar"
  document.getElementById("filterBtn").addEventListener("click", () => {
    alert("Aplicar filtros...");
  });

  // Botão "Reset"
  document.getElementById("resetBtn").addEventListener("click", () => {
    alert("Resetar...");
  });

  // Ajustar o mapa ao redimensionar
  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});
