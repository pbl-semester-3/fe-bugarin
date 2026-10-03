import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockPtProfile, type PtProfile, type PtTheme } from "@/lib/mock/pt-profile";
import type {
  PtPasswordForm,
  PtProfileForm,
} from "@/lib/schemas/pt-profile.schema";

// Sumber data sementara: dummy di lib/mock/pt-profile.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: PtProfile }>("/pt/profile").then((r) => r.data.data)
export function usePtProfile() {
  return useQuery({
    queryKey: queryKeys.pt.profile,
    queryFn: () => Promise.resolve(mockPtProfile) as Promise<PtProfile>,
  });
}

// TODO: ganti mutationFn ke backend: api.put("/pt/profile", payload)
export function useUpdatePtProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PtProfileForm) => Promise.resolve(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

// TODO: ganti mutationFn ke backend: api.put("/pt/password", payload)
export function useUpdatePtPassword() {
  return useMutation({
    mutationFn: (payload: PtPasswordForm) =>
      Promise.resolve({ ...payload, status: "ok" as const }),
  });
}

// TODO: ganti mutationFn ke backend: api.put("/pt/theme", { tema })
export function useUpdatePtTheme() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tema: PtTheme) => Promise.resolve({ tema }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}
