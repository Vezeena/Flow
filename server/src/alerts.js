import { readFile } from "node:fs/promises";

import { config } from "./config.js";
import { distanceKm } from "./utils/distanceKm.js";

// UK gov environment agency flooding API
const EA_FLOOD_MONITORING_API_URL = "https://environment.data.gov.uk/flood-monitoring/id/floods";

const floodCoordsCache = new Map();
/** Fetches the coordinates of a floor area. */
async function fetchFloodAreaCoords(floodAreaID, floodUrl) {
  let coords = floodCoordsCache.get(floodAreaID);
  if (coords) return coords;

  const response = await fetch(floodUrl);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const jsonResponse = await response.json();
  coords = { lat: jsonResponse.items.lat, long: jsonResponse.items.long };
  floodCoordsCache.set(floodAreaID, coords);
  return coords;
}

/** Fetches flood alerts from the UK gov environment agency flooding API. */
async function fetchFloodAlerts() {
  let alerts;
  if (config.MOCK_DATA) {
    alerts = JSON.parse(await readFile(config.MOCK_DATA_FILE, "utf8"));
  } else {
    const response = await fetch(EA_FLOOD_MONITORING_API_URL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonResponse = await response.json();
    const data = jsonResponse.items;

    alerts = [];
    const floodAreaIDs = new Set();
    for (const alert of data) {
      // skip inactive alerts
      if (alert.severityLevel >= 4) continue;

      floodAreaIDs.add(alert.floodAreaID);

      // get centre coordinates of each flood
      let coords;
      try {
        console.log(`Fetching coords for flood area '${alert.floodAreaID}'...`);
        coords = await fetchFloodAreaCoords(alert.floodAreaID, alert.floodArea["@id"]);
      } catch (error) {
        console.error(`Skipping coords for flood area '${alert.floodAreaID}':`, error);
      }

      alerts.push({
        id: alert["@id"].slice(alert["@id"].lastIndexOf("/") + 1),
        title:
          alert.severityLevel === 1
            ? "Severe flood alert"
            : alert.severityLevel === 2
              ? "Flood alert"
              : "Possible flooding",
        description: alert.description,
        county: alert.floodArea.county,
        polygon: alert.floodArea.polygon.replace("http://", "https://"),
        lat: coords?.lat ?? null,
        long: coords?.long ?? null,
        floodAreaID: alert.floodAreaID,
        message: alert.message.trim(),
        severityLevel: alert.severityLevel,
        timeRaised: alert.timeRaised,
      });
    }

    // remove flood coords cache entries that are no longer needed, this assumes that floods don't
    // disappear and later reappear with the same ID
    for (const floodAreaID of floodCoordsCache.keys()) {
      if (!floodAreaIDs.has(floodAreaID)) {
        floodCoordsCache.delete(floodAreaID);
      }
    }
  }

  // Sort by severity level
  return alerts.sort((f1, f2) => f1.severityLevel - f2.severityLevel);
}

/**
 * Reliably fetches flood alerts from the UK gov environment agency flooding API.
 *
 * This function returns a promise that eventually resolves with the alerts. In case of an error, it
 * retries (using an exponential backoff) until it succeeds in fetching the data.
 */
async function reliablyFetchFloodAlerts(timeout = config.MIN_RETRY_WAIT_MS) {
  try {
    console.log("Fetching flood alerts...");
    const alerts = await fetchFloodAlerts();
    console.log(`Fetched results contain ${alerts.length} alert${alerts.length === 1 ? "" : "s"}`);
    return alerts;
  } catch (error) {
    console.error(`Error fetching flood alerts, retrying in ${timeout / 1000}s:`, error);
    await new Promise((resolve) => setTimeout(resolve, timeout));
    return reliablyFetchFloodAlerts(Math.min(timeout * 2, config.MAX_RETRY_WAIT_MS));
  }
}

/**
 * Promise that resolves with the latest flood alerts, this is always a resolved promise, except at
 * startup while it fetches the initial alerts.
 */
export let latestFloodAlerts = reliablyFetchFloodAlerts();

/**
 * Refreshes the flood alerts and returns a promise that resolves once the alerts have been
 * refetched, at which point `latestFloodAlerts` will contain the refetched data.
 *
 * While the alerts are being refetched, `latestFloodAlerts` will still contain the previous data.
 */
export function refreshFloodAlerts() {
  const promise = reliablyFetchFloodAlerts();
  return promise.then(() => {
    latestFloodAlerts = promise;
  });
}

/** Gets all floods near the given locations. */
export async function getNearbyFloodAlerts(locations) {
  const nearbyAlerts = [];
  if (locations.length === 0) return nearbyAlerts;

  const alerts = await latestFloodAlerts;
  for (const alert of alerts) {
    // skip if we couldn't get its coordinates
    if (alert.lat == null || alert.long == null) continue;

    const matchedLocations = locations.filter(
      (coords) =>
        distanceKm(coords.lat, coords.long, alert.lat, alert.long) <= config.ALERT_DISTANCE_KM,
    );

    if (matchedLocations.length > 0) {
      nearbyAlerts.push({ ...alert, locationIds: matchedLocations.map((l) => l.id) });
    }
  }
  return nearbyAlerts;
}
