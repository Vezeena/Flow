import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

import { pressableDefaults, sharedStyles } from "../styles/sharedStyles";
import { quizStyles } from "./quizStyles";

/** Displays a multiple choice quiz and its answer choices. */
export default function Quiz({ questions, onComplete }) {
  // question currently on
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // answer the user selected
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // score handling
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // gets current question object from the array, gives:
  // question.question, question.options, question.correctAnswerIndex, question.feedback
  const question = questions[currentQuestionIndex];

  // selecting a quiz option doesn't answer it until the user submits
  function handleSelectAnswer(index) {
    // no changes allowed if submitted
    if (hasAnswered) return;
    setSelectedAnswerIndex(index);
  }

  // press a button to submit the answer
  function handleSubmitAnswer() {
    setHasAnswered(true);
    if (selectedAnswerIndex === question.correctAnswerIndex) {
      setScore(score + 1);
    }
  }

  // move on to the next question
  function handleNextQuestion() {
    // check whether it's the last question, finish the quiz if it is, continue if not
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      setFinished(true);
    } else {
      // reset and move on to the next question
      setSelectedAnswerIndex(null);
      setHasAnswered(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  // results screen:
  if (finished) {
    const totalQuestions = questions.length;
    // user passes at 70%
    const passed = score >= Math.ceil(totalQuestions * 0.7);

    return (
      <View style={quizStyles.results}>
        <Text style={quizStyles.resultsTitle}>{passed ? "Well done!" : "Keep practising"}</Text>
        <Text style={quizStyles.resultsSubtext}>
          {passed
            ? "You're well prepared for this topic."
            : "Review the content and try again when you feel ready."}
        </Text>
        <Text style={quizStyles.resultsScore}>
          You scored {score} out of {totalQuestions}
        </Text>

        {/* save the attempt: onComplete passes the results up to Topic */}
        <View style={quizStyles.nextButtonContainer}>
          <Pressable
            style={quizStyles.nextButton}
            onPress={() => onComplete(score, totalQuestions, passed)}
            {...pressableDefaults}
          >
            <Text style={quizStyles.nextButtonText}>Done</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // questions screen:
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={sharedStyles.content}>
      <View>
        <Text style={quizStyles.progress}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <Text style={quizStyles.questionText}>{question.question}</Text>

        {/* map each question and their answer options as pressables */}
        {question.options.map((option, index) => {
          let styleOption = quizStyles.styleOption;
          // answered
          if (hasAnswered) {
            // only after submitting reveal whether it's right or wrong
            if (index === question.correctAnswerIndex) {
              styleOption = [quizStyles.styleOption, quizStyles.optionCorrect];
            } else if (index === selectedAnswerIndex) {
              styleOption = [quizStyles.styleOption, quizStyles.optionWrong];
            }
            // selected
          } else if (index === selectedAnswerIndex) {
            // before they submit, show selected styling only
            styleOption = [quizStyles.styleOption, quizStyles.optionSelected];
          }
          return (
            <View key={index} style={quizStyles.styleOptionContainer}>
              <Pressable
                style={styleOption}
                onPress={() => handleSelectAnswer(index)}
                {...pressableDefaults}
              >
                <Text>{option}</Text>
              </Pressable>
            </View>
          );
        })}

        {/* before a user answers it displays a select button,
         after answering it displays a feedback and next button */}
        {!hasAnswered ? (
          <View style={quizStyles.nextButtonContainer}>
            <Pressable
              style={[
                quizStyles.nextButton,
                selectedAnswerIndex === null && quizStyles.buttonDisabled,
              ]}
              onPress={handleSubmitAnswer}
              disabled={selectedAnswerIndex === null}
              {...pressableDefaults}
            >
              <Text style={quizStyles.nextButtonText}>Select answer</Text>
            </Pressable>
          </View>
        ) : (
          <View style={quizStyles.feedback}>
            <Text style={quizStyles.feedbackText}>{question.feedback}</Text>
            <View style={quizStyles.nextButtonContainer}>
              <Pressable
                style={quizStyles.nextButton}
                onPress={handleNextQuestion}
                {...pressableDefaults}
              >
                <Text style={quizStyles.nextButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
