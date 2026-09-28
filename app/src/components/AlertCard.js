import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";

import { alertsStyles } from "../screens/Alerts/alertsStyles";
import { colours } from "../styles/colours";
import { iconDefaults, pressableDefaults } from "../styles/sharedStyles";

export default function AlertCard({ alert, navigation }) {
  // set styling based on severity
  const isSevere = alert.severityLevel === 1;
  const cardStyle = isSevere ? alertsStyles.warningSevere : alertsStyles.warningAmber;
  const iconColour = isSevere ? colours.red : colours.amber;

  return (
    <View style={[alertsStyles.warningCard, cardStyle]}>
      <Ionicons name="warning" {...iconDefaults} color={iconColour} />
      <View style={alertsStyles.warningTextContainer}>
        <Text style={alertsStyles.warningTitle}>
          {alert.title} <Text style={alertsStyles.warningSubtitle}>{alert.county}</Text>
        </Text>
        <Text style={alertsStyles.warningDescription}>{alert.description}</Text>
        <Text style={alertsStyles.warningMessage}>{alert.message}</Text>
        <Text style={alertsStyles.warningTime}>
          {new Date(alert.timeRaised).toLocaleString("en-GB")}
        </Text>

        {/* only show footer if this is a severe alert */}
        {isSevere && (
          <View style={alertsStyles.warningFooter}>
            <View style={alertsStyles.whatToDoButtonContainer}>
              <Pressable
                style={alertsStyles.whatToDoButton}
                onPress={() => navigation.navigate("Hub")}
                {...pressableDefaults}
              >
                <Text style={alertsStyles.whatToDoText}>What to do →</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
