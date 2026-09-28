import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { colours } from "../styles/colours";
import { pressableDefaults } from "../styles/sharedStyles.js";

export default function IconButton({ style, name, onPress, size = 22, color = colours.primary }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable style={styles.button} onPress={onPress} {...pressableDefaults}>
        <Ionicons name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 9999,
    overflow: "hidden",
    margin: -8,
  },
  button: {
    padding: 8,
  },
});
