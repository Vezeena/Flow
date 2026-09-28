import { config } from "../config.js";

const NEARBY_ALERTS_ENDPOINT = new URL("nearby-alerts", config.SERVER_URL);

/** Registers the provided (optional) token and gets all alerts near the provided locations. */
export async function fetchNearbyAlerts(token, locations) {
  const response = await fetch(NEARBY_ALERTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, locations }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
