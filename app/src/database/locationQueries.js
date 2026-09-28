/** Returns all locations from the database. */
export async function getAllLocations(db) {
  const rows = await db.getAllAsync("SELECT * FROM locations ORDER BY type, place_name, region;");
  return rows.map(rowToLocation);
}

/**
 * Saves the GPS location in the database. Replaces any existing GPS location so that only one GPS
 * location is stored at a time. The operation is atomic (performed within a transaction): either
 * both operations succeed or the transaction is rolled back.
 */
export async function saveGpsLocation(db, location) {
  await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM locations WHERE type = 'gps';");
    await db.runAsync(
      `
        INSERT INTO locations (latitude, longitude, place_name, region, type)
        VALUES (?, ?, ?, ?, 'gps');
      `,
      [
        location.lat,
        location.long,
        location.placeName?.name || null,
        location.placeName?.region || null,
      ],
    );
  });
}

/** Adds a new user saved location to the database */
export async function addSavedLocation(db, location) {
  await db.runAsync(
    `INSERT INTO locations (latitude, longitude, place_name, region, type)
     VALUES (?, ?, ?, ?, 'saved');`,
    [
      location.lat,
      location.long,
      location.placeName?.name || null,
      location.placeName?.region || null,
    ],
  );
}

/** Removes a user saved location from the database by its id */
export async function deleteSavedLocation(db, id) {
  await db.runAsync("DELETE FROM locations WHERE id = ?;", [id]);
}

/**
 * Converts a row from the database into a location object. Rebuilds the place name and region into
 * a single placeName object.
 */
function rowToLocation(row) {
  return {
    id: row.id,
    lat: row.latitude,
    long: row.longitude,
    placeName: row.place_name ? { name: row.place_name, region: row.region } : null,
    type: row.type,
  };
}
