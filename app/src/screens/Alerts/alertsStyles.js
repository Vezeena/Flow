import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const alertsStyles = StyleSheet.create({
  locationLoading: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  locationError: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationErrorText: {
    flex: 1,
    fontSize: 13,
    color: colours.textLight,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationName: {
    fontSize: 16,
    color: colours.textPrimary,
    fontWeight: "700",
  },

  // alert card
  alertCard: {
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
  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colours.textPrimary,
  },
  alertSubtext: {
    fontSize: 13,
    marginTop: 2,
    color: colours.textLight,
  },
  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  warningSevere: {
    backgroundColor: colours.redLight,
    borderLeftColor: colours.red,
    borderColor: colours.red,
  },
  warningAmber: {
    backgroundColor: colours.amberLight,
    borderLeftColor: colours.amber,
    borderColor: colours.amber,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colours.textPrimary,
  },
  warningSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colours.textLight,
  },
  warningDescription: {
    fontSize: 13,
    marginTop: 2,
    color: colours.textLight,
  },
  warningMessage: {
    fontSize: 13,
    marginTop: 8,
    color: colours.textPrimary,
  },
  warningTime: {
    fontSize: 13,
    marginTop: 8,
    color: colours.textLight,
  },
  warningFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    borderTopColor: colours.red,
    borderTopWidth: 1,
  },
  whatToDoButtonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
    marginBottom: -8,
  },
  whatToDoButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  whatToDoText: {
    fontSize: 13,
    color: colours.red,
    fontWeight: "600",
  },
  hasWarningView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  // Other locations
  locationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginTop: 8,
    backgroundColor: colours.cards,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  locationItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: colours.textPrimary,
  },
  locationItemStatus: {
    fontSize: 13,
    color: colours.textLight,
  },
  map: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  fullscreenMap: {
    flex: 1,
    backgroundColor: colours.background,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    alignSelf: "flex-end",
    backgroundColor: colours.background,
  },
  mapHint: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mapHintText: {
    color: "white",
    fontSize: 12,
  },
  otherLocations: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
