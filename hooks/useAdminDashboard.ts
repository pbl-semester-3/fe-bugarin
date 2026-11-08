import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAdminDashboard } from "@/services/admin/dashboard.service";

// GET /admin/dashboard-summary
export function useAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.admin.dashboard,
    queryFn: getAdminDashboard,
  });
}
