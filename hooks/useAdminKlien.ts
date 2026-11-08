import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  deleteAdminUser,
  getAdminKlien,
} from "@/services/admin/users.service";

// GET /admin/users?role=klien
export function useAdminKlien() {
  return useQuery({
    queryKey: queryKeys.admin.users("klien"),
    queryFn: getAdminKlien,
  });
}

// DELETE /admin/users/:id (soft-delete: klien hilang dari daftar).
export function useDeleteKlien() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.admin.users("klien") });
      qc.invalidateQueries({ queryKey: queryKeys.admin.dashboard });
    },
  });
}
