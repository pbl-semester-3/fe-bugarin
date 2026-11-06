import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getPtProfile,
  updatePtPassword,
  updatePtProfile,
  updatePtTheme,
} from "@/services/pt/profile.service";

// GET /pt/profile
export function usePtProfile() {
  return useQuery({
    queryKey: queryKeys.pt.profile,
    queryFn: getPtProfile,
  });
}

// PUT /pt/profile — email/username TIDAK boleh dikirim (backend .strict -> 400).
export function useUpdatePtProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updatePtProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

// PUT /pt/password
export function useUpdatePtPassword() {
  return useMutation({
    mutationFn: updatePtPassword,
  });
}

// PUT /pt/theme
export function useUpdatePtTheme() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updatePtTheme,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

export type {
  UpdatePtPasswordInput,
  UpdatePtProfileInput,
} from "@/services/pt/profile.service";
