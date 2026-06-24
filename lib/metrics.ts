import { MOCK_BASE_CONSULTATIONS } from "./constants";
import type { MetricsResponse } from "./types";

export const mockWeeklyData = [
  { date: "Mon", sessions: 143 },
  { date: "Tue", sessions: 167 },
  { date: "Wed", sessions: 152 },
  { date: "Thu", sessions: 188 },
  { date: "Fri", sessions: 206 },
  { date: "Sat", sessions: 129 },
  { date: "Sun", sessions: 94 },
];

export const mockMetrics: MetricsResponse = {
  total: MOCK_BASE_CONSULTATIONS,
  byLanguage: { en: 742, ur: 505 },
  byTriage: { GREEN: 812, YELLOW: 351, RED: 84 },
  avgDuration: 238,
  weeklyData: mockWeeklyData,
  source: "mock",
};

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining.toString().padStart(2, "0")}s`;
}

export function getEmptyMetrics(): MetricsResponse {
  return { ...mockMetrics, weeklyData: [...mockWeeklyData] };
}
