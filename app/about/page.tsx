import { HeartHandshake, MapPin, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  { role: "CEO / Healthcare", description: "Builds clinical partnerships and validates triage workflows with frontline providers." },
  { role: "CTO / AI", description: "Owns ElevenLabs integration, multilingual agent design, analytics, and deployment." },
  { role: "CMO / Outreach", description: "Leads community distribution through clinics, pharmacies, NGOs, and call centers." },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Badge>Mission</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Voice healthcare guidance for communities that need it most</h1>
          <p className="mt-6 text-lg leading-8 text-white/65">
            VoiceDoc exists to close the healthcare access gap in Pakistan and South Asia. We combine compassionate voice UX with reliable triage structure so patients can understand urgency before symptoms become emergencies.
          </p>
        </div>
        <Card className="glass-card">
          <CardContent className="grid gap-4 p-8 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-4xl font-bold text-accent">200M+</p>
              <p className="mt-2 text-sm leading-6 text-white/60">people without reliable primary care access in Pakistan</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-4xl font-bold text-accent">800M</p>
              <p className="mt-2 text-sm leading-6 text-white/60">people across South Asia facing care barriers</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-4xl font-bold text-accent">2</p>
              <p className="mt-2 text-sm leading-6 text-white/60">launch languages: Urdu and English</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="py-20">
        <div className="mb-10 max-w-3xl">
          <Badge variant="outline">Founding team</Badge>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Built by healthcare, AI, and community operators</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <Card key={member.role}>
              <CardContent className="p-6">
                <UsersRound className="h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">{member.role}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 pb-20 lg:grid-cols-2">
        <Card>
          <CardContent className="p-8">
            <MapPin className="h-8 w-8 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">Pakistan and South Asia first</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              The product is designed around language choice, low-friction voice interaction, and clear escalation guidance for under-served communities where written health apps often fail.
            </p>
          </CardContent>
        </Card>
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-8">
            <HeartHandshake className="h-8 w-8 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">ElevenLabs partnership</h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              ElevenLabs Conversational AI is the core product layer: natural speech, multilingual TTS, STT, custom VoiceDoc voice design, and future voice cloning for trusted local doctor voices.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
