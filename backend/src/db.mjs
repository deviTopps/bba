import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export function openDb(filename = process.env.DATABASE_PATH || './data/bba.sqlite') {
  if (filename !== ':memory:') mkdirSync(dirname(resolve(filename)), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS admins (email TEXT PRIMARY KEY, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, email TEXT NOT NULL REFERENCES admins(email), expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, kind TEXT NOT NULL, data TEXT NOT NULL, updated TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS records_kind ON records(kind, updated);
    CREATE UNIQUE INDEX IF NOT EXISTS post_slug ON records(json_extract(data, '$.slug')) WHERE kind='posts';
    CREATE TABLE IF NOT EXISTS admin_access (email TEXT PRIMARY KEY REFERENCES admins(email), role TEXT NOT NULL DEFAULT 'admin', active INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS activity (id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT NOT NULL, action TEXT NOT NULL, kind TEXT NOT NULL, recordId TEXT NOT NULL, fields TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS activity_record ON activity(kind, recordId, id);
  `);
  return db;
}
