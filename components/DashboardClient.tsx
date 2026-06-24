"use client";

import { useEffect, useState } from "react";
import { Clock, Languages, PieChart, RefreshCw, UsersRound } from "lucide-react";

import { DashboardCharts } from "@/components/DashboardCharts";
import { MetricsCard } from "@/components/MetricsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/metrics";
import type { MetricsResponse } from "@/lib/types";

type DashboardClientProps = {
  initialMetrics: MetricsResponse;
};

export function DashboardClient({ initialMetrics }: DashboardClientProps) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isLoading, setIsLoading] = useState(false);

  async function refreshMetrics() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/metrics", { cache: "no-store" });
      if (response.ok) {
        setMetrics(await response.json());
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshMetrics();
  }, []);

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <Badge variant={metrics.source === "database" ? "green" : "muted"}>{metrics.source === "database" ? "Live Render DB" : "Mock + ready for Render DB"}</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">VoiceDoc traction dashboard</h1>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Monitor consultations, language adoption, triage severity, average duration, and weekly usage for the ElevenLabs grant application.
          </p>
        </div>
        <Button variant="secondary" onClick={refreshMetrics} disabled={isLoading}>
          <RefreshCw className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden="true" />
          Refresh metrics
        </Button>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" aria-label="Key metrics">
        <MetricsCard title="Total consultations" value={metrics.total.toLocaleString()} description="1,247 mock base plus live sessions" icon={<UsersRound className="h-6 w-6" aria-hidden="true" />} />
        <MetricsCard title="Languages used" value={`${metrics.byLanguage.ur.toLocaleString()} Urdu`} description={`${metrics.byLanguage.en.toLocaleString()} English consultations`} icon={<Languages className="h-6 w-6" aria-hidden="true" />} />
        <MetricsCard title="Triage outcomes" value={`${metrics.byTriage.RED} red`} description={`${metrics.byTriage.GREEN} green · ${metrics.byTriage.YELLOW} yellow`} icon={<PieChart className="h-6 w-6" aria-hidden="true" />} />
        <MetricsCard title="Avg. duration" value={formatDuration(metrics.avgDuration)} description="Optimized for short voice turns" icon={<Clock className="h-6 w-6" aria-hidden="true" />} />
      </section>

      <section className="mt-8" aria-label="Metrics charts">
        <DashboardCharts metrics={metrics} />
      </section>
    </>
  );
}
