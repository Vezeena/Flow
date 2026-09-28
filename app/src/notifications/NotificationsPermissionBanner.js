import { Linking } from "react-native";

import { Banner } from "../components/Banner.js";
import { useHasNotificationsPermission } from "./useHasNotificationsPermission.js";

/** Shows an alert while the user doesn't have the notifications permission enabled. */
export function NotificationsPermissionBanner() {
  const { hasNotificationsPermission } = useHasNotificationsPermission();
  return (
    hasNotificationsPermission === false && (
      <Banner action={() => Linking.openSettings()} actionText="Open settings">
        Notifications are disabled. Enable them to be notified of new floods.
      </Banner>
    )
  );
}
