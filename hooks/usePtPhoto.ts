import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

// POST /pt/profile/photo — multipart field `foto` (jpeg/png/webp, ≤ 2 MB).
export function useUploadPtPhoto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const form = new FormData();
      form.append("foto", file);
      // JANGAN set Content-Type manual — axios mengisi boundary multipart.
      return api
        .post<{ data: { fotoUrl: string } }>("/pt/profile/photo", form)
        .then((r) => r.data.data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

// DELETE /pt/profile/photo
export function useDeletePtPhoto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/pt/profile/photo"),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}
