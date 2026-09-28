import { StyleSheet } from "react-native";

import { colours } from "../styles/colours";

export const checklistStyles = StyleSheet.create({
  itemContainer: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: colours.cards,
    gap: 12,
    borderColor: colours.borderLight,
    borderRadius: 12,
    borderWidth: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: colours.textPrimary,
  },
});
