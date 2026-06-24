"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Tabs({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-6", className)} {...props}>{children}</div>;
}

export function TabsList({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex rounded-full border border-white/10 bg-white/5 p-1", className)} role="tablist" {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ active, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={cn(
        "min-h-10 rounded-full px-4 text-sm font-semibold text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
        active && "bg-accent text-white shadow-lg shadow-accent/20",
        className,
      )}
      role="tab"
      aria-selected={active}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("outline-none", className)} role="tabpanel" {...props} />;
}
