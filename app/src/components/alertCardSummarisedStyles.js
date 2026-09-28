import { StyleSheet } from "react-native";

import { colours } from "../styles/colours";

export const alertCardSummarisedStyles = StyleSheet.create({
  // flood alert banner summarised
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: colours.light,
    borderColor: colours.primary,
    borderLeftWidth: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  bannerSevere: {
    backgroundColor: colours.redLight,
    borderLeftColor: colours.red,
    borderColor: colours.red,
  },
  bannerAmber: {
    backgroundColor: colours.amberLight,
    borderLeftColor: colours.amber,
    borderColor: colours.amber,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colours.textPrimary,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colours.textLight,
  },
  bannerSubtext: {
    fontSize: 13,
    marginTop: 2,
    color: colours.textLight,
  },
});
