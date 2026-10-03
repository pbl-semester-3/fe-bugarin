import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockRiwayat, type RiwayatRow } from "@/lib/mock/riwayat";

// Sumber data sementara: dummy di lib/mock/riwayat.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: RiwayatRow[] }>("/pt/riwayat").then((r) => r.data.data)
export function useRiwayat() {
  return useQuery({
    queryKey: queryKeys.pt.riwayat,
    queryFn: () => Promise.resolve(mockRiwayat) as Promise<RiwayatRow[]>,
  });
}
