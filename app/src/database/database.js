/** Initialise device database. */
export async function initDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);

  const row = await db.getFirstAsync("PRAGMA user_version;");
  let version = row && typeof row.user_version === "number" ? row.user_version : 0;

  await db.withTransactionAsync(async () => {
    if (version < 1) {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS topic_progress (
          topic_id TEXT PRIMARY KEY,
          completed INTEGER NOT NULL DEFAULT 0,
          total INTEGER NOT NULL DEFAULT 0,
          best_score INTEGER NOT NULL DEFAULT 0,
          repeats INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS badges (
          badge_id TEXT PRIMARY KEY,
          earned INTEGER NOT NULL DEFAULT 0,
          earned_at DATETIME
        );

        CREATE TABLE IF NOT EXISTS stats (
          id INTEGER PRIMARY KEY,
          points INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          topic_id TEXT NOT NULL,
          score INTEGER NOT NULL,
          total INTEGER NOT NULL,
          passed INTEGER NOT NULL,
          attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS checklist_progress (
          topic_id TEXT NOT NULL,
          item_index INTEGER NOT NULL,
          checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (topic_id, item_index)
        );

        CREATE TABLE IF NOT EXISTS locations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          place_name TEXT,
          region TEXT,
          type TEXT NOT NULL CHECK (type IN ('gps', 'saved'))
        );

        INSERT OR IGNORE INTO stats (id, points) VALUES (1, 0);

        PRAGMA user_version = 1;
      `);
      version = 1;
    }
  });
}
