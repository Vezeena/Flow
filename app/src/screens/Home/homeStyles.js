import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const homeStyles = StyleSheet.create({
  nextUpContainer: {
    gap: 5,
  },
  nextUpTitle: {
    color: colours.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  nextUpText: {
    color: colours.textLight,
    fontSize: 13,
    lineHeight: 19,
  },
  nextUpButtonContainer: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  statsRow: {
    flexDirection: "row",
    gap: 40,
    marginTop: 8,
  },
  statNumber: {
    color: colours.textPrimary,
    fontSize: 28,
    fontWeight: "700",
  },
  statLabel: {
    color: colours.textLight,
    fontSize: 13,
  },
  statDenominator: {
    color: colours.textLight,
    fontSize: 16,
    fontWeight: "400",
  },
  learnAboutTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicGrid: {
    gap: 10,
  },
  topicRow: {
    flexDirection: "row",
    gap: 10,
  },
});
