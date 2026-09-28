import { useQueryClient } from "@tanstack/react-query";

import { Banner } from "../components/Banner.js";
import { useNearbyAlerts } from "./useNearbyAlerts.js";

/** Shows a banner when nearby alerts cannot be fetched. */
export function NearbyAlertsErrorBanner() {
  const queryClient = useQueryClient();
  const { error, isFetching } = useNearbyAlerts();
  return (
    error && (
      <Banner
        color="red"
        loading={isFetching}
        action={() => {
          queryClient.invalidateQueries({ queryKey: ["nearbyAlerts"] });
          queryClient.invalidateQueries({ queryKey: ["alerts"] });
        }}
        actionText="Retry"
      >
        Unable to check flood alerts. Please check your connection.
      </Banner>
    )
  );
}
