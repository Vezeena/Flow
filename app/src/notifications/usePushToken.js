import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { useHasNotificationsPermission } from "./useHasNotificationsPermission.js";

/** Hook which returns the app's push token and its query info. */
export function usePushToken() {
  const { hasNotificationsPermission } = useHasNotificationsPermission();
  const { data, ...query } = useQuery({
    queryKey: ["pushToken", hasNotificationsPermission],
    queryFn: getExpoPushToken,
    enabled: hasNotificationsPermission,
  });
  return { pushToken: data, ...query };
}

/** Gets Expo's push token. */
async function getExpoPushToken() {
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}
