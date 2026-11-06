import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getAdminProfile,
  updateAdminPassword,
  updateAdminProfile,
  updateAdminTema,
} from "@/services/admin/profile.service";

// GET /admin/profile
export function useAdminProfile() {
  return useQuery({
    queryKey: queryKeys.admin.profile,
    queryFn: getAdminProfile,
  });
}

// PUT /admin/profile
export function useUpdateAdminProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.profile }),
  });
}

// PUT /admin/password
export function useUpdateAdminPassword() {
  return useMutation({
    mutationFn: updateAdminPassword,
  });
}

// PUT /admin/theme
export function useUpdateAdminTema() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAdminTema,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.profile }),
  });
}

export type {
  UpdateAdminPasswordInput,
  UpdateAdminProfileInput,
} from "@/services/admin/profile.service";
