import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable, Modal } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { NearbyAlertsErrorBanner } from "../../alerts/NearbyAlertsErrorBanner.js";
import { useNearbyAlerts } from "../../alerts/useNearbyAlerts.js";
import AlertCard from "../../components/AlertCard.js";
import IconButton from "../../components/IconButton";
import Map from "../../components/Map";
import { LocationPermissionBanner } from "../../location/LocationPermissionBanner.js";
import { formatPlaceName } from "../../location/locationUtils.js";
import { useHasLocationPermission } from "../../location/useHasLocationPermission.js";
import { useLocations } from "../../location/useLocations.js";
import { NotificationsPermissionBanner } from "../../notifications/NotificationsPermissionBanner.js";
import { colours } from "../../styles/colours";
import { iconDefaults, pressableDefaults, sharedStyles } from "../../styles/sharedStyles";
import { alertsStyles } from "./alertsStyles";

/** Displays flood alerts for the user's current and saved locations. */
export default function Alerts({ navigation }) {
  const queryClient = useQueryClient();
  const { nearbyAlerts, isLoading: nearbyAlertsLoading } = useNearbyAlerts();
  const { hasLocationPermission } = useHasLocationPermission();
  const { gpsLocation, fetchingGpsLocation, savedLocations } = useLocations();

  const [mapFullscreen, setMapFullscreen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <NotificationsPermissionBanner />
      <LocationPermissionBanner />
      <NearbyAlertsErrorBanner />

      <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
        {/* Nearby alerts loading */}
        {nearbyAlertsLoading && <ActivityIndicator size="small" color={colours.primary} />}

        {/* No nearby alerts */}
        {!nearbyAlertsLoading && nearbyAlerts?.length === 0 && (
          <View style={alertsStyles.alertCard}>
            <Ionicons name="shield-checkmark" {...iconDefaults} />
            <View>
              <Text style={alertsStyles.alertTitle}>No active alerts</Text>
              <Text style={alertsStyles.alertSubtext}>We'll let you know if anything changes</Text>
            </View>
          </View>
        )}

        {/* Warning: not loading (fetch finished), not null (fetch succeeded),
            render a card for each alert  */}
        {!nearbyAlertsLoading &&
          nearbyAlerts &&
          nearbyAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} navigation={navigation} />
          ))}

        {/* Current location */}
        <View style={[alertsStyles.locationRow, sharedStyles.card]}>
          <Ionicons name="location-outline" {...iconDefaults} />
          {gpsLocation && (
            <View style={{ flex: 1 }}>
              <Text style={alertsStyles.locationName}>
                {formatPlaceName(gpsLocation.placeName) || "Unknown"}
              </Text>
              <Text style={sharedStyles.cardLabel}>
                {hasLocationPermission ? "Current location" : "Latest known location"}
              </Text>
            </View>
          )}
          {!gpsLocation && (
            <View style={alertsStyles.locationError}>
              <Text style={sharedStyles.cardLabel}>Unable to find current location.</Text>
              {!fetchingGpsLocation && (
                <View style={sharedStyles.buttonContainer}>
                  <Pressable
                    style={sharedStyles.button}
                    onPress={() => queryClient.invalidateQueries({ queryKey: ["gpsLocation"] })}
                    {...pressableDefaults}
                  >
                    <Ionicons name="refresh" size={16} color={colours.background} />
                    <Text style={sharedStyles.buttonText}>Retry</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
          {fetchingGpsLocation && <ActivityIndicator size="small" color={colours.primary} />}
        </View>

        {/* Map */}
        {gpsLocation && (
          <>
            <Pressable onPress={() => setMapFullscreen(true)}>
              <View style={alertsStyles.map} pointerEvents="none">
                <Map location={gpsLocation} showZoom={false} />
              </View>
              <View style={alertsStyles.mapHint}>
                <Text style={alertsStyles.mapHintText}>Tap to expand</Text>
              </View>
            </Pressable>

            <Modal
              visible={mapFullscreen}
              animationType="slide"
              onRequestClose={() => setMapFullscreen(false)}
            >
              <SafeAreaView style={alertsStyles.fullscreenMap} edges={["top", "bottom"]}>
                <Map location={gpsLocation} />
                <IconButton
                  style={[
                    alertsStyles.closeButton,
                    { top: insets.top + alertsStyles.closeButton.top },
                  ]}
                  name="close"
                  size={28}
                  color={colours.textPrimary}
                  onPress={() => setMapFullscreen(false)}
                />
              </SafeAreaView>
            </Modal>
          </>
        )}

        {/* Other locations */}
        <View>
          <View style={alertsStyles.otherLocations}>
            <Text style={sharedStyles.heading}>Other locations</Text>
            <IconButton name="settings" onPress={() => navigation.navigate("ConfigureLocations")} />
          </View>

          {savedLocations.length === 0 ? (
            <Text style={sharedStyles.cardLabel}>No saved locations.</Text>
          ) : (
            savedLocations.map((location) => {
              // looks up this location's alerts
              const matchingAlerts = nearbyAlerts?.filter((alert) =>
                alert.locationIds.includes(location.id),
              );
              // checks the location has alerts
              const hasAlerts = matchingAlerts && matchingAlerts.length > 0;
              // alerts are sorted by severity
              const hasSevereAlert = matchingAlerts?.[0]?.severityLevel === 1;

              return (
                <View key={location.id} style={alertsStyles.locationItem}>
                  <Text style={alertsStyles.locationItemName}>
                    {formatPlaceName(location.placeName)}
                  </Text>
                  {hasAlerts ? (
                    <View style={alertsStyles.hasWarningView}>
                      <Ionicons
                        name="warning"
                        {...iconDefaults}
                        color={hasSevereAlert ? colours.red : colours.amber}
                      />
                      {/* prioritises more severe alert styling */}
                      <Text
                        style={[
                          alertsStyles.locationItemStatus,
                          { color: hasSevereAlert ? colours.red : colours.amber },
                        ]}
                      >
                        {matchingAlerts.length} alert{matchingAlerts.length > 1 ? "s" : ""}
                      </Text>
                    </View>
                  ) : (
                    <Text style={alertsStyles.locationItemStatus}>no alerts</Text>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
}
