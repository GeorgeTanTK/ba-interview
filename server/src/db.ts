import Database from 'better-sqlite3';
import { seedFunds, seedClients } from './seed';

export const db = new Database('data.db');

// Drop tables that don't have the latest schema. The seed re-populates them.
function dropIfMissingColumn(table: string, column: string) {
  const cols = (
    db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]
  ).map((c) => c.name);
  if (cols.length > 0 && !cols.includes(column)) {
    db.exec(`DROP TABLE ${table}`);
  }
}
dropIfMissingColumn('funds', 'aum_millions');
dropIfMissingColumn('clients', 'aum_millions');

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS funds (
    ticker TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    asset_class TEXT NOT NULL,
    manager TEXT NOT NULL,
    aum TEXT NOT NULL,
    aum_millions INTEGER NOT NULL,
    nav TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    advisor TEXT NOT NULL,
    segment TEXT NOT NULL,
    aum TEXT NOT NULL,
    aum_millions INTEGER NOT NULL,
    status TEXT NOT NULL
  );
`);

seedFunds(db);
seedClients(db);
