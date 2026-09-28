import { DatabaseSync } from "node:sqlite";

import { config } from "./config.js";

const db = new DatabaseSync(config.DB_FILE);

/** Initialises the database. */
export function initDatabase() {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);

  // registered devices
  db.exec(`
    CREATE TABLE IF NOT EXISTS devices (
      token TEXT PRIMARY KEY
    );
  `);

  // locations registered for each device
  db.exec(`
    CREATE TABLE IF NOT EXISTS device_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT,
      latitude REAL,
      longitude REAL,
      FOREIGN KEY (token) REFERENCES devices(token) ON DELETE CASCADE
    );
  `);

  // floods already seen by each device
  db.exec(`
    CREATE TABLE IF NOT EXISTS alerts_seen (
      token TEXT,
      alert_id TEXT,
      severity_level INTEGER,
      PRIMARY KEY (token, alert_id),
      FOREIGN KEY (token) REFERENCES devices(token) ON DELETE CASCADE
    );
  `);
}

/** Registers a device with the given token and locations. */
export function registerDevice(token, locations) {
  // ensure the device exists
  db.prepare("INSERT INTO devices (token) VALUES (?) ON CONFLICT(token) DO NOTHING;").run(token);

  // replace this device's locations with the current set
  db.prepare("DELETE FROM device_locations WHERE token = ?;").run(token);

  const insertLocation = db.prepare(`
    INSERT INTO device_locations (token, latitude, longitude)
    VALUES (?, ?, ?);
  `);
  for (const location of locations) {
    insertLocation.run(token, location.lat, location.long);
  }
}

/** Removes a device with the given token. */
export function removeDevice(token) {
  db.prepare("DELETE FROM devices WHERE token = ?;").run(token);
}

/** Returns all locations for all devices */
export function getAllDeviceLocations() {
  return db
    .prepare(`
      SELECT token, latitude, longitude
      FROM device_locations;
    `)
    .all();
}

/** Whether a flood alert has already been seen by a device with the provided token. */
export function isAlertSeen(token, alertId, severityLevel) {
  const row = db
    .prepare(`
      SELECT severity_level
      FROM alerts_seen
      WHERE token = ? AND alert_id = ?;
    `)
    .get(token, alertId);
  return row !== undefined && row.severity_level <= severityLevel;
}

/** Marks a flood alert as having been seen by a token at a given severity level. */
export function markAlertAsSeen(token, floodId, severityLevel) {
  db.prepare(`
    INSERT INTO alerts_seen (token, alert_id, severity_level)
    VALUES (?, ?, ?) ON CONFLICT(token, alert_id) DO UPDATE SET severity_level = ?;
  `).run(token, floodId, severityLevel, severityLevel);
}
