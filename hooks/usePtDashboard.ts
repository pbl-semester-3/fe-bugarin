import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { DashboardSummary } from "@/lib/types/pt";

// GET /pt/dashboard-summary
export function usePtDashboard() {
  return useQuery({
    queryKey: queryKeys.pt.dashboard,
    queryFn: () =>
      api
        .get<{ data: DashboardSummary }>("/pt/dashboard-summary")
        .then((r) => r.data.data),
  });
}
