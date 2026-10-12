import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { KlienListItem } from "@/lib/types/pt";

// GET /pt/klien -> { data, meta }
export function useKlienList() {
  return useQuery({
    queryKey: queryKeys.pt.klienList,
    queryFn: () =>
      api
        .get<{ data: KlienListItem[] }>("/pt/klien")
        .then((r) => r.data.data),
  });
}
