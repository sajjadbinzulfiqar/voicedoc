import { NextResponse } from "next/server";

import { createSupabaseAdminClient, hasSupabaseEnv } from "@/lib/supabase";
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

  if (!hasSupabaseEnv()) {
    return NextResponse.json({ stored: false, reason: "Supabase environment variables are not configured." }, { status: 202 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("sessions").insert({
    language: body.language,
    duration_seconds: Math.max(0, Math.round(body.duration_seconds)),
    triage_level: body.triage_level,
    symptom_summary: body.symptom_summary.slice(0, 1000),
    agent_id: body.agent_id,
  });

  if (error) {
    return NextResponse.json({ stored: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ stored: true });
}
