# VoiceDoc

VoiceDoc is an AI-powered multilingual health triage voice agent for Pakistan and South Asia. It helps patients speak naturally in Urdu or English, answer short follow-up questions, and receive clear urgency guidance: **GREEN** self-care, **YELLOW** clinic within 48 hours, or **RED** emergency care.

This MVP is built for an **ElevenLabs Startup Grant** application. ElevenLabs Conversational AI is the core product experience, not an add-on wrapper.

## Problem

Pakistan and South Asia face a severe primary-care access gap: 200M+ people in Pakistan and hundreds of millions across South Asia struggle with language barriers, overloaded clinics, travel time, and uncertainty about whether symptoms require urgent care. VoiceDoc uses voice AI to make first-line health guidance easier to access.

> VoiceDoc is not a replacement for a doctor and does not diagnose. It helps people understand care urgency and when to seek professional help.

## Tech Stack

- Next.js `16.2.9` App Router
- React `19.2` and React DOM `19.2`
- TypeScript `5.x`
- Tailwind CSS `4.3.1` with CSS-first config in `styles/globals.css`
- `@elevenlabs/react@1.6.4` for Conversational AI
- `@elevenlabs/elevenlabs-js` for server-side ElevenLabs API usage
- Supabase PostgreSQL via `@supabase/supabase-js@2`
- Recharts `2`
- Framer Motion `11`
- shadcn-style Button, Card, Badge, Select, Tabs components
- Render.com deployment

## How VoiceDoc uses ElevenLabs

1. **Conversational AI Agents** — core live demo uses `ConversationProvider`, `useConversationControls`, and `useConversationStatus` from `@elevenlabs/react`.
2. **Multilingual TTS** — the VoiceDoc agent speaks in Urdu or English based on the selected language override.
3. **STT** — ElevenLabs Conversational AI handles real-time speech-to-text and turn-taking.
4. **Voice Design** — a custom VoiceDoc voice should be configured in the ElevenLabs dashboard for a compassionate clinical tone.
5. **Future Voice Cloning** — planned trusted local doctor voices for community deployment.

## Local Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Required environment variables:

```env
ELEVENLABS_API_KEY=
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`ELEVENLABS_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are server-only. Never expose them in client components.

## Create the ElevenLabs Agent

1. Go to `https://elevenlabs.io/app/agents`.
2. Create a new Conversational AI Agent named **VoiceDoc**.
3. Paste this system prompt:

```text
You are VoiceDoc, an AI health triage assistant serving patients in Pakistan and South Asia.
You speak clearly and compassionately in the user's preferred language (Urdu or English).

Your role:
1. Greet the patient warmly
2. Ask about their primary symptom
3. Ask 3-5 targeted follow-up questions (duration, severity 1-10, associated symptoms, age, existing conditions)
4. Classify into: GREEN (self-care at home), YELLOW (visit clinic within 48 hours), RED (seek emergency care immediately)
5. Give clear actionable guidance appropriate to the triage level
6. Never diagnose. Always recommend consulting a doctor for serious concerns.
7. Keep responses under 40 words per turn for voice clarity.

You are NOT a replacement for a doctor. You help people understand whether they need urgent care.
When you have completed your triage, explicitly state one of: TRIAGE:GREEN, TRIAGE:YELLOW, or TRIAGE:RED
```

4. Enable Urdu and English in language settings.
5. Configure a clear, warm VoiceDoc voice.
6. Copy the Agent ID into `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.
7. Create an API key and set `ELEVENLABS_API_KEY`.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor and run:

```sql
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  language text,
  duration_seconds int,
  triage_level text,
  symptom_summary text,
  agent_id text
);
```

3. Copy the project URL and anon key to `.env.local`.
4. Copy the service role key to `SUPABASE_SERVICE_ROLE_KEY`.
5. Start a demo call and end the session to log a row.
6. Visit `/dashboard` to see mock base traction plus live Supabase sessions.

## API Routes

- `GET /api/agent` — returns safe agent config: `{ agentId, language, capabilities }`.
- `POST /api/session` — accepts `{ language, duration_seconds, triage_level, symptom_summary, agent_id }` and writes to Supabase.
- `GET /api/metrics` — returns `{ total, byLanguage, byTriage, avgDuration, weeklyData }` with Supabase aggregation and mock fallback.

## Render Deployment

This project deploys to Render, not Vercel.

1. Push the repo to GitHub.
2. Go to `dashboard.render.com` → New → Web Service.
3. Connect the GitHub repo.
4. Render auto-detects `render.yaml` and fills build/start commands.
5. Add all env vars in Render dashboard under Environment.
6. Deploy. Render assigns a `.onrender.com` URL.
7. Use that live URL in the ElevenLabs grant application.

`render.yaml` uses:

- Region: Singapore
- Node: 20.x
- Build: `npm install && npm run build`
- Start: `npm start`
- Health check: `/`

## Grant Application Rationale

VoiceDoc applies for ElevenLabs Startup Grants because:

- Conversational AI Agents are the core product.
- We target 33M characters/month at scale, mapping directly to grant value.
- A 12-month runway lets us reach 10,000 consultations and validate the model.
- We integrate Conversational AI, multilingual TTS, STT, and Voice Design.
- We plan to use Voice Cloning to add trusted local doctor voices.

## Post-Build Checklist

1. Run `npm run build` locally with zero errors.
2. Push to GitHub.
3. Deploy to Render and capture the `.onrender.com` URL.
4. Create the ElevenLabs agent with the system prompt above.
5. Set `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` and `ELEVENLABS_API_KEY` in Render.
6. Verify a live voice conversation works on the Render URL.
7. Record a 2-minute Loom demo showing end-to-end voice triage.
8. Apply at `https://elevenlabs.io/grants-application` with the live URL and Loom link.
