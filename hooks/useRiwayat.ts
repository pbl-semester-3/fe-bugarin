import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getRiwayat } from "@/services/pt/riwayat.service";

// GET /pt/riwayat -> { data, meta }
export function useRiwayat() {
  return useQuery({
    queryKey: queryKeys.pt.riwayat,
    queryFn: getRiwayat,
  });
}
