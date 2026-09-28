import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet, View } from "react-native";

import { colours } from "../styles/colours";
import { iconDefaults, pressableDefaults } from "../styles/sharedStyles";

/**
 * Displays a pressable row used in hub lists. Includes an icon, label, optional trailing text, and
 * navigation indicator '>'.
 */
export default function HubRow({ icon, label, trailingText, onPress }) {
  return (
    <View style={styles.rowContainer}>
      <Pressable style={styles.row} onPress={onPress} {...pressableDefaults}>
        <Ionicons name={icon} {...iconDefaults} />
        <Text style={styles.label}>{label}</Text>
        {trailingText && <Text style={styles.trailingText}>{trailingText}</Text>}
        <Ionicons name="chevron-forward" {...iconDefaults} color={colours.textLight} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: colours.cards,
    gap: 12,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  label: {
    flex: 1,
    color: colours.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  trailingText: {
    fontSize: 14,
    color: colours.textLight,
  },
});
