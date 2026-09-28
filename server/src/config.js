import { resolve } from "node:path";

const SERVER_DIR = resolve(import.meta.dirname, "..");

// Load config variables from `.env` file
try {
  process.loadEnvFile(resolve(SERVER_DIR, ".env"));
} catch {}

/** Server configuration. */
export const config = {
  MOCK_DATA: process.env.MOCK_DATA === "true",
  MOCK_DATA_FILE: resolve(SERVER_DIR, process.env.MOCK_DATA_FILE || "mock-data.json"),
  DB_FILE: resolve(SERVER_DIR, process.env.DB_FILE || "flow.db"),
  PORT: parseInt(process.env.PORT, 10) || 3000,
  ALERT_DISTANCE_KM: parseInt(process.env.ALERT_DISTANCE_KM, 10) || 15,
  POLL_INTERVAL_MS: parseInt(process.env.POLL_INTERVAL_MS, 10) || 60000,
  MIN_RETRY_WAIT_MS: parseInt(process.env.MIN_RETRY_WAIT_MS, 10) || 5000,
  MAX_RETRY_WAIT_MS: parseInt(process.env.MAX_RETRY_WAIT_MS, 10) || 60000,
};
