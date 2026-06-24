import "server-only";

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export function getElevenLabsAgentId() {
  return process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
}

export function getElevenLabsApiKey() {
  return process.env.ELEVENLABS_API_KEY;
}

export function hasElevenLabsEnv() {
  return Boolean(getElevenLabsAgentId() && getElevenLabsApiKey());
}

export function createElevenLabsClient() {
  const apiKey = getElevenLabsApiKey();

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not configured.");
  }

  return new ElevenLabsClient({ apiKey });
}

export const elevenLabsClient = getElevenLabsApiKey()
  ? new ElevenLabsClient({ apiKey: getElevenLabsApiKey() })
  : null;
