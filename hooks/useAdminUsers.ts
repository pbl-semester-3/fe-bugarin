import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockAdminUsers } from "@/lib/mock/admin";
import { queryKeys } from "@/lib/query-keys";
import type { TrainerForm } from "@/lib/types/admin";

// TODO(integrasi): ganti queryFn ke GET /admin/users?role=...&page=... lalu hapus mock.
// Filter/pagination saat ini dilakukan client-side oleh komponen view.
export function useAdminUsers() {
  return useQuery({
    queryKey: queryKeys.admin.users(),
    queryFn: () => Promise.resolve(mockAdminUsers),
  });
}

// TODO(integrasi): mutationFn ke POST /admin/users/pt.
export function useCreateTrainer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (_payload: TrainerForm) => Promise.resolve(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.users() }),
  });
}

// TODO(integrasi): mutationFn ke DELETE /admin/users/:id.
export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (_id: number) => Promise.resolve(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.users() }),
  });
}
