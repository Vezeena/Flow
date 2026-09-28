/** Returns the number of topics the user has completed (mastered). */
export async function getCompletedQuizes(db) {
  return await db.getAllAsync("SELECT * FROM topic_progress WHERE completed = 1;");
}

/** Returns the number of topics the user has completed (mastered). */
export async function getCompletedQuizesCount(db) {
  const row = await db.getFirstAsync(
    "SELECT COUNT(*) AS count FROM topic_progress WHERE completed = 1;",
  );
  return row.count;
}

/** Saves a completed quiz attempt for a topic. passed: 1:0 = true:false */
export async function saveQuizAttempt(db, topicId, score, total, passed) {
  await db.runAsync(
    `INSERT INTO quiz_attempts (topic_id, score, total, passed, attempted_at)
     VALUES (?, ?, ?, ?, datetime('now'));`,
    [topicId, score, total, passed ? 1 : 0],
  );
}

/**
 * Updates the user's progress: points, best_score, and mastering a topic. Rules:
 *
 * - Award points only when the user improves their previous best score.
 * - Grant 2 points for each newly earned correct answer.
 * - Mark a topic as completed(mastery) when a perfect score is achieved.
 * - Once a topic is mastered, future perfect completions award a single point and increment the
 *   repeat counter.
 * - Equal or lower scores do not affect progress or points.
 */
export async function recordQuizResult(db, topicId, score, total, showAward) {
  const progress = await db.getFirstAsync(
    "SELECT best_score, completed, repeats FROM topic_progress WHERE topic_id = ?;",
    [topicId],
  );

  // previous high score (0 if no record)
  const previousBest = progress ? progress.best_score : 0;
  // whether the topic has been mastered (perfect score)
  const alreadyMastered = progress && progress.completed === 1;
  const quizResult = calculateQuizResult(previousBest, alreadyMastered, score, total);

  await db.withTransactionAsync(async () => {
    if (quizResult.isRepeatQuiz) {
      // award a small memory refresh bonus and track another successful topic repeat
      await db.runAsync("UPDATE stats SET points = points + ? WHERE id = 1;", [
        quizResult.pointsGained,
      ]);
      await db.runAsync("UPDATE topic_progress SET repeats = repeats + 1 WHERE topic_id = ?;", [
        topicId,
      ]);
    } else if (quizResult.pointsGained > 0) {
      // save only the positive difference (if any) in points (user improvement)
      await db.runAsync("UPDATE stats SET points = points + ? WHERE id = 1;", [
        quizResult.pointsGained,
      ]);
      //create a record for new attempts or update the existing record with
      // the new best score and completion info
      await db.runAsync(
        `INSERT INTO topic_progress (topic_id, best_score, total, completed, repeats)
         VALUES (?, ?, ?, ?, 0)
         ON CONFLICT(topic_id) DO UPDATE SET best_score = ?, completed = ?;`,
        [
          topicId,
          score,
          total,
          quizResult.nowMastered ? 1 : 0,
          score,
          quizResult.nowMastered ? 1 : 0,
        ],
      );

      // award the topic badge when topic first mastered
      if (quizResult.nowMastered) {
        await db.runAsync(
          `INSERT INTO badges (badge_id, earned, earned_at)
       VALUES (?, 1, datetime('now'))
       ON CONFLICT(badge_id) DO UPDATE SET earned = 1, earned_at = datetime('now');`,
          [topicId],
        );
        await showAward(topicId);
      }
    }
    // scores that are equal to or below the current best are ignored
  });

  // for showing whether it's a new best score or not
  return quizResult;
}

/** Returns progress of all topics. */
export async function getAllTopicsProgress(db) {
  return await db.getAllAsync(`SELECT * FROM topic_progress;`);
}

/**
 * Returns the most recent attempt and the best score for a topic. Last score: the user's most
 * recent attempt. Best score: the highest score recorded
 */
export async function getTopicScores(db, topicId) {
  // most recent attempt (full history is stored, so ordering by time = most recent first)
  const lastAttempt = await db.getFirstAsync(
    `SELECT score, total FROM quiz_attempts
     WHERE topic_id = ?
     ORDER BY attempted_at DESC
     LIMIT 1;`,
    [topicId],
  );

  // best score
  const progress = await db.getFirstAsync(
    "SELECT best_score, total FROM topic_progress WHERE topic_id = ?;",
    [topicId],
  );

  return {
    lastScore: lastAttempt ? lastAttempt.score : null,
    lastTotal: lastAttempt ? lastAttempt.total : null,
    bestScore: progress ? progress.best_score : null,
    bestTotal: progress ? progress.total : null,
  };
}

/**
 * Calculates a quiz attempt's results. Affects points gained, topic mastery, and repeats. Separated
 * from database access functions to be unit-testable.
 */
export function calculateQuizResult(previousBest, alreadyMastered, score, total) {
  const POINTS_MULTIPLIER = 2;

  // whether the topic has been mastered (perfect score)
  if (alreadyMastered) {
    return { pointsGained: 1, nowMastered: true, isRepeatQuiz: true };
  }

  // when a user improves their previous best, the difference in points
  // is awarded, and mastery for a perfect score
  if (score > previousBest) {
    return {
      pointsGained: (score - previousBest) * POINTS_MULTIPLIER,
      nowMastered: score === total,
      isRepeatQuiz: false,
    };
  }

  // equal or lower, not mastered: nothing changes
  return { pointsGained: 0, nowMastered: false, isRepeatQuiz: false };
}
