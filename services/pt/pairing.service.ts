import { api } from "@/services/api";
import type { PairingRequest } from "@/types/pt";

// GET /pt/pairing-requests (hanya pending)
export async function getPairingRequests() {
  const res = await api.get<{ data: PairingRequest[] }>("/pt/pairing-requests");
  return res.data.data;
}

export type RespondPairingPayload = {
  id: number;
  // Ada alasanPenolakan -> ditolak; tanpa alasan -> diterima.
  alasanPenolakan?: string;
};

// PUT /pt/pairing-requests/:id
export async function respondPairingRequest({
  id,
  alasanPenolakan,
}: RespondPairingPayload) {
  await api.put(
    `/pt/pairing-requests/${id}`,
    alasanPenolakan ? { alasanPenolakan } : {}
  );
}
