import { calculateQuizResult } from "../src/database/quizQueries.js";

// These follow the manual testing chart shown in the report for Section 5.4, Sprint 3: Figure 25 and Table 10
// However, these reflect the updated quizzes by testing all 5 questions instead of 2 shown in the previous sprint.
// They also include edge cases not previously tested, and as such the ordering is also different to the manual testing.
describe("calculateQuizResult", () => {
  test("Attempt 1: partial points, no mastery", () => {
    // previousBest starts at 0 as this is the first attempt, no mastery, gets 3 correct answers of 5
    const result = calculateQuizResult(0, false, 3, 5);
    // (3 - 0 ) * 2 = 6 points (points multiplier is 2 for each correct answer)
    expect(result.pointsGained).toBe(6);
    expect(result.nowMastered).toBe(false);
    expect(result.isRepeatQuiz).toBe(false);
  });

  test("Attempt 2: a lower score, no change in points", () => {
    // previousBest 3, gets 2 correct this time, 2 < 3
    const result = calculateQuizResult(3, false, 2, 5);
    expect(result.pointsGained).toBe(0);
    expect(result.nowMastered).toBe(false);
  });

  test("Attempt 3: the same score, no change in points", () => {
    const result = calculateQuizResult(3, false, 3, 5);
    expect(result.pointsGained).toBe(0);
    expect(result.nowMastered).toBe(false);
  });

  test("Attempt 4: improves score from 3 to 4/5, awards difference in points", () => {
    const result = calculateQuizResult(3, false, 4, 5);
    // (4 - 3 ) * 2 = 2 points gained
    expect(result.pointsGained).toBe(2);
    expect(result.nowMastered).toBe(false);
    expect(result.isRepeatQuiz).toBe(false);
  });

  test("Attempt 5: perfect score (5/5), awards mastery", () => {
    const result = calculateQuizResult(4, false, 5, 5);
    // (5 - 4 ) * 2 = 2 points gained
    expect(result.pointsGained).toBe(2);
    expect(result.nowMastered).toBe(true);
    expect(result.isRepeatQuiz).toBe(false);
  });

  test("Attempt 6: after mastery repeat gains 1 point", () => {
    const result = calculateQuizResult(5, true, 5, 5);
    // repeats award 1 point
    expect(result.pointsGained).toBe(1);
    expect(result.isRepeatQuiz).toBe(true);
  });
});
