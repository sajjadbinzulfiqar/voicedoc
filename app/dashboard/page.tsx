import { DashboardClient } from "@/components/DashboardClient";
import { mockMetrics } from "@/lib/metrics";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <DashboardClient initialMetrics={mockMetrics} />
    </main>
  );
}
