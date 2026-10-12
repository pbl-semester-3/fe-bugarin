import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type {
  JenisKelamin,
  PtProfile,
  Tema,
  Tujuan,
} from "@/lib/types/pt";

// GET /pt/profile
export function usePtProfile() {
  return useQuery({
    queryKey: queryKeys.pt.profile,
    queryFn: () =>
      api.get<{ data: PtProfile }>("/pt/profile").then((r) => r.data.data),
  });
}

export type UpdatePtProfileInput = {
  nama?: string;
  usia?: number;
  jenisKelamin?: JenisKelamin;
  spesialisasi?: Tujuan;
  tempatGym?: string;
};

// PUT /pt/profile — email/username TIDAK boleh dikirim (backend .strict -> 400).
export function useUpdatePtProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePtProfileInput) => api.put("/pt/profile", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

export type UpdatePtPasswordInput = {
  passwordSaatIni: string;
  passwordBaru: string;
};

// PUT /pt/password
export function useUpdatePtPassword() {
  return useMutation({
    mutationFn: (payload: UpdatePtPasswordInput) =>
      api.put("/pt/password", payload),
  });
}

// PUT /pt/theme
export function useUpdatePtTheme() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tema: Tema) => api.put("/pt/theme", { tema }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}
