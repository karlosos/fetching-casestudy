import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { SQLITE_DB_PATH } from '../../drizzle.config';

const sqlite = new Database(SQLITE_DB_PATH);
export const db = drizzle(sqlite);
