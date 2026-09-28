import { Linking } from "react-native";

import { Banner } from "../components/Banner.js";
import { useHasLocationPermission } from "./useHasLocationPermission.js";

/** Shows an alert while the user doesn't have the location permission enabled. */
export function LocationPermissionBanner() {
  const { hasLocationPermission } = useHasLocationPermission();
  return (
    hasLocationPermission === false && (
      <Banner action={() => Linking.openSettings()} actionText="Open settings">
        Location access is disabled. Enable it to see floods near you.
      </Banner>
    )
  );
}
