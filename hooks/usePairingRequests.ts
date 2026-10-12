import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { PairingRequest } from "@/lib/types/pt";

// GET /pt/pairing-requests (hanya pending)
export function usePairingRequests() {
  return useQuery({
    queryKey: queryKeys.pt.pairingRequests,
    queryFn: () =>
      api
        .get<{ data: PairingRequest[] }>("/pt/pairing-requests")
        .then((r) => r.data.data),
  });
}

export type RespondPairingPayload = {
  id: number;
  // Ada alasanPenolakan -> ditolak; tanpa alasan -> diterima.
  alasanPenolakan?: string;
};

// PUT /pt/pairing-requests/:id
export function useRespondPairingRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, alasanPenolakan }: RespondPairingPayload) =>
      api.put(
        `/pt/pairing-requests/${id}`,
        alasanPenolakan ? { alasanPenolakan } : {}
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.pairingRequests });
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}
