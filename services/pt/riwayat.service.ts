import { api } from "@/services/api";
import type { RiwayatRow } from "@/types/pt";

// GET /pt/riwayat -> { data, meta }
export async function getRiwayat() {
  const res = await api.get<{ data: RiwayatRow[] }>("/pt/riwayat");
  return res.data.data;
}
