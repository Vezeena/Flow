import { useQuery } from "@tanstack/react-query";

import { config } from "../config.js";
import { fetchAlerts } from "./fetchAlerts.js";

/** Hook which returns all alerts and its query info. */
export function useAlerts() {
  const { data, ...query } = useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    refetchInterval: config.POLL_INTERVAL_MS,
  });

  return { alerts: data, ...query };
}
