/** App configuration. */
export const config = {
  SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
  LOCATION_MAX_AGE_MS: parseInt(process.env.EXPO_PUBLIC_LOCATION_MAX_AGE_MS) || 300000,
  POLL_INTERVAL_MS: parseInt(process.env.EXPO_PUBLIC_ALERTS_POLL_MS) || 60000,
};
