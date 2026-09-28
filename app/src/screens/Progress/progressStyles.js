import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const progressStyles = StyleSheet.create({
  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  achievementPoints: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  achievementNumber: {
    color: colours.textPrimary,
    fontSize: 30,
    fontWeight: "700",
  },
  achievementLabel: {
    color: colours.textLight,
    fontSize: 14,
  },
  achievementReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  achievementRewardText: {
    fontSize: 13,
    color: colours.textLight,
  },
  achievementTrack: {
    height: 8,
    marginTop: 12,
    overflow: "hidden",
    backgroundColor: colours.borderLight,
    borderRadius: 4,
  },
  achievementFill: {
    height: "100%",
    backgroundColor: colours.primary,
    borderRadius: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 16,
    marginTop: 8,
  },
});
