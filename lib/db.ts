import "server-only";

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

export function hasDbEnv() {
  return Boolean(connectionString);
}

const sql = connectionString ? postgres(connectionString) : null;

// Initialize the sessions table if it doesn't exist
if (sql) {
  sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      language VARCHAR(10),
      duration_seconds INTEGER,
      triage_level VARCHAR(50),
      symptom_summary TEXT,
      agent_id VARCHAR(255)
    );
  `.catch((err) => {
    console.error("Failed to initialize database table:", err);
  });
}

export function getDb() {
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return sql;
}
