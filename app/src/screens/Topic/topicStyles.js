import { StyleSheet } from "react-native";

import { colours } from "../../styles/colours";

export const topicStyles = StyleSheet.create({
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: colours.textPrimary,
    marginBottom: 12,
  },
  topicImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginVertical: 12,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colours.cards,
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
    borderColor: colours.light,
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.primary,
  },
  quizButtonContainer: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  quizButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colours.light,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colours.background,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.primary,
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 8,
  },
});
