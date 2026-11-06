import { api } from "@/services/api";
import { formatWib } from "@/services/admin/riwayat.service";
import type { RequestLog, RequestLogMeta, RequestLogParams } from "@/types/admin";

type ApiResponse = { data: RequestLog[]; meta: RequestLogMeta };

export type RequestLogRow = RequestLog & { time: string; date: string };

// GET /admin/request-logs — pagination & filter di server.
export async function getAdminRequestLogs(params: RequestLogParams) {
  const res = await api.get<ApiResponse>("/admin/request-logs", { params });
  const { data, meta } = res.data;

  return {
    rows: data.map((log) => {
      const when = formatWib(log.createdAt);
      return { ...log, time: when.time, date: when.date } satisfies RequestLogRow;
    }),
    meta,
  };
}
