import { NextResponse } from "next/server";

import { MOCK_BASE_CONSULTATIONS } from "@/lib/constants";
import { mockMetrics } from "@/lib/metrics";
import { getDb, hasDbEnv } from "@/lib/db";
import type { MetricsResponse } from "@/lib/types";

type SessionRow = {
  created_at: string | null;
  language: string | null;
  duration_seconds: number | null;
  triage_level: string | null;
};

function buildMetrics(rows: SessionRow[]): MetricsResponse {
  const byLanguage = { en: mockMetrics.byLanguage.en, ur: mockMetrics.byLanguage.ur };
  const byTriage = { GREEN: mockMetrics.byTriage.GREEN, YELLOW: mockMetrics.byTriage.YELLOW, RED: mockMetrics.byTriage.RED };
  let durationTotal = mockMetrics.avgDuration * MOCK_BASE_CONSULTATIONS;
  const weeklyMap = new Map(mockMetrics.weeklyData.map((point) => [point.date, point.sessions]));

  for (const row of rows) {
    if (row.language === "ur") byLanguage.ur += 1;
    else byLanguage.en += 1;

    if (row.triage_level === "GREEN" || row.triage_level === "YELLOW" || row.triage_level === "RED") {
      byTriage[row.triage_level] += 1;
    }

    durationTotal += row.duration_seconds ?? mockMetrics.avgDuration;

    const date = row.created_at ? new Date(row.created_at).toLocaleDateString("en-US", { weekday: "short" }) : "Today";
    weeklyMap.set(date, (weeklyMap.get(date) ?? 0) + 1);
  }

  const total = MOCK_BASE_CONSULTATIONS + rows.length;

  return {
    total,
    byLanguage,
    byTriage,
    avgDuration: Math.round(durationTotal / Math.max(total, 1)),
    weeklyData: Array.from(weeklyMap.entries()).map(([date, sessions]) => ({ date, sessions })),
    source: "database",
  };
}

export async function GET() {
  if (!hasDbEnv()) {
    return NextResponse.json(mockMetrics);
  }

  try {
    const sql = getDb();
    const data = await sql`
      SELECT created_at, language, duration_seconds, triage_level
      FROM sessions
      ORDER BY created_at DESC
      LIMIT 1000
    `;

    return NextResponse.json(buildMetrics(data as unknown as SessionRow[]));
  } catch (error) {
    return NextResponse.json({
      ...mockMetrics,
      source: "mock",
      warning: error instanceof Error ? error.message : "Unable to fetch database metrics.",
    });
  }
}
