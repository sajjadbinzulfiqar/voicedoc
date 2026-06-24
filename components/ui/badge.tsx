import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      default: "border-accent/30 bg-accent/15 text-accent",
      green: "border-success/30 bg-success/15 text-success",
      yellow: "border-warning/30 bg-warning/15 text-warning",
      red: "border-danger/30 bg-danger/15 text-danger",
      muted: "border-white/10 bg-white/5 text-white/60",
      outline: "border-white/15 text-white/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
