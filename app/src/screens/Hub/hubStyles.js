import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const hubStyles = StyleSheet.create({
  // what to do steps
  stepsContainer: {
    backgroundColor: colours.cards,
    padding: 14,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  stepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepsHeading: {
    marginBottom: 0,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: colours.borderLight,
  },
  stepsRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  stepsNumber: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colours.primary,
  },
  stepsNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: colours.background,
  },
  stepsText: {
    flex: 1,
    fontSize: 15,
    color: colours.textPrimary,
  },
  minimiseButtonContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  minimiseButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingLeft: 4,
    gap: 4,
  },
  minimiseText: {
    fontSize: 15,
    color: colours.primary,
    fontWeight: "600",
  },

  // call button
  callButtonContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    backgroundColor: colours.redLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colours.red,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colours.red,
  },
});
