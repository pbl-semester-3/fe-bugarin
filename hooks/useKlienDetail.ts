import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getKlienById,
  getKlienDetail,
  type KlienWithDetail,
} from "@/lib/mock/klien";

// Sumber data sementara: dummy di lib/mock/klien.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: KlienWithDetail }>(`/pt/klien/${id}`).then((r) => r.data.data)
export function useKlienDetail(id: number) {
  return useQuery({
    queryKey: queryKeys.pt.klienDetail(id),
    queryFn: () => {
      const klien = getKlienById(id);
      const detail = getKlienDetail(id);
      if (!klien || !detail) return null;
      return { ...klien, ...detail } satisfies KlienWithDetail;
    },
    enabled: Number.isFinite(id) && id > 0,
  });
}
