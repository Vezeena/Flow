import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import { useNearbyAlerts } from "../alerts/useNearbyAlerts.js";
import { colours } from "../styles/colours";
import { iconDefaults, pressableDefaults } from "../styles/sharedStyles";
import { alertCardSummarisedStyles } from "./alertCardSummarisedStyles";

/**
 * A summary of the Alerts page alert card, used on the Home and Hub screen. Shows the most severe
 * active alert, or none.
 */
export default function AlertCardSummarised({ showNoAlerts = true }) {
  const { nearbyAlerts, isLoading: nearbyAlertsLoading } = useNearbyAlerts();
  const navigation = useNavigation();

  // Alerts are sorted by severity
  const severestAlert = nearbyAlerts?.[0];
  const hasSevereAlert = severestAlert?.severityLevel === 1;

  // Nearby alerts loading
  if (nearbyAlertsLoading) {
    return <ActivityIndicator size="small" color={colours.primary} />;
  }

  // No nearby alerts
  if (!nearbyAlertsLoading && nearbyAlerts?.length === 0) {
    return (
      showNoAlerts && (
        <View style={alertCardSummarisedStyles.banner}>
          <Ionicons name="shield-checkmark" {...iconDefaults} />
          <View>
            <Text style={alertCardSummarisedStyles.bannerTitle}>No active alerts</Text>
            <Text style={alertCardSummarisedStyles.bannerSubtext}>
              We'll let you know if anything changes
            </Text>
          </View>
        </View>
      )
    );
  }

  return (
    severestAlert && (
      <View style={alertCardSummarisedStyles.container}>
        <Pressable
          style={[
            alertCardSummarisedStyles.banner,
            hasSevereAlert
              ? alertCardSummarisedStyles.bannerSevere
              : alertCardSummarisedStyles.bannerAmber,
          ]}
          onPress={() => navigation.navigate("Tabs", { screen: "Alerts" })}
          {...pressableDefaults}
        >
          <Ionicons
            name="warning"
            {...iconDefaults}
            color={hasSevereAlert ? colours.red : colours.amber}
          />
          <View style={alertCardSummarisedStyles.bannerTextContainer}>
            <Text style={alertCardSummarisedStyles.bannerTitle}>
              {severestAlert.title}{" "}
              <Text style={alertCardSummarisedStyles.bannerSubtitle}>{severestAlert.county}</Text>
            </Text>
            <Text style={alertCardSummarisedStyles.bannerSubtext}>{severestAlert.description}</Text>
          </View>
        </Pressable>
      </View>
    )
  );
}
