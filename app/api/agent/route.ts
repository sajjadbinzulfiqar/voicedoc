import { NextResponse } from "next/server";

import { getElevenLabsAgentId } from "@/lib/elevenlabs";

export async function GET() {
  const agentId = getElevenLabsAgentId();

  if (!agentId) {
    return NextResponse.json(
      {
        configured: false,
        agentId: null,
        language: "en",
        message: "NEXT_PUBLIC_ELEVENLABS_AGENT_ID is not configured.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    configured: true,
    agentId,
    language: "en",
    product: "VoiceDoc",
    capabilities: ["Conversational AI triage", "Urdu and English voice guidance", "Triage session logging"],
  });
}
