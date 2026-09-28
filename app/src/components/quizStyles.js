import { StyleSheet } from "react-native";

import { colours } from "../styles/colours";

export const quizStyles = StyleSheet.create({
  progress: {
    fontSize: 13,
    color: colours.textLight,
    marginBottom: 8,
    fontWeight: "600",
  },
  questionText: {
    color: colours.textPrimary,
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
    lineHeight: 25,
  },
  styleOptionContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  styleOption: {
    backgroundColor: colours.cards,
    padding: 16,
    borderColor: colours.borderLight,
    borderWidth: 1,
    borderRadius: 12,
  },
  optionCorrect: {
    backgroundColor: colours.successLight,
    borderColor: colours.success,
  },
  optionWrong: {
    backgroundColor: colours.redLight,
    borderColor: colours.red,
  },
  optionSelected: {
    backgroundColor: colours.light,
    borderColor: colours.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  feedback: {
    marginTop: 8,
    padding: 16,
    backgroundColor: colours.light,
    borderRadius: 12,
  },
  feedbackText: {
    color: colours.textPrimary,
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  nextButtonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colours.primary,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  nextButtonText: {
    color: colours.background,
    fontSize: 15,
    fontWeight: "600",
  },
  // results screen
  results: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  resultsTitle: {
    textAlign: "center",
    fontSize: 20,
    color: colours.textPrimary,
    fontWeight: "700",
    lineHeight: 27,
  },
  resultsSubtext: {
    textAlign: "center",
    color: colours.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  resultsScore: {
    textAlign: "center",
    fontSize: 16,
    color: colours.textLight,
    marginBottom: 20,
  },
});
