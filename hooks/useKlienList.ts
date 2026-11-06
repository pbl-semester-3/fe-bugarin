import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getKlienList } from "@/services/pt/klien.service";

// GET /pt/klien -> { data, meta }
export function useKlienList() {
  return useQuery({
    queryKey: queryKeys.pt.klienList,
    queryFn: getKlienList,
  });
}
