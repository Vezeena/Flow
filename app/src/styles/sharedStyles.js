import { StyleSheet } from "react-native";

import { colours } from "./colours";

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.background,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: colours.textPrimary,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    padding: 14,
    backgroundColor: colours.cards,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  cardLabel: {
    color: colours.textLight,
    fontSize: 14,
  },
  viewAllPressableContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  viewAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 4,
    paddingLeft: 8,
  },
  viewAll: {
    color: colours.primary,
    fontSize: 14,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colours.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: colours.background,
    fontSize: 14,
    fontWeight: "600",
  },
});

export const iconDefaults = { size: 22, color: colours.primary };
export const pressableDefaults = { hitSlop: 13, android_ripple: { color: colours.ripple } };
