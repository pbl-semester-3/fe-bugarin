import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  deletePtPhoto,
  uploadPtPhoto,
} from "@/services/pt/profile.service";

// POST /pt/profile/photo — multipart field `foto` (jpeg/png/webp, ≤ 2 MB).
export function useUploadPtPhoto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadPtPhoto,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}

// DELETE /pt/profile/photo
export function useDeletePtPhoto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePtPhoto,
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pt.profile }),
  });
}
