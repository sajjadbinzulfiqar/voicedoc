import { AlertTriangle, CheckCircle2, Clock, Siren } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TranscriptMessage, TriageLevel } from "@/lib/types";

const triageMeta = {
  GREEN: { label: "Green · Self-care", variant: "green" as const, icon: CheckCircle2, action: "Monitor symptoms, hydrate, and follow self-care guidance." },
  YELLOW: { label: "Yellow · Clinic within 48h", variant: "yellow" as const, icon: Clock, action: "Book a clinic visit within 48 hours or sooner if symptoms worsen." },
  RED: { label: "Red · Emergency care", variant: "red" as const, icon: Siren, action: "Seek emergency care immediately or call local emergency services." },
  UNKNOWN: { label: "Awaiting triage", variant: "muted" as const, icon: AlertTriangle, action: "VoiceDoc will summarize the recommended next step after enough symptoms are shared." },
};

type SymptomHistoryProps = {
  messages: TranscriptMessage[];
  triageLevel: TriageLevel;
};

export function SymptomHistory({ messages, triageLevel }: SymptomHistoryProps) {
  const meta = triageMeta[triageLevel];
  const Icon = meta.icon;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card>
        <CardHeader>
          <CardTitle>Live transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-2" aria-live="polite">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm leading-6 text-white/55">
                Start a conversation and VoiceDoc will show user and agent turns here in real time.
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Badge variant={message.role === "agent" ? "default" : message.role === "user" ? "outline" : "muted"}>{message.role}</Badge>
                    <time className="text-xs text-white/40">{new Date(message.timestamp).toLocaleTimeString()}</time>
                  </div>
                  <p className="text-sm leading-6 text-white/75">{message.text}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle>Triage output</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-accent">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <Badge variant={meta.variant}>{meta.label}</Badge>
          </div>
          <p className="text-2xl font-semibold leading-tight text-white">{meta.action}</p>
          <p className="text-sm leading-6 text-white/55">
            VoiceDoc does not diagnose or replace a clinician. It helps patients understand urgency and encourages medical care for serious symptoms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
