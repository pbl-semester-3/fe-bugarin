import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getPairingRequests,
  respondPairingRequest,
} from "@/services/pt/pairing.service";

// GET /pt/pairing-requests (hanya pending)
export function usePairingRequests() {
  return useQuery({
    queryKey: queryKeys.pt.pairingRequests,
    queryFn: getPairingRequests,
  });
}

// PUT /pt/pairing-requests/:id
export function useRespondPairingRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: respondPairingRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.pairingRequests });
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}

export type { RespondPairingPayload } from "@/services/pt/pairing.service";
