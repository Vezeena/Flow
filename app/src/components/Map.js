import { WebView } from "react-native-webview";

import { useAlerts } from "../alerts/useAlerts.js";

export default function Map({ location, showZoom }) {
  const { alerts } = useAlerts();

  // pass markers for each flood alert as polygons (polygon urls), coloured by severity, as JSON
  const alertsJson = JSON.stringify(
    (alerts || []).map((alert) => ({
      polygon: alert.polygon,
      severe: alert.severityLevel === 1,
    })),
  );

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>body { margin: 0; } #map { height: 100vh; width: 100vw; }</style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map("map", { zoomControl: ${showZoom} }).setView([${location.lat}, ${location.long}], 9);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          // mandatory licence attribute
          maxZoom: 19, attribution: "© OpenStreetMap",
        }).addTo(map);

        // the user's current location marker
        L.marker([${location.lat}, ${location.long}]).addTo(map).bindPopup("You");

        // draw the flood alert polygons by severity colour
        const alerts = ${alertsJson};
        alerts.forEach(function (alert) {
          if (!alert.polygon) return;
          fetch(alert.polygon)
            .then(function (response) { return response.json(); })
            .then(function (geojson) {
              L.geoJSON(geojson, {
                style: {
                  color: alert.severe ? "red" : "orange",
                  weight: 2,
                  fillOpacity: 0.3,
                },
              }).addTo(map);
            })
            .catch(function (error) { console.error("Error fetching polygon:", error); });
        });
      </script>
    </body>
    </html>
  `;

  return <WebView source={{ html }} style={{ flex: 1 }} />;
}
