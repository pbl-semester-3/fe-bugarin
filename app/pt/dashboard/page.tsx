"use client";

import { ClipboardCheck, Users } from "lucide-react";
import { GreetingBanner } from "@/components/pt/dashboard/greeting-banner";
import { ScheduleCard } from "@/components/pt/dashboard/schedule-card";
import { StatCard } from "@/components/pt/dashboard/stat-card";
import { usePtDashboard } from "@/hooks/usePtDashboard";
import type { DashboardSummary } from "@/lib/mock/pt";

const EMPTY: DashboardSummary = {
  totalKlien: 0,
  pendingVerifikasi: 0,
  week: [],
  sesi: [],
};

// Halaman Dashboard PT sesuai design/DASHBOARD.md.
export default function PtDashboardPage() {
  const { data, isLoading } = usePtDashboard();
  const summary = data ?? EMPTY;

  return (
    <div className="space-y-6">
      <GreetingBanner nama="Alex" />

      <div className="flex gap-5">
        <StatCard
          icon={<Users />}
          label="Total Active Clients"
          value={isLoading ? "-" : summary.totalKlien}
        />
        <StatCard
          icon={<ClipboardCheck />}
          label="Pending Verifications"
          value={isLoading ? "-" : summary.pendingVerifikasi}
        />
      </div>

      <ScheduleCard data={summary} />
    </div>
  );
}
