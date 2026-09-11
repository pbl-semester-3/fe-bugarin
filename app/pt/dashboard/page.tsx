"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

type DashboardSummary = {
  jumlahKlien: number;
  jadwalMingguIni: Array<{ klienNama: string; hari: string; jam: string; jenis: string; lokasi: string }>;
};

function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.pt.dashboard,
    queryFn: () => api.get<{ data: DashboardSummary }>("/pt/dashboard-summary").then((r) => r.data.data),
  });
}

// TODO: ganti jadi UI lengkap sesuai Bugarin_PRD_Frontend.md bab 4.1 + skill shadcn-ui-patterns
// (Card jumlah klien, Table jadwal). Endpoint /pt/dashboard-summary juga masih stub di backend.
export default function PtDashboardPage() {
  const { data, isLoading, error } = useDashboardSummary();

  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>Gagal memuat dashboard.</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard PT</h1>
      <p>Jumlah klien: {data?.jumlahKlien ?? 0}</p>
    </div>
  );
}
