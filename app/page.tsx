"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

type AdminSummary = { totalKlien: number; totalPt: number };

function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard,
    queryFn: () => api.get<{ data: AdminSummary }>("/admin/dashboard-summary").then((r) => r.data.data),
  });
}

// TODO: implementasikan sesuai Bugarin_PRD_Frontend.md bab 5.1.
export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard();

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard Admin</h1>
      {isLoading ? <p>Memuat...</p> : <p>Total klien: {data?.totalKlien ?? 0}</p>}
    </div>
  );
}
