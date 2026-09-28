import { config } from "../config.js";

const ALERTS_ENDPOINT = new URL("alerts", config.SERVER_URL);

/** Gets all existing alerts. */
export async function fetchAlerts() {
  const response = await fetch(ALERTS_ENDPOINT);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
