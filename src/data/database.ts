import * as SQLite from 'expo-sqlite';

export const DATABASE_NAME = 'spacex.db';

export async function openDatabase() {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    return db;
}

export async function migrateDb(db: SQLite.SQLiteDatabase) {
    const DATABASE_VERSION = 1;

    // Enable foreign keys
    await db.execAsync('PRAGMA foreign_keys = ON;');

    // Create tables
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS launches (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      date_utc TEXT NOT NULL,
      date_unix INTEGER NOT NULL,
      success INTEGER, -- boolean 0 or 1
      rocket_id TEXT NOT NULL,
      launchpad_id TEXT NOT NULL,
      details TEXT,
      upcoming INTEGER NOT NULL, -- boolean
      links_patch_small TEXT,
      links_patch_large TEXT,
      links_webcast TEXT,
      flight_number INTEGER
    );

    CREATE TABLE IF NOT EXISTS launchpads (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      full_name TEXT,
      locality TEXT,
      region TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      status TEXT,
      details TEXT,
      launch_attempts INTEGER,
      launch_successes INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_launches_date ON launches(date_unix);
    CREATE INDEX IF NOT EXISTS idx_launches_success ON launches(success);
    CREATE INDEX IF NOT EXISTS idx_launches_launchpad ON launches(launchpad_id);
    CREATE INDEX IF NOT EXISTS idx_launches_rocket ON launches(rocket_id);
  `);

    console.log('Database migrated successfully');
}
