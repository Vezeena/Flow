import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet, View } from "react-native";

import { colours } from "../styles/colours";
import { iconDefaults, pressableDefaults, sharedStyles } from "../styles/sharedStyles";

/**
 * Displays a pressable card for a topic. Includes an icon and label, and triggers the provided
 * action when pressed.
 */
export default function TopicCard({ icon, label, onPress }) {
  return (
    <View style={[sharedStyles.cardContainer, styles.cardContainer]}>
      <Pressable style={[sharedStyles.card, styles.card]} onPress={onPress} {...pressableDefaults}>
        <Ionicons name={icon} {...iconDefaults} />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    color: colours.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
