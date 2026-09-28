import { useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect } from "react";
import { AppState } from "react-native";

import { useLocations } from "./useLocations.js";

/** Set-up location. */
export function LocationSetup({ children }) {
  const queryClient = useQueryClient();

  // Request location permission
  useEffect(() => {
    async function requestLocationPermission() {
      if ((await Location.requestForegroundPermissionsAsync()).status === "granted") {
        queryClient.invalidateQueries({ queryKey: ["locationPermission"] });
      }
    }
    requestLocationPermission();
  }, [queryClient]);

  // Recheck location permission on app refocus
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        queryClient.invalidateQueries({ queryKey: ["locationPermission"] });
      }
    });
    return () => subscription.remove();
  }, [queryClient]);

  // Keep track of current position
  useLocations();

  return children;
}
