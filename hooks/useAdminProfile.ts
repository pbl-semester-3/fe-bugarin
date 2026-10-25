import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockAdminProfile } from "@/lib/mock/admin";
import { queryKeys } from "@/lib/query-keys";

// TODO(integrasi): ganti queryFn ke GET /admin/profile lalu hapus mock.
export function useAdminProfile() {
  return useQuery({
    queryKey: queryKeys.admin.profile,
    queryFn: () => Promise.resolve(mockAdminProfile),
  });
}

export type UpdateAdminProfileInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
};

// TODO(integrasi): mutationFn ke PUT /admin/profile.
export function useUpdateAdminProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (_payload: UpdateAdminProfileInput) => Promise.resolve(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.profile }),
  });
}

export type UpdateAdminPasswordInput = {
  currentPassword: string;
  newPassword: string;
};

// TODO(integrasi): mutationFn ke PUT /admin/password.
export function useUpdateAdminPassword() {
  return useMutation({
    mutationFn: (_payload: UpdateAdminPasswordInput) => Promise.resolve(),
  });
}
