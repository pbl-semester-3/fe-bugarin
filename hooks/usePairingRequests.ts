import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockPairingRequests, type PairingRequest } from "@/lib/mock/pt";

// Sumber data sementara: dummy di lib/mock.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: PairingRequest[] }>("/pt/pairing-requests").then((r) => r.data.data)
export function usePairingRequests() {
  return useQuery({
    queryKey: queryKeys.pt.pairingRequests,
    queryFn: () =>
      Promise.resolve(mockPairingRequests) as Promise<PairingRequest[]>,
  });
}

export type RespondPairingPayload = {
  id: number;
  // Backend: ada alasanPenolakan -> ditolak, tanpa alasan -> diterima.
  alasanPenolakan?: string;
};

// TODO: ganti mutationFn ke backend saat siap:
//   api.put(`/pt/pairing-requests/${payload.id}`, { alasanPenolakan: payload.alasanPenolakan })
export function useRespondPairingRequest() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: RespondPairingPayload) => {
      const status = payload.alasanPenolakan?.trim() ? "ditolak" : "diterima";
      return Promise.resolve({ id: payload.id, status });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.pairingRequests });
      // Jumlah klien di dashboard ikut berubah setelah menerima request.
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}
