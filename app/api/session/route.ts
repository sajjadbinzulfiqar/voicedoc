import { NextResponse } from "next/server";

import { getDb, hasDbEnv } from "@/lib/db";
import type { SessionPayload } from "@/lib/types";

function isSessionPayload(value: unknown): value is SessionPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<SessionPayload>;
  return (
    (payload.language === "en" || payload.language === "ur") &&
    typeof payload.duration_seconds === "number" &&
    typeof payload.triage_level === "string" &&
    typeof payload.symptom_summary === "string" &&
    typeof payload.agent_id === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isSessionPayload(body)) {
    return NextResponse.json(
      {
        error: "Expected { language, duration_seconds, triage_level, symptom_summary, agent_id }.",
      },
      { status: 400 },
    );
  }

  if (!hasDbEnv()) {
    return NextResponse.json({ stored: false, reason: "Database environment variable is not configured." }, { status: 202 });
  }

  try {
    const sql = getDb();
    await sql`
      INSERT INTO sessions (language, duration_seconds, triage_level, symptom_summary, agent_id)
      VALUES (
        ${body.language},
        ${Math.max(0, Math.round(body.duration_seconds))},
        ${body.triage_level},
        ${body.symptom_summary.slice(0, 1000)},
        ${body.agent_id}
      )
    `;
  } catch (error) {
    return NextResponse.json({ stored: false, error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }

  return NextResponse.json({ stored: true });
}
