import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  mockPairingRequests,
  type PairingRequest,
  type RejectionClassification,
} from "@/lib/mock/pt";

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
  // Klasifikasi penolakan dari modal Decline (design/VERIFIKASI.md §5.4).
  klasifikasi?: RejectionClassification;
};

// TODO: ganti mutationFn ke backend saat siap:
//   api.put(`/pt/pairing-requests/${payload.id}`, { alasanPenolakan })
// Sementara: klasifikasi + pesan digabung jadi satu string `alasanPenolakan`.
// Konfirmasi ke backend apakah `klasifikasi` sebaiknya dikirim sebagai field terpisah.
export function useRespondPairingRequest() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: RespondPairingPayload) => {
      const pesan = payload.alasanPenolakan?.trim();
      const alasanPenolakan = pesan
        ? [payload.klasifikasi, pesan].filter(Boolean).join(" — ")
        : undefined;
      const status = alasanPenolakan ? "ditolak" : "diterima";
      return Promise.resolve({ id: payload.id, status, alasanPenolakan });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.pairingRequests });
      // Jumlah klien di dashboard ikut berubah setelah menerima request.
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}
