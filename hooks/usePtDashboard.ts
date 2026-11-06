import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getDashboardSummary } from "@/services/pt/dashboard.service";

// GET /pt/dashboard-summary
export function usePtDashboard() {
  return useQuery({
    queryKey: queryKeys.pt.dashboard,
    queryFn: getDashboardSummary,
  });
}
