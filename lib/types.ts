export type LanguageCode = "en" | "ur";
export type ConversationStatus = "idle" | "connecting" | "connected" | "disconnecting";
export type TriageLevel = "GREEN" | "YELLOW" | "RED" | "UNKNOWN";

export type TranscriptMessage = {
  id: string;
  role: "agent" | "user" | "system";
  text: string;
  timestamp: string;
};

export type SessionPayload = {
  language: LanguageCode;
  duration_seconds: number;
  triage_level: Exclude<TriageLevel, "UNKNOWN"> | "UNKNOWN";
  symptom_summary: string;
  agent_id: string;
};

export type MetricsResponse = {
  total: number;
  byLanguage: Record<"en" | "ur", number>;
  byTriage: Record<"GREEN" | "YELLOW" | "RED", number>;
  avgDuration: number;
  weeklyData: Array<{ date: string; sessions: number }>;
  source: "mock" | "database";
};
