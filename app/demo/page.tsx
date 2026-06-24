import { Badge } from "@/components/ui/badge";
import { VoiceAgent } from "@/components/VoiceAgent";
import { getElevenLabsAgentId } from "@/lib/elevenlabs";

export default function DemoPage() {
  const agentId = getElevenLabsAgentId();

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <Badge>Live grant demo</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">Talk to VoiceDoc in Urdu or English</h1>
        <p className="mt-5 text-lg leading-8 text-white/65">
          This is the core product: ElevenLabs Conversational AI powering a multilingual health triage call, with live transcript capture, triage parsing, and Supabase session logging.
        </p>
      </div>
      <VoiceAgent agentId={agentId} />
    </main>
  );
}
