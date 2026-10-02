import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockKlienList, type Klien } from "@/lib/mock/klien";

// Sumber data sementara: dummy di lib/mock/klien.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: Klien[] }>("/pt/klien").then((r) => r.data.data)
export function useKlienList() {
  return useQuery({
    queryKey: queryKeys.pt.klienList,
    queryFn: () => Promise.resolve(mockKlienList) as Promise<Klien[]>,
  });
}
