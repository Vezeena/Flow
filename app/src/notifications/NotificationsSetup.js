import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { AppState } from "react-native";

import { useNearbyAlerts } from "../alerts/useNearbyAlerts.js";

// Config notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
}).catch((error) => console.error("Error setting notification channel:", error));

/** Set-up notifications. */
export function NotificationsSetup({ children }) {
  const queryClient = useQueryClient();

  // Request notifications permission
  useEffect(() => {
    async function requestNotificationsPermission() {
      if ((await Notifications.requestPermissionsAsync()).status === "granted") {
        queryClient.invalidateQueries({ queryKey: ["notificationsPermission"] });
      }
    }
    requestNotificationsPermission();
  }, [queryClient]);

  // Recheck notifications permission on app refocus
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        queryClient.invalidateQueries({ queryKey: ["notificationsPermission"] });
      }
    });
    return () => subscription.remove();
  }, [queryClient]);

  // Subscribe to alerts
  useNearbyAlerts();

  // Refresh alerts whenever we receive a notification
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      queryClient.invalidateQueries({ queryKey: ["nearbyAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    });
    return () => subscription.remove();
  }, [queryClient]);

  return children;
}
