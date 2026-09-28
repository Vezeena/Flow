import { useQuery } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";

/** Hook which returns whether the app has the notifications permission and its query info. */
export function useHasNotificationsPermission() {
  const { data, ...query } = useQuery({
    queryKey: ["notificationsPermission"],
    queryFn: hasNotificationsPermission,
    retry: false,
  });
  return { hasNotificationsPermission: data, ...query };
}

/** Checks whether the application has notifications permission. */
async function hasNotificationsPermission() {
  return (await Notifications.getPermissionsAsync()).status === "granted";
}
