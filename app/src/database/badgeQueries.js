/** Returns the number of badges that have been awarded. */
export async function getAwardedBadges(db) {
  return await db.getAllAsync("SELECT * FROM badges WHERE earned = 1;");
}

/** Returns whether a badge has already been awarded. */
export async function isBadgeAwarded(db, badgeId) {
  const row = await db.getFirstAsync("SELECT earned FROM badges WHERE badge_id = ?;", [badgeId]);
  return row?.earned === 1;
}

/** Awards a badge. */
export async function awardBadge(db, badgeId) {
  await db.runAsync(
    `
      INSERT INTO badges (badge_id, earned, earned_at)
      VALUES (?, 1, datetime('now'))
      ON CONFLICT(badge_id) DO UPDATE SET earned = 1, earned_at = datetime('now');
    `,
    [badgeId],
  );
}
