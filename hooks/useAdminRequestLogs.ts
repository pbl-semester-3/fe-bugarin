import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAdminRequestLogs } from "@/services/admin/request-logs.service";
import type { RequestLogParams } from "@/types/admin";

// GET /admin/request-logs — hanya fetch saat tab aktif (enabled).
export function useAdminRequestLogs(params: RequestLogParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.admin.requestLogs(params),
    queryFn: () => getAdminRequestLogs(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}
