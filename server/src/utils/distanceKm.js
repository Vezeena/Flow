/** Earth's radius in km. */
const EARTH_RADIUS_KM = 6371;

/** Convert degrees to radians. */
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Distance in km between two lat/long points (adapted from the Haversine formula).
 *
 * See: https://en.wikipedia.org/wiki/Haversine_formula and
 * https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
 */
export function distanceKm(lat1Deg, long1Deg, lat2Deg, long2Deg) {
  const lat1 = toRad(lat1Deg);
  const long1 = toRad(long1Deg);
  const lat2 = toRad(lat2Deg);
  const long2 = toRad(long2Deg);
  const dLat = lat2 - lat1;
  const dLong = long2 - long1;

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLong / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}
