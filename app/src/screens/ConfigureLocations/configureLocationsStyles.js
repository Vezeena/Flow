import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const configureLocationsStyles = StyleSheet.create({
  searchInput: {
    padding: 14,
    fontSize: 14,
    color: colours.textPrimary,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  rows: {
    gap: 12,
  },
  savedRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: colours.cards,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  savedName: {
    flex: 1,
    color: colours.textPrimary,
    fontSize: 14,
  },
});
