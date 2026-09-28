/** Returns the total number of checked items. */
export async function getCheckedItemsCount(db) {
  const row = await db.getFirstAsync("SELECT COUNT(*) AS count FROM checklist_progress;");
  return row.count;
}

/** Returns the ticked items' indices for a topic. */
export async function getCheckedItems(db, topicID) {
  // get the ticked checklist info
  const tickedChecklistRows = await db.getAllAsync(
    "SELECT item_index FROM checklist_progress WHERE topic_id = ?;",
    [topicID],
  );

  // return only the indices as an array
  return tickedChecklistRows.map((row) => row.item_index);
}

/** Ticks a checklist item. */
export async function checkItem(db, topicId, itemIndex) {
  // error handling (do nothing) of already ticked rows
  await db.runAsync(
    `INSERT INTO checklist_progress (topic_id, item_index)
     VALUES (?, ?)
     ON CONFLICT(topic_id, item_index) DO NOTHING;`,
    [topicId, itemIndex],
  );
}

/** Unticks a checklist item. */
export async function uncheckItem(db, topicId, itemIndex) {
  await db.runAsync("DELETE FROM checklist_progress WHERE topic_id = ? AND item_index = ?;", [
    topicId,
    itemIndex,
  ]);
}
