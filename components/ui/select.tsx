import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  className,
  options,
  label,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[]; label?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-white/80">
      {label ? <span>{label}</span> : null}
      <span className="relative">
        <select
          className={cn(
            "h-11 w-full appearance-none rounded-full border border-white/10 bg-white/8 px-4 pr-10 text-sm text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option className="bg-surface text-white" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" aria-hidden="true" />
      </span>
    </label>
  );
}
