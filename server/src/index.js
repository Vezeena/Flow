import express from "express";

import { getNearbyFloodAlerts, latestFloodAlerts } from "./alerts.js";
import { config } from "./config.js";
import { initDatabase, markAlertAsSeen, registerDevice } from "./database.js";
import { loopNotifyFloodAlerts } from "./notifications.js";

// Initialise database
initDatabase();

// Set-up loop for sending push notifications with new flood data
loopNotifyFloodAlerts();

const app = express();
app.use(express.json());

// Gets all alerts
app.get("/alerts", async (_request, response) => response.json(await latestFloodAlerts));

// Registers a device's token and locations for push notifications and returns
// the flood alerts relevant to those locations
app.post("/nearby-alerts", async (request, response, next) => {
  const { token, locations = [] } = request.body || {};
  try {
    console.log(
      `Getting alerts for device '${token || "unknown"}' in locations:`,
      locations.map((l) => `(${l.lat}, ${l.long})`).join("; ") || "none",
    );
    if (token) {
      registerDevice(token, locations);
    }

    // find alerts relevant to the device's locations
    const nearbyAlerts = await getNearbyFloodAlerts(locations);
    console.log(
      `Nearby floods for device '${token || "unknown"}':`,
      nearbyAlerts.map((alert) => alert.id).join("; ") || "none",
    );

    // mark them seen (the user is about to see them in-app)
    if (token) {
      for (const alert of nearbyAlerts) {
        markAlertAsSeen(token, alert.id, alert.severityLevel);
      }
    }

    response.json(nearbyAlerts);
  } catch (error) {
    next(error);
  }
});

// Handle errors
app.use((error, request, response, _next) => {
  console.error("Server error:", error);
  response.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}...`));
