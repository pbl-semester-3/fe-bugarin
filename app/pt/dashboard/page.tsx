"use client";

import { ClipboardCheck, Users } from "lucide-react";
import { GreetingBanner } from "@/components/pt/dashboard/greeting-banner";
import { ScheduleCard } from "@/components/pt/dashboard/schedule-card";
import { StatCard } from "@/components/pt/dashboard/stat-card";
import { usePairingRequests } from "@/hooks/usePairingRequests";
import { usePtDashboard } from "@/hooks/usePtDashboard";
import { usePtProfile } from "@/hooks/usePtProfile";
import type { DashboardSummary } from "@/lib/types/pt";

const EMPTY: DashboardSummary = { jumlahKlienAktif: 0, jadwalLatihan: [] };

// Halaman Dashboard PT (design/DASHBOARD.md, disederhanakan sesuai backend).
export default function PtDashboardPage() {
  const { data, isLoading } = usePtDashboard();
  const { data: profile } = usePtProfile();
  // "Menunggu Verifikasi" = jumlah pairing request pending (sumber sama dgn badge sidebar).
  const { data: pairingRequests, isLoading: pairingLoading } = usePairingRequests();
  const summary = data ?? EMPTY;
  const pendingCount = pairingRequests?.length ?? 0;

  return (
    <div className="space-y-6">
      <GreetingBanner nama={profile?.profile.nama ?? "Coach"} />

      <div className="grid gap-5 sm:grid-cols-2">
        <StatCard
          icon={<Users />}
          label="Total Klien Aktif"
          value={isLoading ? "-" : summary.jumlahKlienAktif}
        />
        <StatCard
          icon={<ClipboardCheck />}
          label="Menunggu Verifikasi"
          value={pairingLoading ? "-" : pendingCount}
        />
      </div>

      <ScheduleCard data={summary} />
    </div>
  );
}
