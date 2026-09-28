import { latestFloodAlerts, refreshFloodAlerts } from "./alerts.js";
import { config } from "./config.js";
import { isAlertSeen, getAllDeviceLocations, markAlertAsSeen, removeDevice } from "./database.js";
import { distanceKm } from "./utils/distanceKm.js";

// Adapted from: https://docs.expo.dev/push-notifications/push-notifications-setup/
const EXPO_PUSH = "https://exp.host/--/api/v2/push/send";

/** Sends a batch of push notifications and returns Expo tickets. */
async function sendPushNotificationsBatch(messages) {
  const response = await fetch(EXPO_PUSH, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(messages),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result.data;
}

/** Sends notifications for all unseen flood alerts for all devices. */
async function notifyFloodAlerts(alerts) {
  const deviceLocations = getAllDeviceLocations();

  const toSend = [];
  for (const alert of alerts) {
    // skip if we couldn't get its coordinates
    if (alert?.lat == null || alert?.long == null) continue;

    for (const location of deviceLocations) {
      const distance = distanceKm(location.latitude, location.longitude, alert?.lat, alert?.long);

      // skip if location is too far away
      if (distance > config.ALERT_DISTANCE_KM) continue;

      // skip if we've already notified this device about this flood
      if (isAlertSeen(location.token, alert.id, alert.severityLevel)) continue;

      toSend.push({
        token: location.token,
        alertId: alert.id,
        severityLevel: alert.severityLevel,
        message: {
          to: location.token,
          title: alert.title,
          body: alert.description,
          channelId: "default",
        },
      });
    }
  }
  if (toSend.length === 0) {
    console.log("No notifications to send");
    return;
  }
  console.log(`Sending ${toSend.length} notification${toSend.length === 1 ? "" : "s"}...`);

  // send in chunks of 100 (Expo recommendation)
  const removedTokens = new Set();
  for (let i = 0; i < toSend.length; i += 100) {
    const chunk = toSend.slice(i, i + 100);

    let tickets;
    try {
      tickets = await sendPushNotificationsBatch(chunk.map((item) => item.message));
    } catch (error) {
      console.error("Batch push failed:", error);
      continue;
    }

    for (let i = 0; i < chunk.length; i++) {
      const item = chunk[i];
      const ticket = tickets[i];

      if (ticket.status === "ok") {
        markAlertAsSeen(item.token, item.alertId, item.severityLevel);
      } else if (ticket.details?.error === "DeviceNotRegistered") {
        if (!removedTokens.has(item.token)) {
          console.log(`Removing unregistered device '${item.token}'...`);
          removeDevice(item.token);
          removedTokens.add(item.token);
        }
      } else {
        console.error(`Push error for '${item.token}':`, ticket.message);
      }
    }
  }
}

/** Notify users of new flood alerts every `POLL_INTERVAL_MS` milliseconds. */
export async function loopNotifyFloodAlerts() {
  await notifyFloodAlerts(await latestFloodAlerts);
  setTimeout(async () => {
    await refreshFloodAlerts();
    loopNotifyFloodAlerts();
  }, config.POLL_INTERVAL_MS);
}
