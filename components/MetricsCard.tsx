import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricsCardProps = {
  title: string;
  value: string;
  description: string;
  icon?: ReactNode;
  className?: string;
};

export function MetricsCard({ title, value, description, icon, className }: MetricsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/55">{title}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</p>
            <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
          </div>
          {icon ? <div className="rounded-2xl bg-accent/15 p-3 text-accent">{icon}</div> : null}
        </div>
      </CardContent>
    </Card>
  );
}
