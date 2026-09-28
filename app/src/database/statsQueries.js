/** Returns the stats points. */
export async function getPoints(db) {
  const row = await db.getFirstAsync("SELECT points FROM stats;");
  return row.points;
}
