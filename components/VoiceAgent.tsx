"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneCall, PhoneOff, ShieldAlert } from "lucide-react";
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
} from "@elevenlabs/react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SymptomHistory } from "@/components/SymptomHistory";
import { formatDuration } from "@/lib/metrics";
import type { LanguageCode, TranscriptMessage, TriageLevel } from "@/lib/types";

type VoiceAgentProps = {
  agentId?: string;
};

type ConversationMessage = {
  source?: string;
  role?: string;
  message?: string;
  text?: string;
};

function parseTriage(text: string): TriageLevel {
  const upper = text.toUpperCase();
  if (upper.includes("TRIAGE:RED") || upper.includes("TRIAGE RED")) return "RED";
  if (upper.includes("TRIAGE:YELLOW") || upper.includes("TRIAGE YELLOW")) return "YELLOW";
  if (upper.includes("TRIAGE:GREEN") || upper.includes("TRIAGE GREEN")) return "GREEN";
  return "UNKNOWN";
}

function getMessageText(message: unknown) {
  if (typeof message === "string") return message;
  if (!message || typeof message !== "object") return "";
  const candidate = message as ConversationMessage;
  return candidate.message ?? candidate.text ?? "";
}

function getMessageRole(message: unknown): TranscriptMessage["role"] {
  if (!message || typeof message !== "object") return "system";
  const candidate = message as ConversationMessage;
  const role = candidate.role ?? candidate.source;
  if (role === "user") return "user";
  if (role === "ai" || role === "agent" || role === "assistant") return "agent";
  return "system";
}

function VoiceAgentControls({ agentId }: { agentId: string }) {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [triageLevel, setTriageLevel] = useState<TriageLevel>("UNKNOWN");
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const messagesRef = useRef<TranscriptMessage[]>([]);
  const triageRef = useRef<TriageLevel>("UNKNOWN");

  const isConnected = status === "connected";
  const isBusy = status === "connecting";

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    triageRef.current = triageLevel;
  }, [triageLevel]);

  useEffect(() => {
    if (!isConnected || !startedAtRef.current) return;
    const interval = window.setInterval(() => {
      setDuration(Math.floor((Date.now() - (startedAtRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isConnected]);

  async function persistSession() {
    const symptomSummary = messagesRef.current
      .filter((message) => message.role !== "system")
      .slice(-6)
      .map((message) => `${message.role}: ${message.text}`)
      .join("\n")
      .slice(0, 1000);

    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        duration_seconds: duration,
        triage_level: triageRef.current,
        symptom_summary: symptomSummary || "Voice consultation ended before transcript was captured.",
        agent_id: agentId,
      }),
    }).catch(() => undefined);
  }

  async function handleStart() {
    setError(null);
    setDuration(0);
    setTriageLevel("UNKNOWN");
    setMessages([]);
    startedAtRef.current = Date.now();

    try {
      await startSession({
        overrides: {
          agent: {
            prompt: {
              prompt: `You are VoiceDoc, an AI triage nurse. Your job is to collect symptoms, assess the triage level (GREEN, YELLOW, RED), and summarize the interaction. You must speak and respond entirely in ${language === "ur" ? "Urdu" : "English"}.`
            },
            firstMessage: language === "ur" ? "ہیلو، میں وائس ڈوک ہوں۔ آج آپ کیسا محسوس کر رہے ہیں؟" : "Hello, I am VoiceDoc. How are you feeling today?"
          },
        },
        onConnect: ({ conversationId }: { conversationId?: string } = {}) => {
          setMessages((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              role: "system",
              text: conversationId ? `Connected to ElevenLabs conversation ${conversationId}.` : "Connected to ElevenLabs Conversational AI.",
              timestamp: new Date().toISOString(),
            },
          ]);
        },
        onMessage: (message: unknown) => {
          const text = getMessageText(message);
          if (!text) return;
          const parsed = parseTriage(text);
          if (parsed !== "UNKNOWN") setTriageLevel(parsed);
          setMessages((current) => [
            ...current,
            {
              id: crypto.randomUUID(),
              role: getMessageRole(message),
              text,
              timestamp: new Date().toISOString(),
            },
          ]);
        },
        onError: (message: string) => {
          setError(message);
        },
      });
    } catch (sessionError) {
      setError(sessionError instanceof Error ? sessionError.message : "Unable to start the voice session.");
    }
  }

  async function handleEnd() {
    try {
      await endSession();
    } finally {
      await persistSession();
      startedAtRef.current = null;
    }
  }

  const statusVariant = useMemo(() => {
    if (status === "connected") return "green" as const;
    if (status === "connecting") return "yellow" as const;
    if (status === "error") return "red" as const;
    return "muted" as const;
  }, [status]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-white/10 via-white/5 to-accent/5">
        <CardContent className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={statusVariant}>Status: {status}</Badge>
              <Badge variant="outline">Agent: {agentId.slice(0, 12)}...</Badge>
              <Badge variant="muted">Timer: {formatDuration(duration)}</Badge>
            </div>
            <LanguageSelector value={language} onChange={setLanguage} disabled={isConnected || isBusy} />
            {error ? (
              <div className="flex gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm leading-6 text-red-100" role="alert">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                <span>{error}</span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStart} disabled={isConnected || isBusy} size="lg">
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Start Conversation
              </Button>
              <Button onClick={handleEnd} disabled={!isConnected && !isBusy} variant="secondary" size="lg">
                <PhoneOff className="h-5 w-5" aria-hidden="true" />
                End Conversation
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 rounded-[2rem] border border-white/10 bg-black/30 p-8">
            <motion.div
              className="relative flex h-44 w-44 items-center justify-center rounded-full bg-accent/15"
              animate={isConnected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 1.8, repeat: isConnected ? Infinity : 0 }}
            >
              {isConnected ? <span className="absolute inset-0 rounded-full border border-accent/50 animate-ping" /> : null}
              <button
                className="relative flex h-28 w-28 items-center justify-center rounded-full bg-accent text-white shadow-[0_24px_80px_rgba(255,107,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={isConnected ? "Voice agent is listening" : "Voice agent microphone is idle"}
                type="button"
                onClick={isConnected ? handleEnd : handleStart}
                disabled={isBusy}
              >
                {isConnected ? <Mic className="h-10 w-10" aria-hidden="true" /> : <MicOff className="h-10 w-10" aria-hidden="true" />}
              </button>
            </motion.div>
            <div className="flex h-24 items-end gap-2" aria-hidden="true">
              {[18, 34, 58, 82, 62, 44, 28].map((height, index) => (
                <motion.span
                  key={height + index}
                  className="w-3 rounded-full bg-accent"
                  animate={isConnected ? { height: [height * 0.45, height, height * 0.55] } : { height: height * 0.35 }}
                  transition={{ duration: 0.9, repeat: isConnected ? Infinity : 0, delay: index * 0.08 }}
                />
              ))}
            </div>
            <p className="max-w-md text-center text-sm leading-6 text-white/55">
              Speak naturally. VoiceDoc asks targeted follow-up questions and explicitly returns TRIAGE:GREEN, TRIAGE:YELLOW, or TRIAGE:RED.
            </p>
          </div>
        </CardContent>
      </Card>
      <SymptomHistory messages={messages} triageLevel={triageLevel} />
    </div>
  );
}

export function VoiceAgent({ agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID }: VoiceAgentProps) {
  if (!agentId) {
    return (
      <Card className="border-warning/30 bg-warning/10">
        <CardContent className="p-6">
          <Badge variant="yellow">Setup required</Badge>
          <h2 className="mt-4 text-2xl font-semibold">Connect your ElevenLabs agent</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
            Add NEXT_PUBLIC_ELEVENLABS_AGENT_ID to your environment after creating the VoiceDoc agent in ElevenLabs Conversational AI.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ConversationProvider agentId={agentId}>
      <VoiceAgentControls agentId={agentId} />
    </ConversationProvider>
  );
}
