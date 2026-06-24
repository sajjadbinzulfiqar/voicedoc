import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Community",
    price: "Free",
    description: "For NGOs, awareness pilots, and grant-backed access programs.",
    features: ["50 consultations/month", "English only", "Community support", "Basic dashboard"],
    cta: "Start free",
  },
  {
    name: "Clinic",
    price: "$49/month",
    description: "For clinics that want multilingual patient pre-triage and analytics.",
    features: ["Unlimited consultations", "Urdu + English", "API access", "Priority support", "Supabase metrics"],
    cta: "Choose Clinic",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For hospitals, call centers, insurers, and government health programs.",
    features: ["White-label deployment", "Custom voices", "SLA", "Dedicated support", "Voice cloning roadmap"],
    cta: "Contact us",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <Badge>Pricing</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Launch voice triage at community, clinic, or national scale</h1>
        <p className="mt-5 text-lg leading-8 text-white/65">
          VoiceDoc combines ElevenLabs Conversational AI with session analytics and deployment-ready infrastructure.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? "border-accent/40 bg-accent/8 orange-glow" : ""}>
            <CardContent className="flex h-full flex-col p-8">
              {plan.featured ? <Badge className="w-fit">Most popular</Badge> : <Badge variant="outline" className="w-fit">{plan.name}</Badge>}
              <h2 className="mt-6 text-2xl font-semibold">{plan.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{plan.description}</p>
              <p className="mt-7 text-4xl font-bold tracking-tight">{plan.price}</p>
              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-white/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant={plan.featured ? "default" : "secondary"}>
                <Link href="/demo">{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Apply for free access via ElevenLabs Startup Grant</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">
          The grant gives VoiceDoc the 12-month runway to reach 10,000 consultations and validate voice-first health triage for South Asia.
        </p>
        <Button asChild className="mt-6">
          <Link href="/demo">Experience the grant demo</Link>
        </Button>
      </section>
    </main>
  );
}
