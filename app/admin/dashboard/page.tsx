"use client";

import { Users } from "lucide-react";
import { ActivityTrendChart } from "@/components/admin/dashboard/activity-trend-chart";
import { SpecializationDonut } from "@/components/admin/dashboard/specialization-donut";
import { WelcomeBanner } from "@/components/admin/dashboard/welcome-banner";
import { AdminStatCard } from "@/components/admin/stat-card";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

// Dashboard Admin (design/admin/dashboard-admin.md). Data dummy via useAdminDashboard.
export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-36 animate-pulse rounded-card bg-admin-surface" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="h-[133px] animate-pulse rounded-card bg-admin-surface sm:col-span-2" />
          <div className="h-[133px] animate-pulse rounded-card bg-admin-surface sm:col-span-2" />
        </div>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
          <div className="h-96 animate-pulse rounded-card bg-admin-surface lg:col-span-7" />
          <div className="h-96 animate-pulse rounded-card bg-admin-surface lg:col-span-5" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-card bg-admin-surface p-16 text-center shadow-card">
        <p className="text-sm text-admin-secondary">
          Gagal memuat ringkasan dashboard.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 rounded-control bg-brand px-4 py-2 text-xs font-medium text-on-accent"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <WelcomeBanner totalActiveTrainers={data.welcome.totalActiveTrainers} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <AdminStatCard
          icon={<Users />}
          label="Total Active Clients"
          value={data.stats.totalActiveClients}
          className="h-[133px] sm:col-span-2"
        />
        <AdminStatCard
          icon={<Users />}
          label="Total Active Personal Trainer"
          value={data.stats.totalActivePersonalTrainers}
          className="h-[133px] sm:col-span-2"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ActivityTrendChart data={data.activityTrend} />
        </div>
        <div className="lg:col-span-5">
          <SpecializationDonut data={data.specialization} />
        </div>
      </div>
    </div>
  );
}
