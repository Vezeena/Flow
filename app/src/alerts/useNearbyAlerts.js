import { useQuery } from "@tanstack/react-query";

import { config } from "../config.js";
import { useLocations } from "../location/useLocations.js";
import { usePushToken } from "../notifications/usePushToken.js";
import { fetchNearbyAlerts } from "./fetchNearbyAlerts.js";

/** Hook which returns all nearby alerts and its query info. */
export function useNearbyAlerts() {
  const { pushToken } = usePushToken();
  const { locations } = useLocations();
  const locationsInfo = locations?.map((l) => ({ id: l.id, lat: l.lat, long: l.long }));

  const { data, ...query } = useQuery({
    queryKey: ["nearbyAlerts", pushToken, locationsInfo],
    queryFn: () => fetchNearbyAlerts(pushToken, locationsInfo),
    refetchInterval: config.POLL_INTERVAL_MS,
  });

  return { nearbyAlerts: data, ...query };
}
