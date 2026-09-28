import { StyleSheet } from "react-native";

import { colours } from "../styles/colours.js";

export const bannerStyles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  amber: {
    backgroundColor: colours.amberLight,
    borderColor: colours.amber,
  },
  red: {
    backgroundColor: colours.redLight,
    borderColor: colours.red,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: colours.textPrimary,
  },
  actionContainer: {
    borderRadius: 6,
    overflow: "hidden",
  },
  action: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: "600",
    color: colours.primary,
  },
});
