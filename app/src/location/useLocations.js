import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

import { config } from "../config.js";
import {
  addSavedLocation,
  deleteSavedLocation,
  getAllLocations,
  saveGpsLocation,
} from "../database/locationQueries.js";
import { getCurrentCoords, getPlaceNameFromCoords } from "./locationUtils.js";
import { useHasLocationPermission } from "./useHasLocationPermission.js";

/**
 * Provides the list of locations, the current GPS location, actions to add/remove saved locations,
 * and relevant query information.
 */
export function useLocations() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const { hasLocationPermission } = useHasLocationPermission();

  const { data: locations, ...query } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getAllLocations(db),
  });

  const gpsLocation = locations?.find((l) => l.type === "gps");
  const savedLocations = locations?.filter((l) => l.type === "saved") ?? [];

  async function refreshCurrentLocation() {
    const curCoords = await getCurrentCoords();
    if (gpsLocation && curCoords.lat === gpsLocation.lat && curCoords.long === gpsLocation.long) {
      return gpsLocation;
    }
    const placeName = await getPlaceNameFromCoords(curCoords);
    const location = { ...curCoords, placeName };
    await saveGpsLocation(db, location);
    queryClient.invalidateQueries({ queryKey: ["locations"] });
    return location;
  }

  const { isFetching: fetchingGpsLocation } = useQuery({
    queryKey: ["gpsLocation"],
    queryFn: refreshCurrentLocation,
    refetchInterval: config.LOCATION_MAX_AGE_MS,
    enabled: hasLocationPermission,
  });

  async function addLocation(location) {
    await addSavedLocation(db, location);
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  }

  async function deleteLocation(id) {
    await deleteSavedLocation(db, id);
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  }

  return {
    locations,
    fetchingGpsLocation,
    gpsLocation,
    savedLocations,
    addLocation,
    deleteLocation,
    ...query,
  };
}
