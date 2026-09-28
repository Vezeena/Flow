import * as Location from "expo-location";

import { config } from "../config.js";

/** Returns the current coordinates, possibly from a cache with the last known ones. */
export async function getCurrentCoords() {
  let position = await Location.getLastKnownPositionAsync({ maxAge: config.LOCATION_MAX_AGE_MS });
  if (!position) {
    position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });
  }
  if (!position) {
    throw new Error("Unable to get current coords.");
  }
  return { lat: position.coords.latitude, long: position.coords.longitude };
}

/**
 * Converts given coordinates into a place name (city, district, region). Returns an object
 * containing the place name and region, or null if no matching location is found or permission is
 * denied.
 */
export async function getPlaceNameFromCoords({ lat, long }) {
  try {
    const results = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    if (!results || results.length === 0) return null;

    const place = results[0];
    // name: prefer city, fall back to district or region in case of duplicate city names
    return {
      name: place.city || place.district || place.region || null,
      region: place.region || null,
    };
  } catch (error) {
    console.error("Error getting place name from coords:", error);
    return null;
  }
}

/**
 * Searches for a place by name and returns matches for the user to save. Tied to the UK and
 * returned as a display name so the user can confirm the right location before saving. returns in
 * the format: [{ lat: 51.28, long: 1.08, placeName: { name: "Canterbury", region: "Kent" } }]
 */
export async function searchPlace(query) {
  try {
    // add a country so 'Canterbury' finds UK county 'Kent'
    const results = await Location.geocodeAsync(`${query}, UK`);
    if (!results || results.length === 0) return [];

    // resolve each return back to a (consistently formatted) place name and region
    const places = await Promise.all(
      results.slice(0, 5).map(async (result) => {
        const coords = { lat: result.latitude, long: result.longitude };
        const placeName = await getPlaceNameFromCoords(coords);
        return { ...coords, placeName };
      }),
    );

    // keep only the ones that have a place name
    return places.filter((place) => place.placeName && place.placeName.name);
  } catch (error) {
    console.error(`Error searching place '${query}':`, error);
    return [];
  }
}

/** Formats a place name and region for display, e.g "Canterbury, Kent" */
export function formatPlaceName(placeName) {
  if (!placeName) return null;
  return [placeName.name, placeName.region].filter(Boolean).join(", ");
}
