import Link from "next/link";
import { Activity, Menu } from "lucide-react";

import { navItems } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link className="flex items-center gap-3" href="/" aria-label="VoiceDoc home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white orange-glow">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">VoiceDoc</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/8 hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/demo">Try live voice demo</Link>
          </Button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white md:hidden" aria-label="Open navigation menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
