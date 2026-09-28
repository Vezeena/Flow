import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, ScrollView, Alert, Linking, Pressable } from "react-native";

import { NearbyAlertsErrorBanner } from "../../alerts/NearbyAlertsErrorBanner.js";
import { useNearbyAlerts } from "../../alerts/useNearbyAlerts.js";
import AlertCardSummarised from "../../components/AlertCardSummarised.js";
import HubRow from "../../components/HubRow";
import { severeWarningFloodSteps } from "../../content/alertSteps";
import { LocationPermissionBanner } from "../../location/LocationPermissionBanner.js";
import { NotificationsPermissionBanner } from "../../notifications/NotificationsPermissionBanner.js";
import { colours } from "../../styles/colours";
import { iconDefaults, pressableDefaults, sharedStyles } from "../../styles/sharedStyles";
import { hubStyles } from "./hubStyles";

/**
 * Displays the hub screen, providing access to emergency resources, support contacts, and
 * educational topics.
 */
export default function Hub({ navigation }) {
  const { nearbyAlerts } = useNearbyAlerts();
  // alerts are sorted by severity
  const hasSevereAlert = nearbyAlerts?.[0]?.severityLevel === 1;

  const [stepsMinimised, setStepsMinimised] = useState(false);

  // dial a resource phone number with a confirmation dialogue first
  function callPhoneNumber(number, name) {
    Alert.alert(`Call ${name}?`, `This will ring ${number}.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL(`tel:${number}`) },
    ]);
  }

  // dial emergency services
  function callEmergencyNumber() {
    Alert.alert("Call 999?", "This will call emergency services.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call 999",
        style: "destructive",
        onPress: () => Linking.openURL("tel:999"),
      },
    ]);
  }

  // open a resource web link
  function openWebLink(url) {
    Linking.openURL(url);
  }
  return (
    <>
      <NotificationsPermissionBanner />
      <LocationPermissionBanner />
      <NearbyAlertsErrorBanner />

      <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
        {/* Summarised alerts */}
        <AlertCardSummarised showNoAlerts={false} />

        {/* what to do steps */}
        {hasSevereAlert && (
          <>
            {/* collapsible what to do steps */}
            <View style={hubStyles.stepsContainer}>
              <View style={hubStyles.stepsHeader}>
                <Text style={[sharedStyles.heading, hubStyles.stepsHeading]}>What to do</Text>
                {/* minimise what to do steps button */}
                <View style={hubStyles.minimiseButtonContainer}>
                  <Pressable
                    {...pressableDefaults}
                    style={hubStyles.minimiseButton}
                    onPress={() => setStepsMinimised(!stepsMinimised)}
                  >
                    <Text style={hubStyles.minimiseText}>
                      {stepsMinimised ? "Show" : "Minimise"}
                    </Text>
                    <Ionicons
                      name={stepsMinimised ? "chevron-down" : "chevron-up"}
                      {...iconDefaults}
                    />
                  </Pressable>
                </View>
              </View>

              {!stepsMinimised &&
                severeWarningFloodSteps.map((step, index) => {
                  const isLastStep = index === severeWarningFloodSteps.length - 1;
                  return (
                    <View
                      key={index}
                      style={[hubStyles.stepsRow, isLastStep && hubStyles.stepsRowLast]}
                    >
                      <View style={hubStyles.stepsNumber}>
                        <Text style={hubStyles.stepsNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={hubStyles.stepsText}>{step}</Text>
                    </View>
                  );
                })}
            </View>

            {/* call 999 button kept always visible */}
            <View style={hubStyles.callButtonContainer}>
              <Pressable
                {...pressableDefaults}
                style={hubStyles.callButton}
                onPress={callEmergencyNumber}
              >
                <Ionicons name="call" {...iconDefaults} color={colours.red} />
                <Text style={hubStyles.callButtonText}>Call 999</Text>
              </Pressable>
            </View>
          </>
        )}
        {/* Helplines & resources */}
        <View>
          <Text style={sharedStyles.heading}>Helplines & resources</Text>
          {/* sourced from: https://check-for-flooding.service.gov.uk/*/}
          <HubRow
            icon="call-outline"
            label="Floodline"
            trailingText="0345 988 1188"
            onPress={() => callPhoneNumber("03459881188", "Floodline")}
          />
          <HubRow
            icon="book-outline"
            label="Check flood risk"
            onPress={() => openWebLink("https://check-for-flooding.service.gov.uk/")}
          />
          <HubRow
            icon="business-outline"
            label="Your council"
            onPress={() => openWebLink("https://www.gov.uk/find-local-council")}
          />
          {/*from: https://www.powercut105.com/en/*/}
          <HubRow
            icon="flash-outline"
            label="Power cut"
            trailingText="105"
            onPress={() => callPhoneNumber("105", "Power cut number")}
          />
          <HubRow
            icon="alert-circle-outline"
            label="Report flooding"
            onPress={() => openWebLink("https://www.gov.uk/report-flood-cause")}
          />
          <HubRow
            icon="information-outline"
            label="Report flooding"
            onPress={() => openWebLink("https://www.gov.uk/report-flood-cause")}
          />
        </View>
        {/* Topics */}
        <View>
          <Text style={sharedStyles.heading}>Topics</Text>
          <HubRow
            icon="water-outline"
            label="Flood preparedness"
            onPress={() =>
              navigation.navigate("Topic", {
                topicId: "flood-preparedness",
                title: "Flood preparedness",
              })
            }
          />
          <HubRow
            icon="home-outline"
            label="Household plan"
            onPress={() =>
              navigation.navigate("Topic", {
                topicId: "household-plan",
                title: "Household plan",
              })
            }
          />
          <HubRow
            icon="briefcase-outline"
            label="Emergency kit"
            onPress={() =>
              navigation.navigate("Topic", {
                topicId: "emergency-kit",
                title: "Emergency kit",
              })
            }
          />
          <HubRow
            icon="medkit-outline"
            label="First aid basics"
            onPress={() =>
              navigation.navigate("Topic", {
                topicId: "first-aid",
                title: "First aid basics",
              })
            }
          />
          <HubRow
            icon="arrow-redo-outline"
            label="Evacuation"
            onPress={() =>
              navigation.navigate("Topic", {
                topicId: "evacuation",
                title: "Evacuation",
              })
            }
          />
        </View>
      </ScrollView>
    </>
  );
}
