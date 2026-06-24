import Link from "next/link";
import { Activity, Clock3, Globe2, HeartPulse, Languages, Mic2, Phone, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Languages, title: "Multilingual", description: "Urdu and English voice guidance designed for Pakistan and South Asia." },
  { icon: Clock3, title: "24/7 available", description: "Always-on triage assistance for patients who cannot wait for clinic hours." },
  { icon: Phone, title: "No smartphone needed", description: "Voice-first workflows can extend to call centers and low-bandwidth channels." },
  { icon: ShieldCheck, title: "Medically validated", description: "Clear urgency classification with escalation language and clinician disclaimers." },
];

const steps = [
  { title: "Speak", description: "The patient explains symptoms naturally in Urdu or English." },
  { title: "AI triages", description: "VoiceDoc asks targeted follow-ups and classifies urgency." },
  { title: "Get guidance", description: "Patients receive clear next steps: self-care, clinic visit, or emergency care." },
];

function Waveform() {
  return (
    <div className="flex h-28 items-end justify-center gap-2 rounded-[2rem] border border-white/10 bg-white/5 p-6" aria-label="Animated voice waveform illustration">
      {[34, 56, 88, 64, 104, 72, 46, 80, 52, 68].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="w-3 rounded-full bg-accent shadow-[0_0_24px_rgba(255,107,0,0.45)]"
          style={{ height, animation: `pulse ${1.4 + index * 0.04}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <Badge>Powered by ElevenLabs Conversational AI</Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Healthcare guidance in your language, by voice
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            VoiceDoc is an AI-powered multilingual health triage voice agent helping patients in Pakistan and South Asia understand whether to self-care, visit a clinic, or seek urgent help.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/demo">Launch live demo</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/dashboard">View traction dashboard</Link>
            </Button>
          </div>
        </div>
        <Card className="glass-card overflow-hidden">
          <CardContent className="space-y-8 p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/55">Live triage call</p>
                <p className="mt-2 text-2xl font-semibold">Urdu + English</p>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white orange-glow">
                <Mic2 className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
            <Waveform />
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl font-bold">3</p><p className="text-xs text-white/50">triage levels</p></div>
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl font-bold">40s</p><p className="text-xs text-white/50">voice turns</p></div>
              <div className="rounded-2xl bg-white/5 p-4"><p className="text-2xl font-bold">24/7</p><p className="text-xs text-white/50">coverage</p></div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge variant="outline">Healthcare access gap</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">200M+ people in Pakistan lack reliable primary care access</h2>
          </div>
          <p className="text-lg leading-8 text-white/65">
            Across South Asia, over 800M people face long travel times, overloaded clinics, language barriers, and delayed care decisions. VoiceDoc uses human-like voice AI to meet people where they are: in their own language, at the moment they need guidance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge>How it works</Badge>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">A voice-first triage flow patients can understand</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title}>
              <CardContent className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">{index + 1}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="glass-card border-accent/20">
          <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-black"><Sparkles className="h-8 w-8" aria-hidden="true" /></span>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-accent">ElevenLabs</p>
                <h2 className="text-3xl font-bold">Deep voice AI integration</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Conversational AI agent is the core product", "Built-in speech-to-text and natural turn-taking", "Multilingual TTS for Urdu and English", "Roadmap for trusted local doctor voice cloning"].map((item) => (
                <div className="flex gap-3 text-sm leading-6 text-white/70" key={item}>
                  <Stethoscope className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Activity className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Try the live voice triage demo</h2>
        <p className="mt-5 text-lg leading-8 text-white/65">Experience the grant-ready ElevenLabs agent with transcript, triage parsing, and session analytics.</p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/demo">Open VoiceDoc demo</Link>
        </Button>
      </section>
    </main>
  );
}
