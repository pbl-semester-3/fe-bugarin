import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { RiwayatRow } from "@/lib/types/pt";

// GET /pt/riwayat -> { data, meta }
export function useRiwayat() {
  return useQuery({
    queryKey: queryKeys.pt.riwayat,
    queryFn: () =>
      api
        .get<{ data: RiwayatRow[] }>("/pt/riwayat")
        .then((r) => r.data.data),
  });
}
