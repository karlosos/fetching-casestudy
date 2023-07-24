import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export const SQLITE_DB_PATH = "./apps/backend/sqlite.db";

export default {
  schema: "./apps/backend/src/models/*",
  out: "./apps/backend/src/drizzle",
  driver: 'better-sqlite',
  dbCredentials: {
    url: SQLITE_DB_PATH,
  }
} satisfies Config;
