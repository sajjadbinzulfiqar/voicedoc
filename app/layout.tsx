import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VoiceDoc — AI health triage by voice",
  description: "An ElevenLabs-powered multilingual health triage voice agent for Pakistan and South Asia.",
  openGraph: {
    title: "VoiceDoc",
    description: "Healthcare guidance in your language, by voice.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/45 sm:px-6 lg:px-8">
          <p>© 2026 VoiceDoc. Built for the ElevenLabs Startup Grant application.</p>
        </footer>
      </body>
    </html>
  );
}
