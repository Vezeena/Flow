import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import { colours } from "../styles/colours";
import { iconDefaults } from "../styles/sharedStyles";

/** Displays a badge with its icon and name. Shows different styling when locked and unlocked. */
export default function Badge({ icon, name, earned, colour }) {
  return (
    <View style={styles.badge}>
      <View style={[styles.circle, earned ? { backgroundColor: colour } : styles.circleLocked]}>
        {earned ? (
          <Ionicons name={icon} {...iconDefaults} color={colours.background} />
        ) : (
          <Ionicons name="lock-closed" {...iconDefaults} color={colours.textLight} />
        )}
      </View>
      <Text style={[styles.name, !earned && styles.nameLocked]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    width: "22%",
    gap: 6,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  circleLocked: {
    backgroundColor: colours.background,
    borderColor: colours.borderDark,
    borderStyle: "dashed",
    borderWidth: 2,
  },
  name: {
    textAlign: "center",
    fontSize: 12,
    color: colours.textPrimary,
  },
  nameLocked: {
    color: colours.textLight,
  },
});
