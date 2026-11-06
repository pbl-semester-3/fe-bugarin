import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { forgotPassword } from "@/services/auth.service";
import {
  createAdminTrainer,
  deleteAdminUser,
  getAdminTrainers,
  updateAdminTrainer,
} from "@/services/admin/users.service";

// GET /admin/users?role=pt
export function useAdminTrainers() {
  return useQuery({
    queryKey: queryKeys.admin.users("pt"),
    queryFn: getAdminTrainers,
  });
}

// DELETE /admin/users/:id (soft-delete di backend: hilang dari daftar).
export function useDeleteTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}

// PUT /admin/users/:id — profil PT dan/atau status aktif.
export function useUpdateTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAdminTrainer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}

// POST /auth/forgot-password — kirim kode reset ke email PT.
export function useSendTrainerResetCode() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

// POST /admin/users/pt — username di-generate backend, password dari admin.
export function useCreateTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAdminTrainer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("pt") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}

export type { CreateTrainerPayload } from "@/services/admin/users.service";
