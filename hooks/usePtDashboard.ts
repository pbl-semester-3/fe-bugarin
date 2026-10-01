import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockDashboardSummary, type DashboardSummary } from "@/lib/mock/pt";

// Sumber data sementara: dummy di lib/mock.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: DashboardSummary }>("/pt/dashboard-summary").then((r) => r.data.data)
export function usePtDashboard() {
  return useQuery({
    queryKey: queryKeys.pt.dashboard,
    queryFn: () =>
      Promise.resolve(mockDashboardSummary) as Promise<DashboardSummary>,
  });
}
