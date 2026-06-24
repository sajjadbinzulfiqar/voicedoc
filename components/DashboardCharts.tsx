"use client";

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricsResponse } from "@/lib/types";

const triageColors = {
  GREEN: "#22c55e",
  YELLOW: "#f59e0b",
  RED: "#ef4444",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111] p-3 text-white shadow-xl">
        {label && <p className="mb-2 font-medium text-white/70">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color || entry.payload.fill || entry.payload.payload?.fill }} />
            <span className="text-sm font-medium">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts({ metrics }: { metrics: MetricsResponse }) {
  const languageData = [
    { name: "English", value: metrics.byLanguage.en, fill: "#ff6b00" },
    { name: "Urdu", value: metrics.byLanguage.ur, fill: "#f97316" },
  ];

  const triageData = Object.entries(metrics.byTriage).map(([name, value]) => ({
    name,
    value,
    fill: triageColors[name as keyof typeof triageColors],
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Sessions this week</CardTitle>
          <p className="text-sm leading-6 text-white/55">Weekly trend of VoiceDoc consultations including demo and live Database sessions.</p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.weeklyData} margin={{ top: 12, right: 20, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Line type="monotone" dataKey="sessions" stroke="#ff6b00" strokeWidth={3} dot={{ r: 4, fill: "#ff6b00" }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages used</CardTitle>
          <p className="text-sm leading-6 text-white/55">English and Urdu adoption for multilingual voice triage.</p>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Pie data={languageData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={98} paddingAngle={4} label>
                {languageData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Triage distribution</CardTitle>
          <p className="text-sm leading-6 text-white/55">Green, Yellow, and Red urgency outcomes with text labels for accessibility.</p>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Pie data={triageData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={98} paddingAngle={4} label>
                {triageData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
