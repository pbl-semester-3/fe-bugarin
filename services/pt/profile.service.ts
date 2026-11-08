import { api } from "@/services/api";
import type {
  JenisKelamin,
  PtProfile,
  Tema,
  Tujuan,
} from "@/types/pt";

// GET /pt/profile
export async function getPtProfile() {
  const res = await api.get<{ data: PtProfile }>("/pt/profile");
  return res.data.data;
}

export type UpdatePtProfileInput = {
  nama?: string;
  usia?: number;
  jenisKelamin?: JenisKelamin;
  spesialisasi?: Tujuan;
  tempatGym?: string;
};

// PUT /pt/profile — email/username TIDAK boleh dikirim (backend .strict -> 400).
export async function updatePtProfile(payload: UpdatePtProfileInput) {
  await api.put("/pt/profile", payload);
}

export type UpdatePtPasswordInput = {
  passwordSaatIni: string;
  passwordBaru: string;
};

// PUT /pt/password
export async function updatePtPassword(payload: UpdatePtPasswordInput) {
  await api.put("/pt/password", payload);
}

// PUT /pt/theme
export async function updatePtTheme(tema: Tema) {
  await api.put("/pt/theme", { tema });
}

// POST /pt/profile/photo — multipart field `foto` (jpeg/png/webp, ≤ 2 MB).
export async function uploadPtPhoto(file: File) {
  const form = new FormData();
  form.append("foto", file);
  // JANGAN set Content-Type manual — axios mengisi boundary multipart.
  const res = await api.post<{ data: { fotoUrl: string } }>(
    "/pt/profile/photo",
    form
  );
  return res.data.data;
}

// DELETE /pt/profile/photo
export async function deletePtPhoto() {
  await api.delete("/pt/profile/photo");
}
