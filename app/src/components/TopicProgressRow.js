import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import { colours } from "../styles/colours";
import { iconDefaults } from "../styles/sharedStyles";

/**
 * Displays a learning topic's progress, including completion status and repeat count (if
 * applicable). Shows a progress bar based on completed items and highlights completed topics.
 */
export default function TopicProgressRow({ icon, name, completed, total, repeats }) {
  // check whether current progress is finished to change progress bar colour
  const isComplete = completed === total;
  // works out how full the bar should be, whilst avoiding dividing by 0
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <View style={styles.row}>
      <View style={styles.topRow}>
        <Ionicons name={icon} {...iconDefaults} />
        <Text style={styles.name}>{name}</Text>
        {/* only show repeat count if the topic is completed more than once */}
        {repeats > 0 && (
          <View style={styles.repeatBadge}>
            <Ionicons name="star" {...iconDefaults} />
            <Text style={styles.repeatCount}>{repeats}</Text>
          </View>
        )}
        <Text style={styles.fraction}>
          {completed}/{total}
        </Text>
      </View>
      <View style={styles.track}>
        {/* bar's width and colour calculated from completion data */}
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: isComplete ? colours.success : colours.primary,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 12,
    marginTop: 8,
    backgroundColor: colours.cards,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: colours.textPrimary,
    fontWeight: "600",
  },
  repeatBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  repeatCount: {
    color: colours.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  fraction: {
    color: colours.textLight,
    fontSize: 13,
  },
  track: {
    height: 6,
    overflow: "hidden",
    marginTop: 10,
    backgroundColor: colours.borderLight,
    borderRadius: 3,
  },
  fill: {
    height: "100%",
    borderRadius: 3,
  },
});
