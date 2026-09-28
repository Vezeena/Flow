import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

/** Hook which returns whether the app has location permission and its query info. */
export function useHasLocationPermission() {
  const { data, ...query } = useQuery({
    queryKey: ["locationPermission"],
    queryFn: hasLocationPermission,
    retry: false,
  });
  return { hasLocationPermission: data, ...query };
}

/** Checks whether the application has permission to access GPS location. */
async function hasLocationPermission() {
  return (await Location.getForegroundPermissionsAsync()).status === "granted";
}
